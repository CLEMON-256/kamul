import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import logoImage from '../../assets/logos.png';
import '../../styles/VideoPlayer.css';

const VideoPlayer = ({
    isOpen,
    onClose,
    videoSrc,
    videoTitle = 'Junior\'s Restaurant'
}) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const controlsTimeoutRef = useRef(null);

    const togglePlayPause = () => {
        const video = videoRef.current;
        if (!video) return;

        if (isPlaying) {
            video.pause();
        } else {
            video.play();
        }
    };

    const toggleMute = () => {
        const video = videoRef.current;
        if (!video) return;

        video.muted = !video.muted;
    };

    const toggleFullscreen = () => {
        const video = videoRef.current;
        if (!video) return;

        if (!document.fullscreenElement) {
            video.requestFullscreen().catch(err => {
                console.log('Error attempting to enable fullscreen:', err);
            });
        } else {
            document.exitFullscreen();
        }
    };

    useEffect(() => {
        if (!isOpen) return;

        const video = videoRef.current;
        if (!video) return;

        const updateTime = () => setCurrentTime(video.currentTime);
        const updateDuration = () => setDuration(video.duration);
        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);
        const handleVolumeChange = () => {
            setVolume(video.volume);
            setIsMuted(video.muted);
        };
        const handleError = () => {
            console.error('Video failed to load');
            setHasError(true);
            setIsLoading(false);
        };

        const handleLoadedData = () => {
            setIsLoading(false);
            setHasError(false);
        };

        const handleLoadStart = () => {
            setIsLoading(true);
            setHasError(false);
        };

        video.addEventListener('timeupdate', updateTime);
        video.addEventListener('loadedmetadata', updateDuration);
        video.addEventListener('play', handlePlay);
        video.addEventListener('pause', handlePause);
        video.addEventListener('volumechange', handleVolumeChange);
        video.addEventListener('error', handleError);

        // Auto-hide controls after 3 seconds of inactivity
        const resetControlsTimeout = () => {
            clearTimeout(controlsTimeoutRef.current);
            setShowControls(true);
            controlsTimeoutRef.current = setTimeout(() => {
                if (isPlaying) {
                    setShowControls(false);
                }
            }, 3000);
        };

        const handleMouseMove = () => resetControlsTimeout();
        const handleMouseLeave = () => {
            if (isPlaying) {
                setTimeout(() => setShowControls(false), 3000);
            }
        };

        // Keyboard controls
        const handleKeyDown = (e) => {
            if (!isOpen) return;

            switch (e.key) {
                case ' ':
                case 'k':
                    e.preventDefault();
                    togglePlayPause();
                    break;
                case 'f':
                    e.preventDefault();
                    toggleFullscreen();
                    break;
                case 'm':
                    e.preventDefault();
                    toggleMute();
                    break;
                case 'Escape':
                    e.preventDefault();
                    onClose();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    video.currentTime = Math.max(0, video.currentTime - 10);
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    video.currentTime = Math.min(duration, video.currentTime + 10);
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    video.volume = Math.min(1, video.volume + 0.1);
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    video.volume = Math.max(0, video.volume - 0.1);
                    break;
            }
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('keydown', handleKeyDown);
        video.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            video.removeEventListener('timeupdate', updateTime);
            video.removeEventListener('loadedmetadata', updateDuration);
            video.removeEventListener('play', handlePlay);
            video.removeEventListener('pause', handlePause);
            video.removeEventListener('volumechange', handleVolumeChange);
            video.removeEventListener('error', handleError);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('keydown', handleKeyDown);
            video.removeEventListener('mouseleave', handleMouseLeave);
            clearTimeout(controlsTimeoutRef.current);
        };
    }, [isOpen, isPlaying, duration, onClose]);

    useEffect(() => {
        if (!isOpen) {
            setIsPlaying(false);
            setCurrentTime(0);
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
            }
        }
    }, [isOpen]);

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleSeek = (e) => {
        const video = videoRef.current;
        if (!video) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        video.currentTime = pos * duration;
    };

    const handleVolumeChange = (e) => {
        const video = videoRef.current;
        if (!video) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        video.volume = pos;
        video.muted = pos === 0;
    };

    const formatTime = (seconds) => {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (!isOpen) return null;

    const modalContent = (
        <div className="video-player-backdrop" onClick={handleBackdropClick}>
            <div className="video-player-container">
                <button
                    className="video-player-close"
                    onClick={onClose}
                    aria-label="Close video"
                >
                    ×
                </button>

                <div className="video-wrapper">
                    <video
                        ref={videoRef}
                        src={videoSrc}
                        className="video-player-video"
                        onClick={togglePlayPause}
                    />

                    {/* Loading State */}
                    {isLoading && !hasError && (
                        <div className="video-loading">
                            <div className="video-loading-spinner"></div>
                            <p>Loading video...</p>
                        </div>
                    )}

                    {/* Error State */}
                    {hasError && (
                        <div className="video-error">
                            <p>⚠️ Video failed to load</p>
                            <p className="video-error-message">
                                Video URL: {videoSrc}
                            </p>
                            <p className="video-error-hint">
                                Please check if the video file exists and is accessible
                            </p>
                        </div>
                    )}

                    {/* Logo Overlay */}
                    {!hasError && (
                        <div className="video-logo-overlay">
                            <img src={logoImage} alt="Junior's Restaurant" className="video-logo" />
                        </div>
                    )}

                    {/* Video Controls */}
                    <div className={`video-controls ${showControls ? 'visible' : ''}`}>
                        {/* Progress Bar */}
                        <div className="video-progress-container" onClick={handleSeek}>
                            <div
                                className="video-progress-bar"
                                style={{ width: `${(currentTime / duration) * 100}%` }}
                            />
                        </div>

                        {/* Control Buttons */}
                        <div className="video-controls-bottom">
                            <div className="video-controls-left">
                                <button
                                    className="video-control-btn"
                                    onClick={togglePlayPause}
                                    aria-label={isPlaying ? 'Pause' : 'Play'}
                                >
                                    {isPlaying ? '⏸' : '▶'}
                                </button>

                                <div className="video-time">
                                    <span>{formatTime(currentTime)}</span>
                                    <span>/</span>
                                    <span>{formatTime(duration)}</span>
                                </div>

                                <div className="video-volume-container" onClick={(e) => e.stopPropagation()}>
                                    <button
                                        className="video-control-btn"
                                        onClick={toggleMute}
                                        aria-label={isMuted ? 'Unmute' : 'Mute'}
                                    >
                                        {isMuted || volume === 0 ? '🔇' : '🔊'}
                                    </button>
                                    <div className="video-volume-slider" onClick={handleVolumeChange}>
                                        <div
                                            className="video-volume-bar"
                                            style={{ width: `${(isMuted ? 0 : volume) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="video-controls-right">
                                <button
                                    className="video-control-btn"
                                    onClick={toggleFullscreen}
                                    aria-label="Fullscreen"
                                >
                                    ⛶
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return ReactDOM.createPortal(modalContent, document.body);
};

export default VideoPlayer;
