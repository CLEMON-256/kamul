
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/TimetableSection.css';
import lunchImage from '../assets/pasta_alfredo.png'; // Placeholder for Lunch image
import dinnerImage from '../assets/burger_milanese.png'; // Placeholder for Dinner image

const TimetableSection = () => {
    const navigate = useNavigate();

    return (
        <section className="timetable-section">
            <div className="container timetable-grid">

                {/* 1. Timetable Card */}
                <div className="timetable-card">
                    <h3 className="timetable-title">TIMETABLE</h3>
                    <div className="timetable-rows">
                        <div className="time-row">
                            <span className="meal-name">Breakfast</span>
                            <span className="meal-dots">......</span>
                            <span className="meal-time">8:00 - 11:00 am</span>
                        </div>
                        <div className="time-row">
                            <span className="meal-name">Brunch</span>
                            <span className="meal-dots">......</span>
                            <span className="meal-time">11:00 - 1:00 pm</span>
                        </div>
                        <div className="time-row">
                            <span className="meal-name">Lunch</span>
                            <span className="meal-dots">......</span>
                            <span className="meal-time">12:00 - 3:00 pm</span>
                        </div>
                        <div className="time-row">
                            <span className="meal-name">Dinner</span>
                            <span className="meal-dots">......</span>
                            <span className="meal-time">4:00 - 11:00 pm</span>
                        </div>
                    </div>
                </div>

                {/* 2. Lunch Card */}
                <div
                    className="meal-card"
                    style={{ backgroundImage: `url(${lunchImage})` }}
                    onClick={() => navigate('/menu?category=lunch')}
                >
                    <div className="meal-card-content">
                        <h2>Lunch</h2>
                        <span className="meal-cta">CHECK THE MENU</span>
                    </div>
                </div>

                {/* 3. Dinner Card */}
                <div
                    className="meal-card"
                    style={{ backgroundImage: `url(${dinnerImage})` }}
                    onClick={() => navigate('/menu?category=dinner')}
                >
                    <div className="meal-card-content">
                        <h2>Dinner</h2>
                        <span className="meal-cta">CHECK THE MENU</span>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default TimetableSection;
