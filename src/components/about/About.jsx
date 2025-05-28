import React from 'react';

export default function About() {
  return (
    <div className="max-w-7xl mx-auto p-8">
      <section className="text-center mb-16 py-16 bg-gradient-to-r from-gray-50 to-gray-200 rounded-lg">
        <h1 className="text-5xl text-blue-800 mb-4">About WorkHive</h1>
        <p className="text-2xl text-gray-600">Connecting Talent, Building Futures</p>
      </section>

      <section className="mb-16 p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl text-blue-800 mb-6">Who We Are</h2>
        <p className="text-lg leading-relaxed text-gray-700">
          WorkHive is a cutting-edge freelancing platform that brings together talented professionals
          and businesses in a seamless, efficient marketplace. We're dedicated to revolutionizing
          the way work gets done in the digital age by creating meaningful connections between
          skilled freelancers and the organizations that need them.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <section className="p-8 bg-white rounded-lg shadow-lg transform transition-transform duration-300 hover:-translate-y-2">
          <h2 className="text-3xl text-blue-800 mb-6">Our Vision</h2>
          <p className="text-lg leading-relaxed text-gray-700">
            To become the world's leading platform where talent meets opportunity, creating a
            thriving ecosystem that empowers professionals and drives business success through
            meaningful collaboration.
          </p>
        </section>

        <section className="p-8 bg-white rounded-lg shadow-lg transform transition-transform duration-300 hover:-translate-y-2">
          <h2 className="text-3xl text-blue-800 mb-6">Our Mission</h2>
          <p className="text-lg leading-relaxed text-gray-700">
            To provide an innovative, secure, and user-friendly platform that connects skilled
            professionals with quality job opportunities while helping businesses find the perfect
            talent to grow and succeed in the digital economy.
          </p>
        </section>
      </div>

      <section className="p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl text-blue-800 mb-8 text-center">Our Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="p-6 bg-gray-50 rounded-lg transform transition-all duration-300 hover:-translate-y-2 hover:bg-blue-700 group">
            <h3 className="text-xl text-gray-800 mb-4 group-hover:text-white">Excellence</h3>
            <p className="text-gray-700 leading-relaxed group-hover:text-white">We strive for excellence in every interaction and transaction on our platform.</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg transform transition-all duration-300 hover:-translate-y-2 hover:bg-blue-700 group">
            <h3 className="text-xl text-gray-800 mb-4 group-hover:text-white">Trust</h3>
            <p className="text-gray-700 leading-relaxed group-hover:text-white">Building and maintaining trust through transparency and security is our priority.</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg transform transition-all duration-300 hover:-translate-y-2 hover:bg-blue-700 group">
            <h3 className="text-xl text-gray-800 mb-4 group-hover:text-white">Innovation</h3>
            <p className="text-gray-700 leading-relaxed group-hover:text-white">We continuously innovate to provide the best possible experience for our users.</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg transform transition-all duration-300 hover:-translate-y-2 hover:bg-blue-700 group">
            <h3 className="text-xl text-gray-800 mb-4 group-hover:text-white">Empowerment</h3>
            <p className="text-gray-700 leading-relaxed group-hover:text-white">We empower professionals to achieve their career goals and businesses to thrive.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
