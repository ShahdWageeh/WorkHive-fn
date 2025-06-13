import React, { useContext, useEffect } from "react";
import avatar from "../../assets/images/avatar.svg";
import logo from "../../assets/images/logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "./../context/AuthContext";
import { initializeFlowbite } from "../../utils/flowbiteInit";

export default function Navbar() {
  let { token, setToken, decoded } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    initializeFlowbite();
  }, []);

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  }

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900 fixed top-0 left-0 right-0 shadow-md z-[999]">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          {/* logo */}
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={logo} className="w-[180px]" alt="Flowbite Logo" />
          </Link>
          {/* right side */}
          <div className="flex gap-5 items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {token ? (
              <>
                <i className="fa-solid fa-bell text-2xl text-blue-800 cursor-pointer" />
                <button
                  type="button"
                  className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  id="user-menu-button"
                  aria-expanded="false"
                  data-dropdown-toggle="user-dropdown"
                  data-dropdown-placement="bottom"
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-8 h-8 rounded-full"
                    src={avatar}
                    alt="user photo"
                  />
                </button>
                {/* Dropdown menu */}
                <div
                  className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600 absolute right-0 mt-2 w-48"
                  id="user-dropdown"
                >
                  <div className="px-4 py-3">
                    <span className="block text-sm text-gray-900 dark:text-white">
                      {decoded?.fullname}
                    </span>
                    <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                      {decoded?.email}
                    </span>
                  </div>
                  <ul className="py-2" aria-labelledby="user-menu-button">
                    <li>
                      <NavLink
                        to="userProfile"
                        className={({ isActive }) =>
                          `block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white ${
                            isActive ? "bg-gray-100 text-blue-700" : ""
                          }`
                        }
                        onClick={() => {
                          const dropdown = document.getElementById('user-dropdown');
                          if (dropdown) {
                            dropdown.classList.add('hidden');
                          }
                        }}
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="updateData"
                        className={({ isActive }) =>
                          `block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white ${
                            isActive ? "bg-gray-100 text-blue-700" : ""
                          }`
                        }
                        onClick={() => {
                          const dropdown = document.getElementById('user-dropdown');
                          if (dropdown) {
                            dropdown.classList.add('hidden');
                          }
                        }}
                      >
                        Update your Data
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="updatePassword"
                        className={({ isActive }) =>
                          `block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white ${
                            isActive ? "bg-gray-100 text-blue-700" : ""
                          }`
                        }
                        onClick={() => {
                          const dropdown = document.getElementById('user-dropdown');
                          if (dropdown) {
                            dropdown.classList.add('hidden');
                          }
                        }}
                      >
                        Update your Password
                      </NavLink>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          logout();
                          const dropdown = document.getElementById('user-dropdown');
                          if (dropdown) {
                            dropdown.classList.add('hidden');
                          }
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Sign out
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <NavLink
                  to="login"
                  className={({ isActive }) =>
                    ` hidden md:block py-2 px-3 font-semibold rounded-sm md:bg-transparent hover:text-blue-700 hover:underline md:dark:text-blue-500 ${
                      isActive ? "text-blue-700" : "text-black"
                    }`
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="register"
                  className={({ isActive }) =>
                    `text-white ${
                      isActive ? "bg-blue-700" : "bg-blue-800"
                    } hover:bg-blue-700 hidden md:block focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`
                  }
                >
                  Sign Up
                </NavLink>
              </>
            )}
            <button
              data-collapse-toggle="navbar-user"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-user"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          {/* navbar links */}
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-user"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <NavLink
                  to=""
                  className={({ isActive }) =>
                    `block py-2 px-3 rounded-sm md:p-0 ${
                      isActive
                        ? "text-blue-700 md:text-blue-700"
                        : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500"
                    }`
                  }
                  end
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="about"
                  className={({ isActive }) =>
                    `block py-2 px-3 rounded-sm md:p-0 ${
                      isActive
                        ? "text-blue-700 md:text-blue-700"
                        : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500"
                    }`
                  }
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="categories"
                  className={({ isActive }) =>
                    `block py-2 px-3 rounded-sm md:p-0 ${
                      isActive
                        ? "text-blue-700 md:text-blue-700"
                        : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500"
                    }`
                  }
                >
                  Categories
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="contactUs"
                  className={({ isActive }) =>
                    `block py-2 px-3 rounded-sm md:p-0 ${
                      isActive
                        ? "text-blue-700 md:text-blue-700"
                        : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500"
                    }`
                  }
                >
                  Contact
                </NavLink>
              </li>
              <li>
                {token ? null : (
                  <>
                    <NavLink
                      to="login"
                      className={({ isActive }) =>
                        ` block md:hidden py-2 px-3 font-semibold rounded-sm md:bg-transparent hover:text-blue-700 hover:underline md:dark:text-blue-500 ${
                          isActive ? "text-blue-700" : "text-black"
                        }`
                      }
                    >
                      Login
                    </NavLink>
                    <NavLink
                      to="register"
                      className={({ isActive }) =>
                        `text-white ${
                          isActive ? "bg-blue-700" : "bg-blue-800"
                        } hover:bg-blue-700 md:hidden focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`
                      }
                    >
                      Sign Up
                    </NavLink>
                  </>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
