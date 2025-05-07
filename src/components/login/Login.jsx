import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import loginImg from "../../assets/images/login.png";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from './../context/AuthContext';

export default function Login() {
  const [ShowPass, setShowPass] = useState(false);
  let [errorMsg, setErrorMsg] = useState(null);
  let [successMsg, setSuccessMsg] = useState(null);
  let [loading, setLoading] = useState(false);
  const {setToken} = useContext(AuthContext)
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Login";
  }, []);
  function showHide() {
    setShowPass((prev) => !prev);
  }
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required("email is required")
      .email("enter valid email"),
    password: yup
      .string()
      .required("password is required")
      .matches(/^[A-z0-9_]{8,30}$/, "password between 8 to 30 chars"),
  });
  async function login(values) {
    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);
    try {
      const res = await axios.post(
        "https://work-hive-project.vercel.app/api/v1/auth/login",
        values
      );
      setSuccessMsg(res.data.message);
      setToken(res.data.token)
      console.log(res);
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      setErrorMsg("Wrong email or password");
    } finally {
      setLoading(false);
    }
  }
  const Formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: login,
    validationSchema,
  });
  return (
    <>
      <section className="pt-24 pb-6">
        <div className="container w-full">
          <div className="inner w-[90%] mx-auto bg-white shadow-lg shadow-blue-800 lg:flex rounded-md">
            <div className="sm:hidden lg:block lg:w-3/5 bg-[#FAF5FF] rounded-md">
              <img src={loginImg} alt="" className="" />
            </div>
            <div className="lg:w-2/5 flex justify-center items-center p-10">
              <div className="w-full">
                <h2 className="text-3xl text-center font-bold text-blue-800 mb-6">
                  Sign In!
                </h2>
                <form onSubmit={Formik.handleSubmit}>
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
                  <Link
                    to={"/forgetpassword"}
                    className="block mb-6 text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Forget Password?
                  </Link>
                  <button
                    type="submit"
                    className="text-white bg-blue-800 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    {loading ? "loading..." : "submit"}
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
