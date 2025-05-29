import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

export default function Checkout() {
  const { idS, idP, price } = useParams();
  const [availableTimes, setAvailableTimes] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const { decoded, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Get today's date in YYYY-MM-DD format for date input min attribute
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchAvailableTimes = async () => {
      try {
        const res = await axios.get(
          `https://work-hive-project.vercel.app/api/v1/available_time/${idP}`
        );
        setAvailableTimes(res.data.data);
      } catch (error) {
        console.error("Error fetching times:", error);
        toast.error("Failed to fetch available times");
      }
    };

    if (idP) {
      fetchAvailableTimes();
    }
  }, [idP]);

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      address: "",
      region: "",
      booking_date: "",
      booking_time: "",
      paymentMethod: "cash", // Set default payment method
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Name must be at least 3 characters")
        .required("Name is required"),
      phone: Yup.string()
        .matches(/^01[0-9]{9}$/, "Invalid Egyptian phone number")
        .required("Phone number is required"),
      address: Yup.string()
        .min(5, "Address must be at least 5 characters")
        .required("Address is required"),
      region: Yup.string().required("Region is required"),
      booking_date: Yup.date()
        .min(today, "Cannot book for past dates")
        .required("Booking date is required"),
      booking_time: Yup.string().required("Booking time is required"),
      paymentMethod: Yup.string().required("Payment method is required"),
    }),
    onSubmit: async (values) => {
      try {
        console.log(paymentMethod , 'paymentMethod')
        // Format the booking_time to remove seconds
        const formattedTime = values.booking_time.split(':').slice(0, 2).join(':');

        const payload = {
          customerId: decoded.id,
          providerId: +idP,
          serviceId: +idS,
          ...values,
          booking_time: formattedTime, // Use the formatted time
          paymentMethod,
        };
        if(paymentMethod === 'visa') {
          handleVisaPayment(payload);
        }else{
        const res = await axios.post(
          "https://work-hive-project.vercel.app/api/v1/bookings",
          payload,
          { 
            headers: { 
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            } 
          }
        );

        toast.success("Booking successful!");
        console.log(res);
      }
      } catch (err) {
        console.error("Booking error:", err);
        toast.error(err.response?.data?.message || "Failed to book. Please Login First");
        
      }
    },
  });
  async function handleVisaPayment(payload) {
    console.log('visa');
    const {name,phone,address,region,booking_date,booking_time} = payload
    const payloadForVisa = {
     providerId : +idP,
     name,
     phone,
     address,
     region,
     booking_date,
     booking_time
    }
   
    const res = await axios.post(
     `https://work-hive-project.vercel.app/api/v1/payments/create-checkout-session/${idS}?successUrl=http://${window.location.host}/success`,
     payloadForVisa,
     {
       headers: { 
         Authorization: `Bearer ${token}`,
         'Content-Type': 'application/json'
       }
     }
    );
    console.log(res , 'res for visa');
    if(res.status === 200) {
     localStorage.setItem("stripe_session_id", res.data.sessionId);
     setTimeout(() => {
       toast.success("Redirecting to payment page...");
       window.open(res.data.url, "_blank");
     }, 1000);
    }
   }

  // Update formik when payment method changes
  useEffect(() => {
    formik.setFieldValue("paymentMethod", paymentMethod);
  }, [paymentMethod]);

  return (
    <>
      <section className="pt-32 py-10">
        <div className="container">
          <form
            onSubmit={formik.handleSubmit}
            className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg shadow-blue-800 space-y-5"
          >
            <h2 className="text-3xl font-semibold text-blue-800 mb-4 text-center">
              Book a Service
            </h2>

            {/* Price Display */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">
                  Service Price:
                </span>
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-blue-800">
                    ${price}
                  </span>
                </div>
              </div>
            </div>

            {/* Name */}
            <div>
              <input
                type="text"
                name="name"
                className="placeholder:text-slate-400 form-input w-full focus:ring-blue-500 focus:border-blue-500 rounded-md border-gray-300"
                placeholder="Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-500 text-sm">{formik.errors.name}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <input
                type="text"
                name="phone"
                className="placeholder:text-slate-400 form-input w-full focus:ring-blue-500 focus:border-blue-500 rounded-md border-gray-300"
                placeholder="Phone"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
              />
              {formik.touched.phone && formik.errors.phone && (
                <p className="text-red-500 text-sm">{formik.errors.phone}</p>
              )}
            </div>

            {/* Address */}
            <div>
              <input
                type="text"
                name="address"
                className="placeholder:text-slate-400 form-input w-full focus:ring-blue-500 focus:border-blue-500 rounded-md border-gray-300"
                placeholder="Adress"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
              />
              {formik.touched.address && formik.errors.address && (
                <p className="text-red-500 text-sm">{formik.errors.address}</p>
              )}
            </div>

            {/* Region */}
            <div>
              <select
                name="region"
                className={`form-select w-full rounded-md focus:ring-blue-500 focus:border-blue-500 border-gray-300 ${
                  formik.values.region === "" ? "text-slate-400" : "text-black"
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.region}
              >
                <option value="" disabled selected hidden>
                  Select region
                </option>
                <option value="NC">New Cairo</option>
                <option value="zayed">El-Sheikh Zayed</option>
                <option value="sh">El-Sherouk</option>
                <option value="fu">Future City</option>
                <option value="rehab">El-Rehab</option>
                <option value="badr">Badr City</option>
                <option value="obour">El-Obour</option>
              </select>
              {formik.touched.region && formik.errors.region && (
                <p className="text-red-500 text-sm">{formik.errors.region}</p>
              )}
            </div>

            {/* Booking Date */}
            <div>
              <input
                type="date"
                name="booking_date"
                min={today}
                className="form-input w-full focus:ring-blue-500 focus:border-blue-500 rounded-md border-gray-300"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.booking_date}
              />
              {formik.touched.booking_date && formik.errors.booking_date && (
                <p className="text-red-500 text-sm">
                  {formik.errors.booking_date}
                </p>
              )}
            </div>

            {/* Booking Time */}
            <div>
              <select
                name="booking_time"
                className={`form-select w-full rounded-md focus:ring-blue-500 focus:border-blue-500 border-gray-300 ${
                  formik.values.booking_time === ""
                    ? "text-slate-400"
                    : "text-black"
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.booking_time}
              >
                <option value="" disabled selected hidden>
                  Select a time
                </option>
                {availableTimes?.map((time, index) => (
                  <option
                    key={index}
                    value={time.start_time.split(":").slice(0, 2).join(":")}
                  >
                    {time.start_time.split(":").slice(0, 2).join(":")}
                  </option>
                ))}
              </select>
              {formik.touched.booking_time && formik.errors.booking_time && (
                <p className="text-red-500 text-sm">
                  {formik.errors.booking_time}
                </p>
              )}
            </div>

            {/* Payment Method */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Payment Method
              </label>
              <div className="grid grid-cols-3 gap-4">
                <div
                  className={`relative border rounded-lg p-4 cursor-pointer transition-all ${
                    paymentMethod === "cash"
                      ? "border-blue-800 bg-blue-50 shadow-sm"
                      : "border-gray-200 hover:border-blue-400"
                  }`}
                  onClick={() => setPaymentMethod("cash")}
                >
                  <input
                    type="radio"
                    id="cash"
                    name="paymentMethod"
                    value="cash"
                    checked={paymentMethod === "cash"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="sr-only"
                  />
                  <label
                    htmlFor="cash"
                    className="flex flex-col items-center justify-center cursor-pointer"
                  >
                    <i className="fas fa-money-bill text-2xl text-green-600 mb-2"></i>
                    <span className="text-sm font-medium">Cash</span>
                  </label>
                  {paymentMethod === "cash" && (
                    <div className="absolute top-2 right-2">
                      <i className="fas fa-check-circle text-blue-800"></i>
                    </div>
                  )}
                </div>

                <div
                  className={`relative border rounded-lg p-4 cursor-pointer transition-all ${
                    paymentMethod === "visa"
                      ? "border-blue-800 bg-blue-50 shadow-sm"
                      : "border-gray-200 hover:border-blue-400"
                  }`}
                  onClick={() => setPaymentMethod("visa")}
                >
                  <input
                    type="radio"
                    id="visa"
                    name="paymentMethod"
                    value="visa"
                    checked={paymentMethod === "visa"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="sr-only"
                  />
                  <label
                    htmlFor="visa"
                    className="flex flex-col items-center justify-center cursor-pointer"
                  >
                    <i className="fab fa-cc-visa text-2xl text-blue-600 mb-2"></i>
                    <span className="text-sm font-medium">Visa</span>
                  </label>
                  {paymentMethod === "visa" && (
                    <div className="absolute top-2 right-2">
                      <i className="fas fa-check-circle text-blue-800"></i>
                    </div>
                  )}
                </div>

                <div
                  className={`relative border rounded-lg p-4 cursor-pointer transition-all ${
                    paymentMethod === "wallet"
                      ? "border-blue-800 bg-blue-50 shadow-sm"
                      : "border-gray-200 hover:border-blue-400"
                  }`}
                  onClick={() => setPaymentMethod("wallet")}
                >
                  <input
                    type="radio"
                    id="wallet"
                    name="paymentMethod"
                    value="wallet"
                    checked={paymentMethod === "wallet"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="sr-only"
                  />
                  <label
                    htmlFor="wallet"
                    className="flex flex-col items-center justify-center cursor-pointer"
                  >
                    <i className="fas fa-wallet text-2xl text-orange-600 mb-2"></i>
                    <span className="text-sm font-medium">Wallet</span>
                  </label>
                  {paymentMethod === "wallet" && (
                    <div className="absolute top-2 right-2">
                      <i className="fas fa-check-circle text-blue-800"></i>
                    </div>
                  )}
                </div>
              </div>

              {/* Wallet Payment Information */}
              {paymentMethod === "wallet" && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <i className="fas fa-info-circle text-blue-600"></i>
                    <p className="font-medium text-blue-800">
                      Wallet Payment Details:
                    </p>
                  </div>
                  <p className="text-blue-700 font-medium mb-2">
                    Payment Number:{" "}
                    <span className="text-blue-900">01067943731</span>
                  </p>
                  <div className="flex items-start space-x-2 text-orange-600">
                    <i className="fas fa-exclamation-triangle mt-1"></i>
                    <p className="text-sm">
                      Note: If the payment is not made within an hour from
                      completing the booking, it will be automatically canceled.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-800 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Book Service
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
