import React, { useEffect, useState } from "react";
import reviewsImg from "../../assets/images/reviews.png";
import avatar from "../../assets/images/avatar.svg";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

export default function HomeReviews() {
  const [currentRev, setCurrentRev] = useState([]);
  async function getReviews() {
    try {
      const res = await axios.get(
        "https://work-hive-project.vercel.app/api/v1/reviews"
      );
      console.log(res.data);
      setCurrentRev(res.data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getReviews();
  }, []);
  return (
    <>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-12">
          {/* Illustration */}
          <div className="w-full lg:w-1/2">
            <img
              src={reviewsImg}
              alt="Client Connection"
              className="max-w-full h-auto"
            />
          </div>

          {/* Testimonial Content */}
          <div className="w-full lg:w-1/2">
            <p className="text-blue-950 font-semibold text-xl">
              Testimonials
            </p>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Our Clients <span className="text-blue-800">Love Us.</span>
            </h2>
            <p className="text-gray-600 mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad
              minim veniam.
            </p>
            <Swiper
              slidesPerView={1}
              loop={true}
              modules={[Pagination]}
              pagination={{ clickable: true, dynamicBullets: true }}
            >
              {currentRev?.data?.map((rev, index) => {
                return (
                  <SwiperSlide key={index} className="py-3">
                    <div className="text-yellow-400 text-xl mb-2">
                      {"★".repeat(rev.rating)}
                    </div>
                    <p className="text-gray-600 mb-6">{rev.comment}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4 mb-6">
                        <img
                          src={avatar}
                          alt="Charlotte Hale"
                          className="w-16 h-16 rounded-full"
                        />
                        <div>
                          <p className="font-bold text-gray-800">
                            {rev.customer.fullname}
                          </p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
}
