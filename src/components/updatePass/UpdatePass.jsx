import React, { useContext, useEffect, useState } from "react";
import registerImg from "../../assets/images/update.png";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import loginImg from "../../assets/images/login.png";

export default function UpdatePass() {
  let [errorMsg, setErrorMsg] = useState(null);
  let [successMsg, setSuccessMsg] = useState(null);
  let [loading, setLoading] = useState(false);
  const { token, setToken } = useContext(AuthContext);
  const [ShowPass, setShowPass] = useState({
    old: false,
    new: false,
    confirm: false,
  });
  function showHide(input) {
    setShowPass((prev) => ({ ...prev, [input]: !prev[input] }));
  }
  async function update(values) {
    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);
    try {
      const res = await axios.put(
        "https://work-hive-project.vercel.app/api/v1/users/changeMyPassword",
        values,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccessMsg(res.data.status);
      if (res.data.status == "success") {
        toast.success("Your Data updated successfully");
        localStorage.setItem('token', res?.data?.token)
        setToken(res.data.token)
      }
      console.log(res);
    } catch (err) {
      setErrorMsg(err.response.data.message);
      console.log(err);
    } finally {
      setLoading(false);
    }
  }
  const validationSchema = yup.object().shape({
    password: yup
      .string()
      .required("password is required")
      .matches(/^[A-z0-9_]{8,30}$/, "password between 8 to 30 chars"),
    rePassword: yup
      .string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("password"), "should match password"]),
  });
  const Formik = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
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
              <img src={loginImg} alt="" className="" />
            </div>
            <div className="lg:w-2/5 flex justify-center items-center p-10">
              <div className="w-full">
                <h2 className="text-3xl text-center font-bold text-blue-800 mb-6">
                  Change your Password!
                </h2>
                <form onSubmit={Formik.handleSubmit}>
                  <div className="mb-6 bg-gray-50 flex justify-between items-center border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <input
                      onChange={Formik.handleChange}
                      onBlur={Formik.handleBlur}
                      name="currentPassword"
                      type={ShowPass.old ? "text" : "password"}
                      placeholder="Current Password"
                      className="placeholder:text-slate-400 border-0 bg-transparent p-2.5 w-full"
                    />
                    <i
                      onClick={() => {
                        showHide("old");
                      }}
                      className={`${
                        ShowPass.old
                          ? "fa-solid fa-eye p-2.5 text-slate-400 cursor-pointer"
                          : "fa-solid fa-eye-slash p-2.5 text-slate-400 cursor-pointer"
                      }`}
                    ></i>
                  </div>
                  {Formik.errors.currentPassword && Formik.touched.currentPassword ? (
                    <div
                      className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                      role="alert"
                    >
                      {Formik.errors.currentPassword}
                    </div>
                  ) : null}
                  <div className="mb-6 bg-gray-50 flex justify-between items-center border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <input
                      onChange={Formik.handleChange}
                      onBlur={Formik.handleBlur}
                      name="password"
                      type={ShowPass.new ? "text" : "password"}
                      placeholder="New Password"
                      className="placeholder:text-slate-400 border-0 bg-transparent p-2.5 w-full"
                    />
                    <i
                      onClick={() => {
                        showHide("new");
                      }}
                      className={`${
                        ShowPass.new
                          ? "fa-solid fa-eye p-2.5 text-slate-400 cursor-pointer"
                          : "fa-solid fa-eye-slash p-2.5 text-slate-400 cursor-pointer"
                      }`}
                    ></i>
                  </div>
                  {Formik.errors.password && Formik.touched.password ? (
                    <div
                      className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                      role="alert"
                    >
                      {Formik.errors.password}
                    </div>
                  ) : null}
                  <div className="mb-6 bg-gray-50 flex justify-between items-center border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <input
                      onChange={Formik.handleChange}
                      onBlur={Formik.handleBlur}
                      name="rePassword"
                      type={ShowPass.confirm ? "text" : "password"}
                      placeholder="Confirm New Password"
                      className="placeholder:text-slate-400 border-0 bg-transparent p-2.5 w-full"
                    />
                    <i
                      onClick={() => {
                        showHide("confirm");
                      }}
                      className={`${
                        ShowPass.confirm
                          ? "fa-solid fa-eye p-2.5 text-slate-400 cursor-pointer"
                          : "fa-solid fa-eye-slash p-2.5 text-slate-400 cursor-pointer"
                      }`}
                    ></i>
                  </div>
                  {Formik.errors.rePassword && Formik.touched.rePassword ? (
                    <div
                      className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                      role="alert"
                    >
                      {Formik.errors.rePassword}
                    </div>
                  ) : null}
                  <button
                    type="submit"
                    className="text-white bg-blue-800 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    {loading? "Updating": "Submit"}
                  </button>
                </form>
                {errorMsg ? (
                  <div className="text-red-800 py-2 mt-4 bg-red-100 rounded-md text-center text-2xl">
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
