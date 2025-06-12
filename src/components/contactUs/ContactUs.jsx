import React from "react";
import contactImg from "../../assets/images/contact.jpg";
import { useFormik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";
import aboutImg from '../../assets/images/about.jpg'

export default function ContactUs() {
  async function submitContact(values) {
    try{
      const res = await axios.post('https://work-hive-project.vercel.app/api/v1/contactUs', values)
      console.log(res);
      if(res.data.status == "success"){
        toast.success('Your message sent successfully')
      }
    }catch(err){
      console.log(err);
      
    }
    
  }
    const Formik = useFormik({
      initialValues: {
        name: "",
        email: "",
        message: "",
      },
      onSubmit: submitContact,
    });

  return (
    <>
      <section className="pt-28">
        <div className="container">
          <span className="text-blue-900 font-semibold mb-5">Contact Us</span>
          <h1 className="text-5xl font-bold">
            Feel free to <span className="text-blue-800">get in touch</span>
            <br />
            With us.
          </h1>
          <div className="lg:flex lg:items-center">
            <div className="lg:w-3/5">
              <form onSubmit={Formik.handleSubmit} className="mt-8 lg:mt-0">
                <div className="mb-6">
                  <input
                    name="name"
                    type="text"
                    placeholder="Name"
                    onChange={Formik.handleChange}
                    className="placeholder:text-slate-400 bg-white border-0 border-b-2 border-gray-300 text-gray-900 text-sm focus:border-b-blue-500 block w-[75%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div className="mb-6">
                  <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={Formik.handleChange}
                    className="placeholder:text-slate-400 bg-white border-0 border-b-2 border-gray-300 text-gray-900 text-sm focus:border-b-blue-500 block w-[75%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div className="mb-6">
                  <textarea
                    name="message"
                    rows="4"
                    className="placeholder:text-slate-400 block p-2.5 w-[75%] text-sm text-gray-900 bg-white border-0 border-b-2 border-gray-300 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Leave a comment..."
                    onChange={Formik.handleChange}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="text-white bg-blue-800 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Submit
                </button>
              </form>
            </div>
            <div className="lg:w-3/5">
              <img src={contactImg} className="w-full" alt="" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
