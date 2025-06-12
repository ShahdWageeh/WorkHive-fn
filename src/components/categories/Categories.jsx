import React, { useEffect } from "react";
import useCategories from "../../Hooks/useCategories";
import { Link } from "react-router-dom";
import { Blocks } from "react-loader-spinner";

export default function Categories() {
  const { getCategories, catData, loading } = useCategories();
  useEffect(() => {
    getCategories();
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
        <>
          <section className="py-28">
            <div className="container">
              <p className="text-center text-blue-950 font-semibold text-xl">
                Categories
              </p>
              <h1 className="text-4xl font-bold text-center">
                Everything Your Home{" "}
                <span className="text-blue-800">Needs.</span>
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {catData?.data?.map((cat) => {
                  return (
                    <>
                      <div className="overflow-hidden group max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                        <div className="block overflow-hidden rounded-t-lg">
                          <img
                            className="transition-all group-hover:scale-125"
                            src={cat.static_image}
                            alt=""
                          />
                        </div>
                        <div className="p-5">
                          <div>
                            <h5 className="mb-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                              {cat.name}
                            </h5>
                          </div>
                          <Link
                            to={`/serviceProviders/${cat.id}`}
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-800 hover:bg-blue-700 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            Show Providers
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
        </>
      )}
    </>
  );
}
