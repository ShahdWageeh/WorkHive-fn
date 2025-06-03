import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import FeedbackModal from "../feedbackModal/FeedbackModal";

export default function UserProfile() {
  const { token } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [showDeleteReviewPopup, setShowDeleteReviewPopup] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings' or 'reviews'

  // Function to convert 24-hour time to 12-hour format
  const convertTo12Hour = (time24) => {
    const [hours, minutes] = time24.split(":");
    let hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12; // Convert to 12-hour format
    return `${hour}:${minutes.slice(0, 2)} ${ampm}`; // Include AM/PM
  };

  async function getBookings() {
    try {
      const res = await axios.get(
        "https://work-hive-project.vercel.app/api/v1/bookings",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      setBookings(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function getReviews() {
    try {
      const res = await axios.get(
        "https://work-hive-project.vercel.app/api/v1/reviews/users",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(res.data);
      setReviews(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function cancelBooking(id) {
    console.log(id, token, "id, token");
    try {
      const res = await fetch(
        `https://work-hive-project.vercel.app/api/v1/bookings/cancel/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      console.log(data);
      getBookings();
      if (data.status === "fail") {
        toast.error(data.message);
      } else {
        toast.success("Booking canceled successfully");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteReview(reviewId) {
    try {
      await axios.delete(
        `https://work-hive-project.vercel.app/api/v1/reviews/${reviewId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Review deleted successfully");
      getReviews(); // Refresh reviews after deletion
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete review");
      console.log(error);
    }
  }

  useEffect(() => {
    getBookings();
    getReviews();
  }, [token]);

  const handleCancelClick = (id) => {
    setSelectedBookingId(id);
    setShowConfirmPopup(true);
  };

  const handleConfirmCancel = () => {
    if (selectedBookingId) {
      cancelBooking(selectedBookingId);
    }
    setShowConfirmPopup(false);
    setSelectedBookingId(null);
  };

  const handleCancelPopup = () => {
    setShowConfirmPopup(false);
    setSelectedBookingId(null);
  };

  const handleFeedbackClick = (booking) => {
    setSelectedBooking(booking);
    setShowFeedbackModal(true);
  };

  const handleDeleteReviewClick = (reviewId) => {
    setSelectedReviewId(reviewId);
    setShowDeleteReviewPopup(true);
  };

  const handleConfirmDeleteReview = () => {
    if (selectedReviewId) {
      deleteReview(selectedReviewId);
    }
    setShowDeleteReviewPopup(false);
    setSelectedReviewId(null);
  };

  const handleCancelDeleteReview = () => {
    setShowDeleteReviewPopup(false);
    setSelectedReviewId(null);
  };

  const toggleTab = () => {
    setActiveTab(activeTab === 'bookings' ? 'reviews' : 'bookings');
  };

  return (
    <>
      <section className="py-32">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-blue-800 mb-8">
              {activeTab === 'bookings' ? 'My Bookings' : 'My Reviews'}
            </h2>
            <button 
              onClick={toggleTab} 
              className="text-white mb-8 bg-blue-800 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              {activeTab === 'bookings' ? 'Reviews' : 'Bookings'}
            </button>
          </div>

          {/* Confirmation Popup for Booking Cancellation */}
          {showConfirmPopup && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <h3 className="text-lg font-semibold mb-4">
                  Confirm Cancellation
                </h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to cancel this booking?
                </p>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={handleCancelPopup}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                  >
                    No, Keep it
                  </button>
                  <button
                    onClick={handleConfirmCancel}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 font-medium"
                  >
                    Yes, Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Confirmation Popup for Review Deletion */}
          {showDeleteReviewPopup && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <h3 className="text-lg font-semibold mb-4">
                  Confirm Delete Review
                </h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete this review? This action cannot be undone.
                </p>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={handleCancelDeleteReview}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                  >
                    No, Keep it
                  </button>
                  <button
                    onClick={handleConfirmDeleteReview}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 font-medium"
                  >
                    Yes, Delete
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Feedback Modal */}
          <FeedbackModal
            isOpen={showFeedbackModal}
            onClose={() => {
              setShowFeedbackModal(false);
              setSelectedBooking(null);
            }}
            bookingId={selectedBooking?.id}
            providerId={selectedBooking?.serviceProvider?.id}
            token={token}
          />

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            {activeTab === 'bookings' ? (
              <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3">ID</th>
                    <th scope="col" className="px-6 py-3">Category</th>
                    <th scope="col" className="px-6 py-3">Service</th>
                    <th scope="col" className="px-6 py-3">Booking Date</th>
                    <th scope="col" className="px-6 py-3">Booking Time</th>
                    <th scope="col" className="px-6 py-3">Provider</th>
                    <th scope="col" className="px-6 py-3">Payment Method</th>
                    <th scope="col" className="px-6 py-3">Status</th>
                    <th scope="col" className="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings?.data?.map((book) => {
                    return (
                      <tr className="bg-white border-b hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900">
                          {book.id}
                        </td>
                        <td className="px-6 py-4">
                          {book.service.category.name}
                        </td>
                        <td className="px-6 py-4">{book.service.name}</td>
                        <td className="px-6 py-4">{book.booking_date}</td>
                        <td className="px-6 py-4">
                          {convertTo12Hour(book.booking_time)}
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900">
                          {" "}
                          {book.serviceProvider.name}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <span className="text-gray-700">
                              {book.paymentMethod || "Cash"}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 text-xs font-semibold rounded-full ${
                              book.status === true
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {book.status === true ? "Accepted" : "Canceled"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2 gap-4">
                            <button
                              onClick={() => handleCancelClick(book.id)}
                              disabled={!book.status}
                              className={`text-sm font-medium ${
                                !book.status
                                  ? "text-gray-400 cursor-not-allowed"
                                  : "text-red-600 hover:text-red-900"
                              }`}
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleFeedbackClick(book)}
                              disabled={!book.status}
                              className={`text-sm font-medium ${
                                !book.status
                                  ? "text-gray-400 cursor-not-allowed"
                                  : "text-blue-600 hover:text-blue-900"
                              }`}
                            >
                              Add Feedback
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3">ID</th>
                    <th scope="col" className="px-6 py-3">Rating</th>
                    <th scope="col" className="px-6 py-3">Feedback</th>
                    <th scope="col" className="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews?.data?.map((review) => (
                    <tr key={review.id} className="bg-white border-b hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {review.id}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          {Array.from({ length: Math.round(parseFloat(review.rating)) }, (_, index) => (
                            <svg
                              key={index}
                              className="w-4 h-4 text-yellow-300"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 22 20"
                            >
                              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                          ))}
                          <span className="ml-1">({review.rating})</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {review.comment}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2 gap-4">
                          <button
                            onClick={() => handleFeedbackClick(review)}
                            className="text-blue-600 hover:text-blue-900 font-medium text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteReviewClick(review.id)}
                            className="text-red-600 hover:text-red-900 font-medium text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
