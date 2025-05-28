import React from 'react';
import './About.css';

export default function About() {
  return (
    <div className="about-container">
      <section className="hero-section">
        <h1>About WorkHive</h1>
        <p className="subtitle">Connecting Talent, Building Futures</p>
      </section>

      <section className="who-we-are">
        <h2>Who We Are</h2>
        <p>
          WorkHive is a cutting-edge freelancing platform that brings together talented professionals
          and businesses in a seamless, efficient marketplace. We're dedicated to revolutionizing
          the way work gets done in the digital age by creating meaningful connections between
          skilled freelancers and the organizations that need them.
        </p>
      </section>

      <div className="mission-vision-container">
        <section className="vision-section">
          <h2>Our Vision</h2>
          <p>
            To become the world's leading platform where talent meets opportunity, creating a
            thriving ecosystem that empowers professionals and drives business success through
            meaningful collaboration.
          </p>
        </section>

        <section className="mission-section">
          <h2>Our Mission</h2>
          <p>
            To provide an innovative, secure, and user-friendly platform that connects skilled
            professionals with quality job opportunities while helping businesses find the perfect
            talent to grow and succeed in the digital economy.
          </p>
        </section>
      </div>

      <section className="values-section">
        <h2>Our Values</h2>
        <div className="values-grid">
          <div className="value-card">
            <h3>Excellence</h3>
            <p>We strive for excellence in every interaction and transaction on our platform.</p>
          </div>
          <div className="value-card">
            <h3>Trust</h3>
            <p>Building and maintaining trust through transparency and security is our priority.</p>
          </div>
          <div className="value-card">
            <h3>Innovation</h3>
            <p>We continuously innovate to provide the best possible experience for our users.</p>
          </div>
          <div className="value-card">
            <h3>Empowerment</h3>
            <p>We empower professionals to achieve their career goals and businesses to thrive.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
