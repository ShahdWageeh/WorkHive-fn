import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import registerImg from "../../assets/images/register.png";

export default function Register() {
  const [ShowPass, setShowPass] = useState(false);
  const [ShowConfPass, setShowConfPass] = useState(false);
  let [errorMsg, setErrorMsg] = useState(null);
  let [successMsg, setSuccessMsg] = useState(null);
  let [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Register";
  }, []);
  function showHide() {
    setShowPass((prev) => !prev);
  }
  function showHideConfPass() {
    setShowConfPass((prev) => !prev);
  }
  async function register(values) {
    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);
    try {
      const res = await axios.post(
        "https://work-hive-project.vercel.app/api/v1/auth/signup",
        values
      );
      setSuccessMsg(res.data.status);
      navigate("/login");
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
    password: yup
      .string()
      .required("password is required")
      .matches(/^[A-z0-9_]{8,30}$/, "password between 8 to 30 chars"),
    confirmPassword: yup
      .string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("password"), "should match password"]),
    phone: yup
      .string()
      .required("phone is required")
      .matches(/^01[0125][0-9]{8}$/, "egyptians numbers only"),
    gender: yup
      .string()
      .oneOf(["male", "female"])
      .required("gender is required"),
    address: yup.string().required("address is required"),
  });
  const Formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      gender: "",
      address: "",
    },
    onSubmit: register,
    validationSchema,
  });
  return (
    <>
      <section className="min-h-full pt-24 pb-6">
        <div className="container w-full">
          <div className="inner bg-white shadow-lg shadow-blue-800 lg:flex rounded-md">
            <div className="lg:w-2/5  p-10">
              <h2 className="text-3xl text-center font-bold text-blue-800 mb-6">
                Sign Up!
              </h2>
              <form onSubmit={Formik.handleSubmit}>
                <div className="mb-6">
                  <input
                    onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur}
                    name="fullname"
                    type="text"
                    placeholder="User Name"
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
                <div className="mb-6">
                  <select
                    onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur}
                    name="address"
                    id="countries"
                    className="bg-gray-50 border border-gray-300 text-slate-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option defaultValue hidden>
                      Choose a Region
                    </option>
                    <option value="NC">New Cairo</option>
                    <option value="zayed">El-Sheikh Zayed</option>
                    <option value="sh">El-Sherouk</option>
                    <option value="fu">Future City</option>
                    <option value="rehab">El-Rehab</option>
                    <option value="badr">Badr City</option>
                    <option value="obour">El-Obour</option>
                  </select>
                </div>
                {Formik.errors.address && Formik.touched.address ? (
                  <div
                    className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                  >
                    <span className="font-medium">Danger alert!</span> choose
                    from the available region
                  </div>
                ) : null}
                <div className="mb-6">
                  <input
                    type="text"
                    id="disabled-input"
                    aria-label="Gender"
                    className="mb-6 bg-gray-100 border border-gray-300 text-slate-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    defaultValue="Gender"
                    disabled
                  />
                </div>
                <div className="mb-6 flex">
                  <div className="flex items-center me-4">
                    <input
                      onChange={Formik.handleChange}
                      onBlur={Formik.handleBlur}
                      checked={Formik.values.gender === "male"}
                      id="inline-radio"
                      type="radio"
                      value="male"
                      name="gender"
                      className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="inline-radio"
                      className="ms-2 font-medium text-gray-900 dark:text-gray-300"
                    >
                      Male
                    </label>
                  </div>
                  <div className="flex items-center me-4">
                    <input
                      onChange={Formik.handleChange}
                      onBlur={Formik.handleBlur}
                      checked={Formik.values.gender === "female"}
                      id="inline-2-radio"
                      type="radio"
                      value="female"
                      name="gender"
                      className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="inline-2-radio"
                      className="ms-2 font-medium text-gray-900 dark:text-gray-300"
                    >
                      Female
                    </label>
                  </div>
                </div>
                {Formik.errors.gender && Formik.touched.gender ? (
                  <div
                    className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                  >
                    {Formik.errors.gender}
                  </div>
                ) : null}
                <div className="mb-6 bg-gray-50 flex justify-between items-center border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <input
                    onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur}
                    name="password"
                    type={ShowPass ? "text" : "password"}
                    placeholder="Password"
                    className="placeholder:text-slate-400 border-0 bg-transparent p-2.5 w-full"
                  />
                  <i
                    onClick={showHide}
                    className={`${
                      ShowPass
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
                    name="confirmPassword"
                    type={ShowConfPass ? "text" : "password"}
                    placeholder="Confirm Password"
                    className="placeholder:text-slate-400 border-0 bg-transparent p-2.5 w-full"
                  />
                  <i
                    onClick={showHideConfPass}
                    className={`${
                      ShowConfPass
                        ? "fa-solid fa-eye p-2.5 text-slate-400 cursor-pointer"
                        : "fa-solid fa-eye-slash p-2.5 text-slate-400 cursor-pointer"
                    }`}
                  ></i>
                </div>
                {Formik.errors.confirmPassword && Formik.touched.confirmPassword ? (
                  <div
                    className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                  >
                    {Formik.errors.confirmPassword}
                  </div>
                ) : null}
                <div className="mb-6 flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      type="checkbox"
                      defaultValue
                      className="w-4 h-4 text-blue-600 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                      required
                    />
                  </div>
                  <label
                    htmlFor="remember"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    I agree with the{" "}
                    <a
                      href="#"
                      className="text-blue-600 hover:underline dark:text-blue-500"
                    >
                      terms and conditions
                    </a>
                    .
                  </label>
                </div>
                <button
                  type="submit"
                  className="text-white bg-blue-800 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {loading ? "loading...": "submit"}
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
            <div className="sm:hidden lg:block lg:w-3/5 bg-[#FAF5FF] rounded-md">
              <img src={registerImg} alt="" className="" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
