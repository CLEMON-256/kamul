import React, { useState } from 'react';
import '../styles/HomeVideoSection.css';
import VideoPlayer from '../components/common/VideoPlayer';
import videoPreview from '../assets/kampala_interior_top.png';
import restaurantVideo from '../assets/videos/restraunt.mp4';

const HomeVideoSection = () => {
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    // Using the uploaded restaurant video
    const videoUrl = restaurantVideo;

    return (
        <section className="home-video-section">
            <div className="container">
                <div className="video-content-wrapper">
                    <div className="video-text">
                        <h2>EXPERIENCE JUNIOR'S</h2>
                        <p>Take a tour of our beautiful dining space and see where the magic happens.</p>
                    </div>

                    <div className="video-preview" onClick={() => setIsVideoOpen(true)}>
                        <img src={videoPreview} alt="Restaurant Interior" />
                        <div className="play-button">
                            <span className="play-icon">▶</span>
                        </div>
                    </div>
                </div>
            </div>

            <VideoPlayer
                isOpen={isVideoOpen}
                onClose={() => setIsVideoOpen(false)}
                videoSrc={videoUrl}
                videoTitle="Experience Junior's Restaurant"
            />
        </section>
    );
};

export default HomeVideoSection;
