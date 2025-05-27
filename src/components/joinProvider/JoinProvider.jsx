import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useCategories from "../../Hooks/useCategories";

export default function JoinProvider() {
  const [step, setStep] = useState(1);
  const { catData, getCategories } = useCategories();
  const [profilePreview, setProfilePreview] = useState(null);
  const [frontIdPreview, setFrontIdPreview] = useState(null);
  const [backIdPreview, setBackIdPreview] = useState(null);

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    console.log(catData);
  }, [catData]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      age: "",
      photo: null,
      frontId: null,
      backId: null,
      region: "",
      category: "",
      workingDays: [],
      experience: "",
      terms: false,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Name must be at least 3 characters")
        .max(20, "Name must be 20 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      phone: Yup.string()
        .matches(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number")
        .required("Required"),
      age: Yup.number()
        .min(18, "Must be at least 18 years old")
        .max(70, "Must be 70 years or younger")
        .required("Required"),
      photo: Yup.mixed()
        .required("Required")
        .test("fileFormat", "Unsupported file format", (value) => {
          if (!value) return false;
          return ["image/jpeg", "image/jpg", "image/png"].includes(value.type);
        }),
      frontId: Yup.mixed()
        .required("Required")
        .test("fileFormat", "Unsupported file format", (value) => {
          if (!value) return false;
          return ["image/jpeg", "image/jpg", "image/png"].includes(value.type);
        }),
      backId: Yup.mixed()
        .required("Required")
        .test("fileFormat", "Unsupported file format", (value) => {
          if (!value) return false;
          return ["image/jpeg", "image/jpg", "image/png"].includes(value.type);
        }),
      region: Yup.string().required("Required"),
      category: Yup.string().required("Required"),
      workingDays: Yup.array()
        .min(1, "Select at least one working day")
        .required("Required"),
      experience: Yup.number()
        .min(1, "Must have at least 1 year of experience")
        .required("Required"),
      terms: Yup.boolean().oneOf(
        [true],
        "You must accept the terms and conditions"
      ),
    }),
    onSubmit: (values) => {
      console.log("Form Values:", values);
    },
  });

  const handleImagePreview = (e, setPreview) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const steps = [
    { number: 1, title: "Personal Info" },
    { number: 2, title: "Documents" },
    { number: 3, title: "Work Details" },
    { number: 4, title: "Final Step" },
  ];

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

    return (
    <section className="pt-32 pb-12 px-4 min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-blue-800 text-center mb-2">
          Join as Service Provider
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Join our platform and start providing your services to customers
        </p>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {steps.map((s, index) => (
              <div key={s.number} className="flex-1 relative">
                <div
                  className={`flex flex-col items-center ${
                    index !== steps.length - 1
                      ? 'after:content-[""] after:w-full after:h-1 after:border-b after:border-gray-300 after:border-4 after:inline-block'
                      : ""
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step >= s.number
                        ? "bg-blue-800 text-white"
                        : "bg-gray-300"
                    } mb-2`}
                  >
                    {step > s.number ? (
                      <i className="fas fa-check"></i>
                    ) : (
                      s.number
                    )}
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      step >= s.number ? "text-blue-800" : "text-gray-500"
                    }`}
                  >
                    {s.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <form
          onSubmit={formik.handleSubmit}
          className="bg-white shadow-xl rounded-2xl p-8 transition-all duration-300"
        >
          {/* Step 1: Personal Information */}
          <div
            className={`space-y-6 transition-opacity duration-300 ${
              step === 1 ? "block opacity-100" : "hidden opacity-0"
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Input */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name الاسم الكامل
                </label>
                <div className="relative">
                  <i className="fas fa-user absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="text"
                    id="name"
                    {...formik.getFieldProps("name")}
                    className="pl-10 w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Name"
                  />
                </div>
                {formik.touched.name && formik.errors.name && (
                  <div className="text-red-600 text-sm mt-1">
                    {formik.errors.name}
                  </div>
                )}
              </div>

              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address البريد الإلكتروني
                </label>
                <div className="relative">
                  <i className="fas fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="email"
                    id="email"
                    {...formik.getFieldProps("email")}
                    className="pl-10 w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="example@gmail.com"
                  />
                </div>
                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-600 text-sm mt-1">
                    {formik.errors.email}
                  </div>
                )}
              </div>

              {/* Phone Input */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number رقم الهاتف
                </label>
                <div className="relative">
                  <i className="fas fa-phone absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="tel"
                    id="phone"
                    {...formik.getFieldProps("phone")}
                    className="pl-10 w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="01xxxxxxxxx"
                  />
                </div>
                {formik.touched.phone && formik.errors.phone && (
                  <div className="text-red-600 text-sm mt-1">
                    {formik.errors.phone}
                  </div>
                )}
              </div>

              {/* Age Input */}
              <div>
                <label
                  htmlFor="age"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Age السن
                </label>
                <div className="relative">
                  <i className="fas fa-birthday-cake absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="number"
                    id="age"
                    {...formik.getFieldProps("age")}
                    className="pl-10 w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="25"
                  />
                </div>
                {formik.touched.age && formik.errors.age && (
                  <div className="text-red-600 text-sm mt-1">
                    {formik.errors.age}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Step 2: Documents */}
          <div
            className={`space-y-6 transition-opacity duration-300 ${
              step === 2 ? "block opacity-100" : "hidden opacity-0"
            }`}
          >
            {/* Profile Photo Upload */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Profile Photo صورة شخصية
              </label>
              <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-500 transition-colors">
                <div className="space-y-1 text-center">
                  {profilePreview ? (
                    <img
                      src={profilePreview}
                      alt="Profile preview"
                      className="mx-auto h-32 w-32 object-cover rounded-full"
                    />
                  ) : (
                    <i className="fas fa-user-circle text-6xl text-gray-400"></i>
                  )}
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="photo"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                    >
                      <span>Upload a photo</span>
                      <input
                        id="photo"
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        className="sr-only"
                        onChange={(e) => {
                          formik.setFieldValue(
                            "photo",
                            e.currentTarget.files[0]
                          );
                          handleImagePreview(e, setProfilePreview);
                        }}
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, JPEG up to 10MB
                  </p>
                </div>
              </div>
              {formik.touched.photo && formik.errors.photo && (
                <div className="text-red-600 text-sm">
                  {formik.errors.photo}
                </div>
              )}
            </div>

            {/* ID Photos Upload */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Front ID */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  ID Front Side صورة البطاقة الشخصية(الامامية)
                </label>
                <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-500 transition-colors">
                  <div className="space-y-1 text-center">
                    {frontIdPreview ? (
                      <img
                        src={frontIdPreview}
                        alt="ID front preview"
                        className="mx-auto h-32 w-48 object-cover rounded-lg"
                      />
                    ) : (
                      <i className="fas fa-id-card text-6xl text-gray-400"></i>
                    )}
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="frontId"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500"
                      >
                        <span>Upload front side</span>
                        <input
                          id="frontId"
                          type="file"
                          accept=".jpg,.jpeg,.png"
                          className="sr-only"
                          onChange={(e) => {
                            formik.setFieldValue(
                              "frontId",
                              e.currentTarget.files[0]
                            );
                            handleImagePreview(e, setFrontIdPreview);
                          }}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                {formik.touched.frontId && formik.errors.frontId && (
                  <div className="text-red-600 text-sm">
                    {formik.errors.frontId}
                  </div>
                )}
              </div>

              {/* Back ID */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  ID Back Side صورة البطاقة الشخصية(الخلفية)
                </label>
                <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-500 transition-colors">
                  <div className="space-y-1 text-center">
                    {backIdPreview ? (
                      <img
                        src={backIdPreview}
                        alt="ID back preview"
                        className="mx-auto h-32 w-48 object-cover rounded-lg"
                      />
                    ) : (
                      <i className="fas fa-id-card text-6xl text-gray-400"></i>
                    )}
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="backId"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500"
                      >
                        <span>Upload back side</span>
                        <input
                          id="backId"
                          type="file"
                          accept=".jpg,.jpeg,.png"
                          className="sr-only"
                          onChange={(e) => {
                            formik.setFieldValue(
                              "backId",
                              e.currentTarget.files[0]
                            );
                            handleImagePreview(e, setBackIdPreview);
                          }}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                {formik.touched.backId && formik.errors.backId && (
                  <div className="text-red-600 text-sm">
                    {formik.errors.backId}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Step 3: Work Details */}
          <div
            className={`space-y-6 transition-opacity duration-300 ${
              step === 3 ? "block opacity-100" : "hidden opacity-0"
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Region Select */}
              <div>
                <label
                  htmlFor="region"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Region of Work مناطق العمل
                </label>
                <div className="relative">
                  <i className="fas fa-map-marker-alt absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  <select
                    id="region"
                    {...formik.getFieldProps("region")}
                    className="pl-10 w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="" disabled selected hidden>
                      Select a region
                    </option>
                    <option value="NC">New Cairo</option>
                    <option value="zayed">El-Sheikh Zayed</option>
                    <option value="sh">El-Sherouk</option>
                    <option value="fu">Future City</option>
                    <option value="rehab">El-Rehab</option>
                    <option value="badr">Badr City</option>
                    <option value="obour">El-Obour</option>
                  </select>
                </div>
                {formik.touched.region && formik.errors.region && (
                  <div className="text-red-600 text-sm mt-1">
                    {formik.errors.region}
                  </div>
                )}
              </div>

              {/* Category Select */}
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Working Category المهنة
                </label>
                <div className="relative">
                  <i className="fas fa-tools absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  <select
                    id="category"
                    {...formik.getFieldProps("category")}
                    className="pl-10 w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="" disabled selected hidden>
                      Select a category
                    </option>
                    {catData?.data?.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                {formik.touched.category && formik.errors.category && (
                  <div className="text-red-600 text-sm mt-1">
                    {formik.errors.category}
                  </div>
                )}
              </div>

              {/* Experience Input */}
              <div>
                <label
                  htmlFor="experience"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Years of Experience سنوات الخبرة
                </label>
                <div className="relative">
                  <i className="fas fa-briefcase absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="number"
                    id="experience"
                    min="1"
                    {...formik.getFieldProps("experience")}
                    className="pl-10 w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="5"
                  />
                </div>
                {formik.touched.experience && formik.errors.experience && (
                  <div className="text-red-600 text-sm mt-1">
                    {formik.errors.experience}
                  </div>
                )}
              </div>
            </div>

            {/* Working Days */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Working Days الأيام المتاحة للعمل
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  "Sunday",
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ].map((day) => (
                  <div
                    key={day}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      formik.values.workingDays.includes(day)
                        ? "bg-blue-50 border-blue-500 text-blue-700"
                        : "border-gray-300 hover:border-blue-400"
                    }`}
                    onClick={() => {
                      const days = [...formik.values.workingDays];
                      const index = days.indexOf(day);
                      if (index > -1) {
                        days.splice(index, 1);
                      } else {
                        days.push(day);
                      }
                      formik.setFieldValue("workingDays", days);
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{day}</span>
                      {formik.values.workingDays.includes(day) && (
                        <i className="fas fa-check text-blue-500"></i>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {formik.touched.workingDays && formik.errors.workingDays && (
                <div className="text-red-600 text-sm mt-2">
                  {formik.errors.workingDays}
                </div>
              )}
            </div>
          </div>

          {/* Step 4: Terms and Submit */}
          <div
            className={`space-y-6 transition-opacity duration-300 ${
              step === 4 ? "block opacity-100" : "hidden opacity-0"
            }`}
          >
            {/* Terms and Conditions */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="flex items-start space-x-3">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    id="terms"
                    {...formik.getFieldProps("terms")}
                    checked={formik.values.terms}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="terms" className="font-medium text-gray-700">
                    Terms and Conditions الشروط والأحكام
                  </label>
                  <p className="text-sm text-gray-500 mt-1">
                    By selecting this, you agree to our{" "}
                    <a href="#" className="text-blue-600 hover:text-blue-500">
                      privacy policy
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-blue-600 hover:text-blue-500">
                      terms of service
                    </a>
                    .
                  </p>
                </div>
              </div>
              {formik.touched.terms && formik.errors.terms && (
                <div className="text-red-600 text-sm mt-2">
                  {formik.errors.terms}
                </div>
              )}
            </div>

            {/* Summary */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-blue-800 mb-4">
                Application Summary ملخص التقديم
              </h3>
              <div className="space-y-2">
                <p className="text-sm text-blue-700">
                  <span className="font-medium">Name:</span>{" "}
                  {formik.values.name}
                </p>
                <p className="text-sm text-blue-700">
                  <span className="font-medium">Category:</span>{" "}
                  {formik.values.category}
                </p>
                <p className="text-sm text-blue-700">
                  <span className="font-medium">Region:</span>{" "}
                  {formik.values.region}
                </p>
                <p className="text-sm text-blue-700">
                  <span className="font-medium">Working Days:</span>{" "}
                  {formik.values.workingDays.join(", ")}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <i className="fas fa-arrow-left mr-2"></i>
                Previous
              </button>
            )}
            {step < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="ml-auto flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Next
                <i className="fas fa-arrow-right ml-2"></i>
              </button>
            ) : (
              <button
                type="submit"
                className="ml-auto flex items-center px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <i className="fas fa-paper-plane mr-2"></i>
                Submit Application
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
