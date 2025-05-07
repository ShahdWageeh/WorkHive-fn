import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

export default function Checkout() {
  const { idS, idP } = useParams();
  const [availableTimes, setAvailableTimes] = useState([]);
  const { decoded, token } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchAvailableTimes = async () => {
      try {
        const res = await axios.get(
          `https://work-hive-project.vercel.app/api/v1/available_time/${idP}`
        );

        setAvailableTimes(res.data.data);
      } catch (error) {
        console.error("Error fetching times:", error);
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
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      phone: Yup.string()
        .matches(/^01[0-9]{9}$/, "Invalid phone")
        .required("Required"),
      address: Yup.string().required("Required"),
      region: Yup.string().required("Required"),
      booking_date: Yup.string().required("Required"),
      booking_time: Yup.string().required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const payload = {
        customerId: decoded.id,
        providerId: +idP,
        serviceId: +idS,
        ...values,
      };
      console.log(payload);

      try {
        const res = await axios.post(
          "https://work-hive-project.vercel.app/api/v1/bookings",
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log(res);
        navigate("/userProfile");
        alert("Booking sent!");
        resetForm();
      } catch (err) {
        alert("Failed to book. Try again.");
        console.error(err);
      }
    },
  });
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
                <option value="nasr city">Nasr City</option>
                <option value="badr">Badr</option>
                <option value="madinaty">Madinaty</option>
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
                  <option key={index} value={time.start_time}>
                    {time.start_time}
                  </option>
                ))}
              </select>
              {formik.touched.booking_time && formik.errors.booking_time && (
                <p className="text-red-500 text-sm">
                  {formik.errors.booking_time}
                </p>
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
