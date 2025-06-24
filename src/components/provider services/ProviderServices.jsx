import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import serviceImg from "../../assets/images/services.jpg";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProviderServices({ ids }) {
  const [services, setServices] = useState();
  const {token} = useContext(AuthContext);
  async function getServices() {
    try {
      const res = await axios.get(
        `https://work-hive-project.vercel.app/api/v1/categories/${ids.idC}/service-providers/${ids.idP}/services`
      );
      console.log(res.data);
      setServices(res.data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getServices();
  }, []);
  return (
    <>
      <section className="py-5">
        <div className="container">
          <h2 className="text-3xl mt-10 mb-14 font-semibold text-blue-800 text-center">
            Services
          </h2>
          <div className="grid justify-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 ">
            {services?.data?.map((ser) => {
              return (
                <>
                  <div className="relative flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                    <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
                      <img src={serviceImg} alt="" />
                    </div>
                    <div className="p-6 pb-3">
                      <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                        {ser.name && ser.name.split(' ').slice(0, 3).join(' ')}{ser.name && ser.name.split(' ').length > 3 ? '...' : ''}
                      </h5>
                      <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                        {ser.description && ser.description.split(' ').slice(0, 5).join(' ')}{ser.description && ser.description.split(' ').length > 5 ? '...' : ''} 
                      </p>
                      <p className="block font-sans mt-3 text-xl font-semibold leading-relaxed text-inherit antialiased">
                        ${ser.price}
                      </p>
                    </div>
                    <div className="p-6 pt-0">
                      <Link
                        to={token ? `/checkout/${ser.id}/${ids.idP}/${ser.price}` : '/login'}
                        data-ripple-light="true"
                        type="button"
                        className="select-none rounded-lg bg-blue-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:bg-blue-700 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      >
                        Book the Service
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
  );
}
