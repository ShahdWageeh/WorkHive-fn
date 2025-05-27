import React from "react";
import aboutImg from "../../assets/images/about.jpg";
import avatarImg from "../../assets/images/avatar.svg";

export default function ProviderDetails({ pro, rev }) {
  let rating = Math.round(pro?.data.rating);
  console.log(rev);

  return (
    <>
      <section className="pt-32 ">
        <div className="container">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            <div className="lg:col-span-1 lg:border-r-2 lg:border-r-slate-100 lg:pr-3">
              <h1 className="text-3xl mb-4 font-semibold text-blue-800">
                Service provider Details
              </h1>
              <div className="pro md:flex md:gap-5">
                <div className="proImg w-1/2">
                  <img
                    src={pro?.data.profile_picture}
                    className=" rounded-lg"
                    alt=""
                  />
                </div>
                <div className="proDetails">
                  <h3 className="text-2xl mt-2 font-semibold">
                    {pro?.data.name}
                  </h3>
                  <p className="text-xl my-2">{pro?.data.category.name}</p>
                  <p>{pro?.data.bio}</p>
                  <p className="my-2">
                    <span className="font-semibold">Availability:</span>{" "}
                    {pro?.data.city}
                  </p>
                  <p className="my-2">
                    <span className="font-semibold">Years of experience:</span>{" "}
                    {pro?.data.experience_years}
                  </p>
                  <p className="flex items-center gap-1">
                    {Array.from({ length: rating }, (_, index) => {
                      return (
                        <>
                          <svg
                            key={index}
                            className="w-4 h-4 text-yellow-300"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                        </>
                      );
                    })}

                    <span className="font-medium">{pro?.data.rating}</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-1 sm:mt-5 lg:mt-0 mt-10 lg:mt-0">
              <h1 className="text-3xl mb-4 font-semibold text-blue-800">
                Reviews
              </h1>
              {rev?.data.map((reviw) => {
                return (
                  <>
                    <div className="flex items-center gap-3 my-5">
                      <img
                        src={avatarImg}
                        className="w-14 h-14 rounded-full"
                        alt=""
                      />
                      <div>
                        <div className="flex gap-3">
                          <h3 className="font-semibold">{reviw.customer.fullname}</h3>
                          <p className="flex items-center">
                            <svg
                              className="w-4 h-4 text-yellow-300"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 22 20"
                            >
                              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                            <svg
                              className="w-4 h-4 text-yellow-300"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 22 20"
                            >
                              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                            <svg
                              className="w-4 h-4 text-yellow-300"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 22 20"
                            >
                              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                            <span className="ml-2">{reviw.rating}</span>
                          </p>
                        </div>
                        <p>
                          {reviw.comment}
                        </p>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
