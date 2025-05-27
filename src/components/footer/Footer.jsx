import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";

export default function Footer() {
  return (
    <>
      <footer className="bg-blue-900 shadow-sm dark:bg-gray-900">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Logo and About */}
            <div className="col-span-1">
              <Link to="/" className="flex items-center mb-4 space-x-3 rtl:space-x-reverse">
                <img src={logo} className="h-12 brightness-0 invert" alt="WorkHive Logo" />
              </Link>
              <p className="text-gray-300 text-sm mt-4">
                Your trusted platform for home services. Connect with verified professionals for quality service delivery.
              </p>
            </div>

            {/* Quick Links */}
            <div className="col-span-1">
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="text-gray-300 space-y-2">
                <li>
                  <Link to="/about" className="hover:text-blue-400 transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/categories" className="hover:text-blue-400 transition-colors">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link to="/contactUs" className="hover:text-blue-400 transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-blue-400 transition-colors">
                    Join as Provider
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div className="col-span-1">
              <h3 className="text-white font-semibold mb-4">Our Services</h3>
              <ul className="text-gray-300 space-y-2">
                <li>
                  <Link to="/categories" className="hover:text-blue-400 transition-colors">
                    Home Repairs
                  </Link>
                </li>
                <li>
                  <Link to="/categories" className="hover:text-blue-400 transition-colors">
                    Electrical Services
                  </Link>
                </li>
                <li>
                  <Link to="/categories" className="hover:text-blue-400 transition-colors">
                    Plumbing
                  </Link>
                </li>
                <li>
                  <Link to="/categories" className="hover:text-blue-400 transition-colors">
                    Appliance Repair
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="col-span-1">
              <h3 className="text-white font-semibold mb-4">Contact Info</h3>
              <ul className="text-gray-300 space-y-2">
                <li className="flex items-center space-x-2">
                  <i className="fas fa-phone"></i>
                  <span>+1 234 567 8900</span>
                </li>
                <li className="flex items-center space-x-2">
                  <i className="fas fa-envelope"></i>
                  <span>WorkHive55@gmail.com</span>
                </li>
              </ul>
            </div>
          </div>

          <hr className="my-6 border-gray-500 sm:mx-auto dark:border-gray-700" />
          
          {/* Bottom Section */}
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="block text-sm text-gray-300 sm:text-center">
              © {new Date().getFullYear()} WorkHive™. All Rights Reserved.
            </span>
            <ul className="flex flex-wrap items-center mt-4 sm:mt-0 text-sm font-medium text-gray-300">
              <li>
                <a href="#" className="hover:text-blue-400 me-4 md:me-6">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 me-4 md:me-6">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}
