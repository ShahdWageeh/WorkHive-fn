import React, { useEffect, useState, useContext } from "react";
import { Blocks } from "react-loader-spinner";
import SlideIn from "../animation/SlideIn";
import useCategories from "../../Hooks/useCategories";
import { Link } from "react-router-dom";
import HomeReviews from "../homeReviews/HomeReviews";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import imgg from "../../assets/images/elecAcc.jpg";
import { AuthContext } from "../context/AuthContext";
export default function Home() {
  const { token } = useContext(AuthContext);
  const { getCategories, catData, loading } = useCategories();
  const [hovered, setHovered] = useState(null);
  const [activeAccordion, setActiveAccordion] = useState(null);

  useEffect(() => {
    getCategories();
  }, []);

  const faqData = [
    {
      id: 1,
      question: "How does WorkHive ensure service quality?",
      answer:
        "We carefully vet all service providers, verify their credentials, and monitor customer reviews. Our providers must maintain high ratings to stay on the platform, ensuring you receive quality service every time.",
    },
    {
      id: 2,
      question: "What happens if I'm not satisfied with a service?",
      answer:
        "Your satisfaction is our priority. If you're not happy with a service, you can contact our support team, and we'll work to resolve the issue. We also offer a review system to help maintain service quality.",
    },
    {
      id: 3,
      question: "How do I book a service?",
      answer:
        "Booking is simple! Just browse our categories, select a service provider, choose your preferred time slot, and confirm your booking. You can track your booking status and communicate with the provider through our platform.",
    },
    {
      id: 4,
      question: "Are the service providers verified?",
      answer:
        "Yes, all our service providers undergo a thorough verification process. We check their credentials, work history, and ensure they meet our quality standards before they can offer services on our platform.",
    },
    {
      id: 5,
      question: "How do payments work?",
      answer:
        "We offer secure payment options through our platform. You can pay using various methods, and payment is only released to the service provider after you confirm your satisfaction with the service.",
    },
  ];

  const toggleAccordion = (id) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  return (
    <>
      {loading ? (
        <section className="min-h-screen bg-blue-900 bg-opacity-80 flex justify-center items-center">
          <Blocks
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            visible={true}
          />
        </section>
      ) : (
        <>
          {/* landing */}
          <SlideIn direction="left">
            <section className="py-24 overflow-x-hidden ">
              <div className="container h-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 justify-items-center items-center gap-10 pt-5">
                  <div className="col-span-1">
                    <h1 className="text-4xl font-bold">
                      All Your Home Repairs In One Place Just
                      <br /> <span className="text-blue-800">
                        for you.
                      </span>{" "}
                    </h1>
                    <p id="home-description" className="my-5 text-slate-700 text-xl">
                      Welcome to our platform — your trusted destination for
                      booking services like repairs, and more. We connect you
                      with verified professionals, offer secure payments, and
                      ensure a smooth experience. Browse categories, check
                      ratings, and book easily. Quality, convenience, and
                      reliability — all in one place, just for you.
                    </p>
                    <Link
                      to={"about"}
                      type="button"
                      className="text-white bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                      Learn More
                    </Link>
                    {token ? null : (
                      <Link
                        to="/joinProvider"
                        type="button"
                        className="text-white bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                      >
                        Join as Provider
                      </Link>
                    )}
                  </div>
                  <div className="col-span-1">
                    {/* Original hover effect for screens >= 650px */}
                    <div className="hidden min-[650px]:flex w-full h-[450px] overflow-hidden gap-2">
                      {catData?.data?.map((item, index) => {
                        const isHovered = hovered === index;
                        const isAnyHovered = hovered !== null;
                        return (
                          <Link
                            key={index}
                            to={`/serviceProviders/${item.id}`}
                            className={`relative group transition-all rounded-md duration-500 ease-in-out overflow-hidden ${
                              isAnyHovered
                                ? isHovered
                                  ? "flex-[3]"
                                  : "flex-[0.5]"
                                : "flex-1"
                            }`}
                            onMouseEnter={() => setHovered(index)}
                            onMouseLeave={() => setHovered(null)}
                          >
                            <img
                              src={item.static_image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-blue-900 bg-opacity-60 flex items-center justify-center transition-all duration-500">
                              <h2
                                className={`text-white font-bold transition-all duration-500 ${
                                  isHovered
                                    ? "text-3xl rotate-0"
                                    : "-rotate-90 text-xl whitespace-nowrap"
                                }`}
                              >
                                {item.name}
                              </h2>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
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
                  We have Amazing{" "}
                  <span className="text-blue-800">Services.</span>
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-10">
                  <div className="flex group/service">
                    <div className="w-[30px] h-[30px] border rounded-full p-7 flex justify-center items-center mr-3 transition-all group-hover/service:bg-blue-800">
                      <i className="fa-solid fa-handshake text-blue-800 text-xl group-hover/service:text-white transition-all"></i>
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold">Reliable</h2>
                      <p className="text-slate-700 mt-2">
                        We connect you with trusted and verified service
                        providers.
                      </p>
                    </div>
                  </div>
                  <div className="flex group/service">
                    <div className="w-[30px] h-[30px] border rounded-full p-7 flex justify-center items-center mr-3 transition-all group-hover/service:bg-blue-800">
                      <i className="fa-solid fa-dollar-sign text-blue-800 text-xl transition-all group-hover/service:text-white"></i>
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold">Affordable</h2>
                      <p className="text-slate-700 mt-2">
                        Competitive prices without compromising quality.
                      </p>
                    </div>
                  </div>
                  <div className="flex group/service">
                    <div className="w-[30px] h-[30px] border rounded-full p-7 flex justify-center items-center mr-3 transition-all group-hover/service:bg-blue-800">
                      <i className="fa-solid fa-calendar-check text-blue-800 text-xl transition-all group-hover/service:text-white"></i>
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold">Convenient</h2>
                      <p className="text-slate-700 mt-2">
                        Easy booking process from anywhere, anytime.
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
                        Safe payment methods and data protection.
                      </p>
                    </div>
                  </div>
                  <div className="flex group/service">
                    <div className="w-[30px] h-[30px] border rounded-full p-7 flex justify-center items-center mr-3 transition-all group-hover/service:bg-blue-800">
                      <i className="fa-solid fa-headset text-blue-800 text-xl transition-all group-hover/service:text-white"></i>
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold">
                        Responsive Support
                      </h2>
                      <p className="text-slate-700 mt-2">
                        Quick help through our chatbot and contact channels.
                      </p>
                    </div>
                  </div>
                  <div className="flex group/service">
                    <div className="w-[30px] h-[30px] border rounded-full p-7 flex justify-center items-center mr-3 transition-all group-hover/service:bg-blue-800">
                      <i className="fa-solid fa-star text-blue-800 text-xl transition-all group-hover/service:text-white"></i>
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold">
                        Quality Assurance
                      </h2>
                      <p className="text-slate-700 mt-2">
                        Providers are rated and reviewed for your peace of mind.
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
                  Everything Your Home{" "}
                  <span className="text-blue-800">Needs.</span>
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
            <section className="py-16" id="faqs">
              <div className="container">
                <p className="text-center text-blue-950 font-semibold text-xl">
                  FAQS
                </p>
                <h1 className="text-4xl font-bold text-center pb-10">
                  You have <span className="text-blue-800">Questions?</span>
                </h1>
                <div className="w-full mx-auto">
                  {faqData.map((faq) => (
                    <div key={faq.id} className="mb-4">
                      <button
                        onClick={() => toggleAccordion(faq.id)}
                        className="flex items-center justify-between w-full p-5 font-medium text-left text-black bg-slate-100 rounded-t-xl hover:bg-slate-200 transition-colors"
                        aria-expanded={activeAccordion === faq.id}
                      >
                        <span className="text-lg">{faq.question}</span>
                        <svg
                          className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                            activeAccordion === faq.id ? "rotate-180" : ""
                          }`}
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 10 6"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 1l4 4 4-4"
                          />
                        </svg>
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-200 ${
                          activeAccordion === faq.id ? "max-h-96" : "max-h-0"
                        }`}
                      >
                        <div className="p-5 border border-t-0 border-gray-200 bg-white">
                          <p className="text-gray-600">{faq.answer}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </SlideIn>
        </>
      )}
    </>
  );
}
