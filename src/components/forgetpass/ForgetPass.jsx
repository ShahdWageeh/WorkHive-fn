import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgetPass() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  let [loading, setLoading] = useState(false);
  useEffect(() => {
    document.title = "Forget Password";
  }, []);
  async function handleSubmit(values) {
    setLoading(true);
    try {
      const res = await axios.post(
        "https://work-hive-project.vercel.app/api/v1/auth/forgotPassword",
        { email: values.email }
      );
      if (res.data.status === "success") {
        navigate("/resetcode");
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError("An error occurred. Please try again.", err);
    } finally {
      setLoading(false);
    }
  }
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: yup.object({
      email: yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: handleSubmit,
  });
  return (
    <>
      <section className=" bg-blue-900 pt-28 pb-6 min-h-screen flex items-center">
        <div className="container w-full">
          <div className="inner w-[90%] mx-auto bg-white shadow-lg lg:w-[50%] rounded-md pt-8 pb-4">
            <h2 className="text-3xl text-center font-bold text-blue-800 mb-6">
              Forget Your Password?
            </h2>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-6">
                <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  name="email"
                  type="email"
                  placeholder="enter Your Email"
                  className="placeholder:text-slate-400 w-[80%] mx-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              {formik.touched.email && formik.errors.email ? (
                <div
                  className="mb-6 text-center text-red-600 dark:bg-gray-800 dark:text-red-400"
                >
                  {formik.errors.email}
                </div>
              ) : null}
              {error && <div className="mb-6 text-center text-red-600">Incorrect email</div>}
              <button
                type="submit"
                className="text-white mb-6 block mx-auto bg-blue-800 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {loading ? "Sending..." : "Send reset code"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
