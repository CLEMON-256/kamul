# Line-by-Line Code Explainer

This guide provides a deep dive into every line of the core components used for the video section and social media links.

---

## 1. VideoPlayer.jsx (The Pop-up Player)

```javascript
import React, { useState, useRef, useEffect } from 'react'; // Imports React hooks for memory (state), direct element access (ref), and timing (effect).
import ReactDOM from 'react-dom'; // Imports Portals, which lets us move the player to the very top of the page.
import logoImage from '../../assets/logos.png'; // Imports the restaurant logo to show on the video.
import '../../styles/VideoPlayer.css'; // Imports the CSS styles specific to this player.

const VideoPlayer = ({ isOpen, onClose, videoSrc, videoTitle }) => {
    // Props: isOpen (show/hide), onClose (close function), videoSrc (video file), videoTitle (label).

    const videoRef = useRef(null); // Creates a "remote control" to directly talk to the <video> element.
    const [isPlaying, setIsPlaying] = useState(false); // Keeps track of if the video is currently playing.
    const [currentTime, setCurrentTime] = useState(0); // Remembers the exact second the video is at.
    const [duration, setDuration] = useState(0); // Records how long the total video is.
    const [volume, setVolume] = useState(1); // Set volume to 100% by default.
    const [isMuted, setIsMuted] = useState(false); // Remembers if the user clicked the "Mute" button.
    const [showControls, setShowControls] = useState(true); // Decides whether to hide the buttons when you aren't moving the mouse.

    const togglePlayPause = () => {
        const video = videoRef.current; // Get the video element.
        if (isPlaying) {
            video.pause(); // If playing, stop it.
        } else {
            video.play(); // If paused, start it.
        }
    };

    const toggleFullscreen = () => {
        const video = videoRef.current;
        if (!document.fullscreenElement) {
            video.requestFullscreen(); // If window is small, make it big.
        } else {
            document.exitFullscreen(); // If window is big, make it small.
        }
    };

    useEffect(() => {
        if (!isOpen) return; // If the player isn't open, don't do anything.

        const video = videoRef.current;
        const updateTime = () => setCurrentTime(video.currentTime); // Update our memory when the video plays.
        const updateDuration = () => setDuration(video.duration); // Set the max time once the video loads.

        video.addEventListener('timeupdate', updateTime); // Listen to the video's clock.
        video.addEventListener('loadedmetadata', updateDuration); // Listen for when the video metadata arrives.

        // Keyboard Controls
        const handleKeyDown = (e) => {
            if (e.key === ' ') togglePlayPause(); // Spacebar plays/pauses.
            if (e.key === 'f') toggleFullscreen(); // 'f' key makes it full screen.
        };

        document.addEventListener('keydown', handleKeyDown); // Start listening for keys.

        return () => { // Cleanup: Stop listening when the player is closed to save battery/memory.
            video.removeEventListener('timeupdate', updateTime);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen]);

    if (!isOpen) return null; // If isOpen is false, the entire component disappears.

    const modalContent = (
        <div className="video-player-backdrop" onClick={onClose}> {/* The black background. Clicking it closes the player. */}
            <div className="video-player-container" onClick={e => e.stopPropagation()}> {/* The player box. StopPropagation prevents clicking the player from closing the modal. */}
                <button className="video-player-close" onClick={onClose}>×</button> {/* The 'X' button. */}
                <div className="video-wrapper">
                    <video ref={videoRef} src={videoSrc} className="video-player-video" onClick={togglePlayPause} /> {/* The actual video element! */}
                    <div className="video-logo-overlay">
                        <img src={logoImage} alt="Logo" className="video-logo" /> {/* The "Junior's Restaurant" watermark. */}
                    </div>
                </div>
            </div>
        </div>
    );

    return ReactDOM.createPortal(modalContent, document.body); // Use the Portal to put this HTML at the very top of your website.
};
```

---

## 2. HomeVideoSection.jsx (The Homepage Trigger)

```javascript
import React, { useState } from 'react'; // Imports React and the ability to remember clicks.
import VideoPlayer from '../components/common/VideoPlayer'; // Imports the Pop-up Player we just explained.
import restaurantVideo from '../assets/videos/restraunt.mp4'; // Imports YOUR specific video file.

const HomeVideoSection = () => {
    const [isVideoOpen, setIsVideoOpen] = useState(false); // Memory: Is the video player open right now?

    const videoUrl = restaurantVideo; // Sets the link to your uploaded file.

    return (
        <section className="home-video-section">
            <div className="video-preview" onClick={() => setIsVideoOpen(true)}> {/* When you click the image, set memory to TRUE. */}
                <img src={videoPreview} alt="Restaurant" /> {/* The thumbnail image. */}
                <div className="play-button">▶</div> {/* The giant play button in the middle. */}
            </div>

            <VideoPlayer 
                isOpen={isVideoOpen} // Tell the player whether it should show up.
                onClose={() => setIsVideoOpen(false)} // Tell the player to set memory to FALSE when 'X' is clicked.
                videoSrc={videoUrl} // Send the video file to the player.
                videoTitle="Experience Junior's Restaurant" // Set the title for the player.
            />
        </section>
    );
};
```

---

## 3. Footer.jsx (Social Media Search)

```javascript
<a href="https://www.tiktok.com/search/user?q=0701126433" target="_blank" rel="noopener noreferrer">
```
- `https://www.tiktok.com/search/user?q=`: This is the standard TikTok link to search for a user.
- `0701126433`: We added your phone number as the search query.
- `target="_blank"`: This makes the link open in a **New Tab** so people don't leave your website.
- `rel="noopener noreferrer"`: This is a **Security** feature that prevents the external site from tracking your website's data.
