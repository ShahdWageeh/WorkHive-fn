import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

export default function UserProfile() {
  const { token } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);

  // Function to convert 24-hour time to 12-hour format
  const convertTo12Hour = (time24) => {
    const [hours, minutes] = time24.split(':');
    let hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12; // Convert to 12-hour format
    return `${hour}:${minutes.slice(0,2)} ${ampm}`; // Include AM/PM
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
  async function cancelBooking(id) {
    // try {
    //   const res = await axios.patch(`https://work-hive-project.vercel.app/api/v1/bookings/cancel/${id}`, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   });
    //   console.log(res);
    // } catch (err) {
    //   console.log(err);
    //   if(err.response.data.status === 'fail'){
    //     alert(err.response.data.message);
    //     console.log(id);
        
    //   }
    // }
    console.log(id, token, "id, token");
    try {
      const res = await fetch(`https://work-hive-project.vercel.app/api/v1/bookings/cancel/${id}`, {  
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      console.log(data);
      if(data.status === 'fail'){
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      
    }
    
  }
  useEffect(() => {
    getBookings();
    // console.log(token);
    
  }, [token]);
  return (
    <>
      <section className="py-32">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-blue-800 mb-8">My Bookings</h2>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Service
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Booking Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Booking Time
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Provider
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Payment Method
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {bookings?.data?.map((book) => {
                  return (
                    <tr className="bg-white border-b hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {book.id}
                      </td>
                      <td className="px-6 py-4">{book.service.category.name}</td>
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
                          <span className="text-gray-700">{book.paymentMethod || "Cash"}</span>
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
                          <button onClick={()=>cancelBooking(book.id)} className="text-red-600 hover:text-red-900 font-medium text-sm">
                            Cancel
                          </button>
                          <button className="text-blue-600 hover:text-blue-900 font-medium text-sm">
                            Add Feedback
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
