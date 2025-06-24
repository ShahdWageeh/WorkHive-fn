import React, { useEffect, useState } from "react";
import useProviders from "../../Hooks/useProviders";
import ProviderDetails from "../providerDetails/ProviderDetails";
import { Link } from "react-router-dom";
import { Blocks } from "react-loader-spinner";
import pp from '../../assets/images/515.jpg'

export default function ServiceProviders() {
  const { getServiceProviders, catName, providers, loading } = useProviders();
  useEffect(() => {
    getServiceProviders();
  }, []);
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
        <section className="pt-28 pb-5">
          <div className="container">
            <h1 className="text-4xl text-center mb-5 font-semibold text-blue-800">
              {catName}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {providers?.map((pro) => {
                return (
                  <>
                    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                      <a href="#" className="">
                        <img
                          className="rounded-t-lg "
                          src={pp}
                          alt=""
                        />
                      </a>
                      <div className="p-5">
                        <a href="#">
                          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {pro.name}
                          </h5>
                        </a>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                          {pro.bio && pro.bio.split(' ').slice(0, 5).join(' ')}{pro.bio && pro.bio.split(' ').length > 5 ? '...' : ''}
                        </p>
                        <Link
                          to={`/providerProfile/${pro.category.id}/${pro.id}`}
                          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-800 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          View Services
                          <svg
                            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
