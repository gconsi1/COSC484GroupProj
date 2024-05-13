import React from 'react';
import './About.css'; 

const About = () => {
    return (
        <div>
            <section className="about-hero">
                <div className="about-overlay">
                    <h1>Introducing ProLink.</h1>
                    <p>Connect with other users and employers with the same interest as yours!</p>
                </div>
            </section>
            <section className="about-content">
                <h2>About Our Platform</h2>
                <p>Our goal with ProLink is to revolutionize the employment landscape by merging the best features of Reddit, LinkedIn, and Pinterest into a dynamic web service. ProLink is intended to act as a versatile employment forum, allowing users to seamlessly share their resumes, connect with potential employers, and explore diverse career opportunities. Using the collaborative and interactive nature of Reddit, users can participate in discussions, ask for advice, and share insights pertaining to specialized communities (e.g., recent news updates). Incorporating LinkedIn’s professional networking capabilities will encourage users to establish meaningful connections, highlight their expertise, and discover job openings tailored to their skills and interests. The usage of Pinterest’s visual appeal and organization will help users create personalized feeds based on personal interest hashtags, allowing for efficient discovery of relevant content. Ultimately, we want to create a productive and safe environment where users can thrive, upload projects, collaborate, communicate, and progress their professional journeys.</p>
            </section>
        </div>
    );
};

export default About;
