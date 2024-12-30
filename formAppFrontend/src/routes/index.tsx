import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { RegistrationFormData, registrationSchema } from "../schemas/registrationSchema.tsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

interface Country {
  name: CountryName;
}

interface CountryName {
  common: string;
}

function RouteComponent() {
  const [serverError, setServerError] = useState("");
  const [serverSuccess, setServerSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [countries, setCountries] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
  });

  useEffect(() => {
    (async function () {
      const response = await axios.get("https://restcountries.com/v3.1/all?fields=name");
      setCountries(response.data);
    })();
  }, []);

  const onSubmit = async (data: RegistrationFormData) => {
    setIsLoading(true);
    try {
      setServerError("");
      setServerSuccess("");
      const response = await axios.post("http://localhost:8080/register", data);

      setServerSuccess( response.data.message ||"Registration successful!");
    } catch (err: any) {
      if (err.response && err.response.data) {
        const errorMessage = err.response.data.message;
        setServerError(errorMessage);
      } else {
        setServerError(err.message || "An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-white to-gray-100">
        <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Registration Form
          </h2>

          {/* Server Success Message */}
          {serverSuccess && (
              <div className="bg-green-100 text-green-800 p-3 rounded-md mb-4">
                {serverSuccess}
              </div>
          )}

          {/* Server Error Message */}
          {serverError && (
              <div className="bg-red-100 text-red-800 p-3 rounded-md mb-4">
                {serverError}
              </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Full Name Field */}
            <div className="mb-4">
              <label htmlFor="fullname" className="block text-gray-600 mb-2">
                Full name
              </label>
              <input
                  type="text"
                  id="firstName"
                  {...register("fullName")}
                  className={`w-full px-4 py-2 border ${
                      errors.fullName ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 ${
                      errors.fullName ? "focus:ring-red-500" : "focus:ring-primary-light"
                  }`}
                  placeholder="Enter your full name"
              />
              {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
              )}
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600 mb-2">
                Email
              </label>
              <input
                  type="email"
                  id="email"
                  {...register("email")}
                  className={`w-full px-4 py-2 border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 ${
                      errors.email ? "focus:ring-red-500" : "focus:ring-primary-light"
                  }`}
                  placeholder="Enter your email"
              />
              {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-600 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                    type={"password"}
                    id="password"
                    {...register("password")}
                    className={`w-full px-4 py-2 border ${
                        errors.password ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-2 ${
                        errors.password ? "focus:ring-red-500" : "focus:ring-primary-light"
                    }`}
                    placeholder="Enter your password"
                />
              </div>
              {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="mb-4">
              <label htmlFor="confirm password" className="block text-gray-600 mb-2">
                Confirm password
              </label>
              <input
                  type="password"
                  id="confirm password"
                  {...register("confirmPassword")}
                  className={`w-full px-4 py-2 border ${
                      errors.confirmPassword ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 ${
                      errors.confirmPassword ? "focus:ring-red-500" : "focus:ring-primary-light"
                  }`}
                  placeholder="Confirm your password"
              />
              {errors.confirmPassword && (
                  <p className="text-red-400 text-sm mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Gender Radio Buttons */}
            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Gender</label>
              <div className="flex items-center">
                <label className="mr-4">
                  <input
                      type="radio"
                      value="MALE"
                      {...register("gender")}
                      className="mr-2"
                  />
                  Male
                </label>
                <label className="mr-4">
                  <input
                      type="radio"
                      value="FEMALE"
                      {...register("gender")}
                      className="mr-2"
                  />
                  Female
                </label>
                <label className="mr-4">
                  <input
                      type="radio"
                      value="OTHER"
                      {...register("gender")}
                      className="mr-2"
                  />
                  Other
                </label>
              </div>
              {errors.gender && (
                  <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
              )}
            </div>

            {/* Country Select Field */}
            <div className="mb-4">
              <label htmlFor="country" className="block text-gray-600 mb-2">
                Country
              </label>
              <select
                  id="country"
                  {...register("country")}
                  className={`w-full px-4 py-2 border ${
                      errors.country ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 ${
                      errors.country ? "focus:ring-red-500" : "focus:ring-primary-light"
                  }`}
              >
                <option value="">Select your country</option>
                {countries.map((country: Country) => (
                    <option key={country.name.common} value={country.name.common}>
                      {country.name.common}
                    </option>
                ))}
              </select>
              {errors.country && (
                  <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>
              )}
            </div>

            {/* Terms Checkbox */}
            <div className="mb-4">
              <label className="flex items-center">
                <input
                    type="checkbox"
                    {...register("termsAccepted")}
                    className="mr-2"
                />
                I accept the terms and conditions
              </label>
              {errors.termsAccepted && (
                  <p className="text-red-500 text-sm mt-1">{errors.termsAccepted.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="mb-6 mt-10">
              <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full bg-orange-500 text-white font-bold py-2 px-4 rounded-md transition duration-200 ${
                      isLoading
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-orange-600"
                  }`}
              >
                {isLoading ? (
                    <svg
                        className="animate-spin h-5 w-5 mx-auto"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                      <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                      ></circle>
                      <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 0116 0"
                      ></path>
                    </svg>
                ) : (
                    "Register"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
  );
}
