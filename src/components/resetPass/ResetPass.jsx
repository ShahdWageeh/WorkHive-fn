import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./../context/AuthContext";

export default function ResetPass() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  let [loading, setLoading] = useState(false);
  const { setToken } = useContext(AuthContext);
  useEffect(() => {
    document.title = "Reset Password";
  }, []);

  async function handleSubmit(values) {
    setLoading(true);
    try {
      const res = await axios.put(
        "https://work-hive-project.vercel.app/api/v1/auth/resetPassword",
        {
          email: values.email,
          newPassword: values.newPassword,
        }
      );
      if (res.data.token) {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        navigate("/");
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError(res.data.message);
    } finally {
      setLoading(false);
    }
  }
  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      newPassword: Yup.string()
        .required("Required")
        .matches(/^[A-z0-9_]{8,30}$/, "password between 8 to 30 chars"),
    }),
    onSubmit: handleSubmit,
  });
  return (
    <>
      <section className=" bg-blue-900 pt-28 pb-6 min-h-screen flex items-center">
        <div className="container w-full">
          <div className="inner w-[90%] mx-auto bg-white shadow-lg lg:w-[50%] rounded-md pt-8 pb-4">
            <h2 className="text-3xl text-center font-bold text-blue-800 mb-6">
              Reset Your Password
            </h2>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-6">
                <input
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  type="email"
                  placeholder="enter your email"
                  className="placeholder:text-slate-400 w-[80%] mx-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              {formik.touched.email && formik.errors.email ? (
                <div className="mb-6 text-center text-red-600 dark:bg-gray-800 dark:text-red-400">
                  {formik.errors.email}
                </div>
              ) : null}
              <div className="mb-6">
                <input
                  name="newPassword"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.newPassword}
                  type="password"
                  placeholder="enter new Password"
                  className="placeholder:text-slate-400 w-[80%] mx-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              {formik.touched.newPassword && formik.errors.newPassword ? (
                <div className="mb-6 text-center text-red-600 dark:bg-gray-800 dark:text-red-400">
                  {formik.errors.newPassword}
                </div>
              ) : null}
              {error && (
                <div className="mb-6 text-center text-red-600">{error}</div>
              )}
              <button
                type="submit"
                className="text-white mb-6 block mx-auto bg-blue-800 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {loading ? "loading..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
