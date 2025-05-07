import React, { useContext, useEffect, useState } from "react";
import registerImg from "../../assets/images/update.png";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

export default function UpdateData() {
  let [errorMsg, setErrorMsg] = useState(null);
  let [successMsg, setSuccessMsg] = useState(null);
  let [loading, setLoading] = useState(false);
  const { token } = useContext(AuthContext);
  const [UserData, setUserData] = useState();
  // useEffect(()=>{
  //   token?setUserData(jwtDecode(JSON.stringify(token))):null;
  // },[token])
  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token); // Don't stringify if token is already a string
      setUserData(decoded);
      console.log(decoded.email);

      Formik.setValues({
        fullname: decoded.fullname || "",
        email: decoded.email || "",
        phone: decoded.phone || "",
      });
    }
  }, [token]);

  async function update(values) {
    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);
    try {
      const res = await axios.put(
        "https://work-hive-project.vercel.app/api/v1/users/updateMe",
        values,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccessMsg(res.data.status);
      if (res.data.status == "success") {
        toast.success("Your Data updated successfully");
      }
      console.log(res);
    } catch (err) {
      setErrorMsg(err.message);
      console.log(err);
    } finally {
      setLoading(false);
    }
  }
  const validationSchema = yup.object().shape({
    fullname: yup
      .string()
      .required("name is required")
      .min(3, "min chars is 3")
      .max(30, "max chars is 30"),
    email: yup
      .string()
      .required("email is required")
      .email("enter valid email"),
    phone: yup
      .string()
      .required("phone is required")
      .matches(/^01[0125][0-9]{8}$/, "egyptians numbers only"),
  });
  const Formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      phone: "",
    },
    onSubmit: update,
    validationSchema,
  });
  return (
    <>
      <section className="pt-28 pb-6">
        <div className="container w-full">
          <div className="inner w-[90%] mx-auto bg-white shadow-lg shadow-blue-800 lg:flex rounded-md">
            <div className="sm:hidden lg:block lg:w-3/5 bg-[#FAF5FF] rounded-md">
              <img src={registerImg} alt="" className="" />
            </div>
            <div className="lg:w-2/5 flex justify-center items-center p-10">
              <div className="w-full">
                <h2 className="text-3xl text-center font-bold text-blue-800 mb-6">
                  Update your Data!
                </h2>
                <form onSubmit={Formik.handleSubmit}>
                  <div className="mb-6">
                    <input
                      onChange={Formik.handleChange}
                      onBlur={Formik.handleBlur}
                      value={Formik.values.fullname}
                      name="fullname"
                      type="text"
                      placeholder="Name"
                      className="placeholder:text-slate-400 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  {Formik.errors.fullname && Formik.touched.fullname ? (
                    <div
                      className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                      role="alert"
                    >
                      {Formik.errors.fullname}
                    </div>
                  ) : null}
                  <div className="mb-6">
                    <input
                      onChange={Formik.handleChange}
                      onBlur={Formik.handleBlur}
                      value={Formik.values.email}
                      name="email"
                      type="email"
                      placeholder="Email"
                      className="placeholder:text-slate-400 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  {Formik.errors.email && Formik.touched.email ? (
                    <div
                      className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                      role="alert"
                    >
                      {Formik.errors.email}
                    </div>
                  ) : null}
                  <div className="mb-6">
                    <input
                      onChange={Formik.handleChange}
                      onBlur={Formik.handleBlur}
                      value={Formik.values.phone}
                      name="phone"
                      type="tel"
                      placeholder="Phone"
                      className="placeholder:text-slate-400 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  {Formik.errors.phone && Formik.touched.phone ? (
                    <div
                      className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                      role="alert"
                    >
                      {Formik.errors.phone}
                    </div>
                  ) : null}
                  <button
                    type="submit"
                    className="text-white bg-blue-800 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    {loading ? "Updating" : "Submit"}
                  </button>
                </form>
                {errorMsg ? (
                  <div className="text-red-600 text-center text-2xl">
                    {errorMsg}
                  </div>
                ) : null}
                {successMsg ? (
                  <div className="text-emerald-600 text-center text-2xl">
                    {successMsg}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
