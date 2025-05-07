import React, { useEffect, useState } from "react";
import landingImg from "../../assets/images/landing2.png";
import SlideIn from "../animation/SlideIn";
import useCategories from "../../Hooks/useCategories";
import { Link } from "react-router-dom";
import HomeReviews from "../homeReviews/HomeReviews";

export default function Home() {
  const { getCategories, catData } = useCategories();
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
      {/* landing */}
      <SlideIn direction="left">
        <section className="py-24 overflow-x-hidden">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-3 justify-items-center items-center gap-8">
              <div className="col-span-1">
                <h1 className="text-4xl font-bold">
                  All Your Home Repairs In One Place Just
                  <br /> <span className="text-blue-800">for you.</span>{" "}
                </h1>
                <p className="my-5 text-slate-700 text-xl">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Maxime nostrum sequi quis labore iste nemo sunt ut deleniti
                  autem. Ad!
                </p>
                <a
                  href=""
                  type="button"
                  className="text-white bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                  Learn More
                </a>
                <a
                  href=""
                  type="button"
                  className="text-white bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                  Join as Provider
                </a>
              </div>
              <div className="col-span-2">
                <img src={landingImg} alt="" className="w-[750px]" />
              </div>
            </div>
          </div>
        </section>
      </SlideIn>
      {/* services */}
      <SlideIn direction="right">
        <section className="pb-5 overflow-x-hidden">
          <div className="container">
            <p className="text-center text-blue-950 font-semibold text-xl">
              Features
            </p>
            <h1 className="text-4xl font-bold text-center">
              We have Amazing <span className="text-blue-800">Services.</span>
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-10">
              <div className="flex group/service">
                <div className="w-[30px] h-[30px] border rounded-full p-7 flex justify-center items-center mr-3 transition-all group-hover/service:bg-blue-800">
                  <i className="fa-solid fa-shield-halved text-blue-800 text-xl group-hover/service:text-white transition-all"></i>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold">Secure</h2>
                  <p className="text-slate-700 mt-2">
                    We strictly only deal with vendors that provide top notch
                    security.
                  </p>
                </div>
              </div>
              <div className="flex group/service">
                <div className="w-[30px] h-[30px] border rounded-full p-7 flex justify-center items-center mr-3 transition-all group-hover/service:bg-blue-800">
                  <i className="fa-solid fa-shield-halved text-blue-800 text-xl transition-all group-hover/service:text-white"></i>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold">Secure</h2>
                  <p className="text-slate-700 mt-2">
                    We strictly only deal with vendors that provide top notch
                    security.
                  </p>
                </div>
              </div>
              <div className="flex group/service">
                <div className="w-[30px] h-[30px] border rounded-full p-7 flex justify-center items-center mr-3 transition-all group-hover/service:bg-blue-800">
                  <i className="fa-solid fa-shield-halved text-blue-800 text-xl transition-all group-hover/service:text-white"></i>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold">Secure</h2>
                  <p className="text-slate-700 mt-2">
                    We strictly only deal with vendors that provide top notch
                    security.
                  </p>
                </div>
              </div>
              <div className="flex group/service">
                <div className="w-[30px] h-[30px] border rounded-full p-7 flex justify-center items-center mr-3 transition-all group-hover/service:bg-blue-800">
                  <i className="fa-solid fa-shield-halved text-blue-800 text-xl transition-all group-hover/service:text-white"></i>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold">Secure</h2>
                  <p className="text-slate-700 mt-2">
                    We strictly only deal with vendors that provide top notch
                    security.
                  </p>
                </div>
              </div>
              <div className="flex group/service">
                <div className="w-[30px] h-[30px] border rounded-full p-7 flex justify-center items-center mr-3 transition-all group-hover/service:bg-blue-800">
                  <i className="fa-solid fa-shield-halved text-blue-800 text-xl transition-all group-hover/service:text-white"></i>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold">Secure</h2>
                  <p className="text-slate-700 mt-2">
                    We strictly only deal with vendors that provide top notch
                    security.
                  </p>
                </div>
              </div>
              <div className="flex group/service">
                <div className="w-[30px] h-[30px] border rounded-full p-7 flex justify-center items-center mr-3 transition-all group-hover/service:bg-blue-800">
                  <i className="fa-solid fa-shield-halved text-blue-800 text-xl transition-all group-hover/service:text-white"></i>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold">Secure</h2>
                  <p className="text-slate-700 mt-2">
                    We strictly only deal with vendors that provide top notch
                    security.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </SlideIn>
      {/* categories */}
      <SlideIn direction="left">
        <section className="py-5 overflow-x-hidden">
          <div className="container">
            <p className="text-center text-blue-950 font-semibold text-xl">
              Categories
            </p>
            <h1 className="text-4xl font-bold text-center">
              Everything Your Home <span className="text-blue-800">Needs.</span>
            </h1>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 my-10">
              {catData?.data?.map((cat) => {
                return (
                  <>
                    <Link
                      key={cat.id}
                      to={`/serviceProviders/${cat.id}`}
                      className="flex flex-col justify-center items-center hover:scale-110 hover:bg-white hover:shadow-lg p-5"
                    >
                      <img src={cat.image} alt="" className="w-[100px]" />
                      <p className="mt-4 font-semibold">{cat.name}</p>
                    </Link>
                  </>
                );
              })}
            </div>
          </div>
        </section>
      </SlideIn>
      {/* Reviews */}
      <SlideIn direction="right">
        <HomeReviews />
      </SlideIn>
      {/* questions */}
      <SlideIn direction="left">
        <section>
          <div className="container">
            <p className="text-center text-blue-950 font-semibold text-xl">
              FAQS
            </p>
            <h1 className="text-4xl font-bold text-center pb-5">
              You have <span className="text-blue-800">Questions?</span>
            </h1>
            <div id="accordion-collapse" data-accordion="collapse">
              <div className="my-5">
                <h2 id="accordion-collapse-heading-1">
                  <button
                    type="button"
                    className="flex bg-slate-200 items-center justify-between w-full p-5 font-medium rtl:text-right border border-b-0 border-gray-200 rounded-t-xl  dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
                    data-accordion-target="#accordion-collapse-body-1"
                    aria-expanded="true"
                    aria-controls="accordion-collapse-body-1"
                  >
                    <span className="text-black">What is Flowbite?</span>
                    <svg
                      data-accordion-icon
                      className="w-3 h-3 rotate-180 shrink-0"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5 5 1 1 5"
                      />
                    </svg>
                  </button>
                </h2>
                <div
                  id="accordion-collapse-body-1"
                  className="hidden"
                  aria-labelledby="accordion-collapse-heading-1"
                >
                  <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                      Flowbite is an open-source library of interactive
                      components built on top of Tailwind CSS including buttons,
                      dropdowns, modals, navbars, and more.
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      Check out this guide to learn how to{" "}
                      <a
                        href="/docs/getting-started/introduction/"
                        className="text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        get started
                      </a>{" "}
                      and start developing websites even faster with components
                      on top of Tailwind CSS.
                    </p>
                  </div>
                </div>
              </div>
              <div className="my-5">
                <h2 id="accordion-collapse-heading-2">
                  <button
                    type="button"
                    className="flex bg-slate-200 items-center justify-between w-full p-5 font-medium rtl:text-right border border-b-0 border-gray-200 rounded-t-xl  dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
                    data-accordion-target="#accordion-collapse-body-2"
                    aria-expanded="true"
                    aria-controls="accordion-collapse-body-2"
                  >
                    <span className="text-black">What is Flowbite?</span>
                    <svg
                      data-accordion-icon
                      className="w-3 h-3 rotate-180 shrink-0"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5 5 1 1 5"
                      />
                    </svg>
                  </button>
                </h2>
                <div
                  id="accordion-collapse-body-2"
                  className="hidden"
                  aria-labelledby="accordion-collapse-heading-2"
                >
                  <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                      Flowbite is an open-source library of interactive
                      components built on top of Tailwind CSS including buttons,
                      dropdowns, modals, navbars, and more.
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      Check out this guide to learn how to{" "}
                      <a
                        href="/docs/getting-started/introduction/"
                        className="text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        get started
                      </a>{" "}
                      and start developing websites even faster with components
                      on top of Tailwind CSS.
                    </p>
                  </div>
                </div>
              </div>
              <div className="my-5">
                <h2 id="accordion-collapse-heading-3">
                  <button
                    type="button"
                    className="flex bg-slate-200 items-center justify-between w-full p-5 font-medium rtl:text-right border border-b-0 border-gray-200 rounded-t-xl  dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
                    data-accordion-target="#accordion-collapse-body-3"
                    aria-expanded="true"
                    aria-controls="accordion-collapse-body-3"
                  >
                    <span className="text-black">What is Flowbite?</span>
                    <svg
                      data-accordion-icon
                      className="w-3 h-3 rotate-180 shrink-0"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5 5 1 1 5"
                      />
                    </svg>
                  </button>
                </h2>
                <div
                  id="accordion-collapse-body-3"
                  className="hidden"
                  aria-labelledby="accordion-collapse-heading-3"
                >
                  <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                      Flowbite is an open-source library of interactive
                      components built on top of Tailwind CSS including buttons,
                      dropdowns, modals, navbars, and more.
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      Check out this guide to learn how to{" "}
                      <a
                        href="/docs/getting-started/introduction/"
                        className="text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        get started
                      </a>{" "}
                      and start developing websites even faster with components
                      on top of Tailwind CSS.
                    </p>
                  </div>
                </div>
              </div>
              <div className="my-5">
                <h2 id="accordion-collapse-heading-4">
                  <button
                    type="button"
                    className="flex bg-slate-200 items-center justify-between w-full p-5 font-medium rtl:text-right border border-b-0 border-gray-200 rounded-t-xl  dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
                    data-accordion-target="#accordion-collapse-body-4"
                    aria-expanded="true"
                    aria-controls="accordion-collapse-body-4"
                  >
                    <span className="text-black">What is Flowbite?</span>
                    <svg
                      data-accordion-icon
                      className="w-3 h-3 rotate-180 shrink-0"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5 5 1 1 5"
                      />
                    </svg>
                  </button>
                </h2>
                <div
                  id="accordion-collapse-body-4"
                  className="hidden"
                  aria-labelledby="accordion-collapse-heading-4"
                >
                  <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                      Flowbite is an open-source library of interactive
                      components built on top of Tailwind CSS including buttons,
                      dropdowns, modals, navbars, and more.
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      Check out this guide to learn how to{" "}
                      <a
                        href="/docs/getting-started/introduction/"
                        className="text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        get started
                      </a>{" "}
                      and start developing websites even faster with components
                      on top of Tailwind CSS.
                    </p>
                  </div>
                </div>
              </div>
              <div className="my-5">
                <h2 id="accordion-collapse-heading-5">
                  <button
                    type="button"
                    className="flex bg-slate-200 items-center justify-between w-full p-5 font-medium rtl:text-right border border-b-0 border-gray-200 rounded-t-xl  dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
                    data-accordion-target="#accordion-collapse-body-5"
                    aria-expanded="true"
                    aria-controls="accordion-collapse-body-5"
                  >
                    <span className="text-black">What is Flowbite?</span>
                    <svg
                      data-accordion-icon
                      className="w-3 h-3 rotate-180 shrink-0"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5 5 1 1 5"
                      />
                    </svg>
                  </button>
                </h2>
                <div
                  id="accordion-collapse-body-5"
                  className="hidden"
                  aria-labelledby="accordion-collapse-heading-5"
                >
                  <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                      Flowbite is an open-source library of interactive
                      components built on top of Tailwind CSS including buttons,
                      dropdowns, modals, navbars, and more.
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      Check out this guide to learn how to{" "}
                      <a
                        href="/docs/getting-started/introduction/"
                        className="text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        get started
                      </a>{" "}
                      and start developing websites even faster with components
                      on top of Tailwind CSS.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </SlideIn>
    </>
  );
}
