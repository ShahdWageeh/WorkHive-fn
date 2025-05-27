import { useState } from "react";
import "./App.css";
import Home from "./components/home/Home";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Login from './components/login/Login';
import Register from './components/Register/Register';
import AuthContextProvider from "./components/context/AuthContext";
import ForgetPass from "./components/forgetpass/ForgetPass";
import ResetCode from "./components/resetCode/ResetCode";
import ResetPass from "./components/resetPass/ResetPass";
import Categories from "./components/categories/Categories";
import ServiceProviders from "./components/serviceProviders/ServiceProviders";
import ContactUs from "./components/contactUs/ContactUs";
import { Toaster } from "react-hot-toast";
import ProviderProfile from "./components/providerProfile/ProviderProfile";
import Checkout from "./components/checkout/Checkout";
import UserProfile from "./components/userProfile/UserProfile";
import UpdateData from "./components/updateData/UpdateData";
import UpdatePass from "./components/updatePass/UpdatePass";
import JoinProvider from "./components/joinProvider/JoinProvider";
const routes = createBrowserRouter([
  {path:'', element: <Layout/>, children:[
    {path:'', element: <Home/>},
    {path:'login', element: <Login/>},
    {path:'register', element: <Register/>},
    {path:'forgetpassword', element: <ForgetPass/>},
    {path:'resetcode', element: <ResetCode/>},
    {path:'resetpassword', element: <ResetPass/>},
    {path:'categories', element: <Categories/>},
    {path:'contactUs', element: <ContactUs/>},
    {path:'userProfile', element: <UserProfile/>},
    {path:'updateData', element: <UpdateData/>},
    {path:'updatePassword', element: <UpdatePass/>},
    {path:'checkout/:idS/:idP/:price', element: <Checkout/>},
    {path:'serviceProviders/:idC', element: <ServiceProviders/>},
    {path:'providerProfile/:idC/:idP', element: <ProviderProfile/>},
    {path:'joinProvider', element: <JoinProvider/>},
  ]}
])
function App() {
  return (
    <>
    <AuthContextProvider>
      <RouterProvider router={routes}></RouterProvider>
      <Toaster/>
    </AuthContextProvider>
    </>
  );
}

export default App;
