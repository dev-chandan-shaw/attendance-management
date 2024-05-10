import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getHeader } from "../API/config";
import { CircularProgress } from "@mui/material";

function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState('')
  const [error, setError] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
        setIsLoading(true)
      await axios.post(
        `http://localhost:8080/forgot-password/verifyOtp/${email}/${otp}`
      );
      navigate("/change-password");
    } catch (error) {
        setError(error.response.data)
      throw error;
    } finally {
        setIsLoading(false)
    }
  };

  useEffect (() => {
    const email = localStorage.getItem("email")
    setEmail(email);
  },[])
  return (
    <div className="h-dvh flex items-center justify-center p-5 backdrop-blur-md">
      <img
        className="absolute md:relative object-cover w-full md:h-auto md:w-1/2 h-full"
        src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
        alt=""
      />
      <section className="bg-gray-50 z-10 dark:bg-gray-950 w-[450px] rounded-xl overflow-hidden">
        <div className="w-full bg-white  overflow-hidden shadow  dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-start text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Verify OTP
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              
              <div >
                <label
                  htmlFor="email"
                  className="block text-start mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  OTP
                </label>
                <input
                  type="text"
                  name="otp"
                  id="otp"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
                <p className="text-red-600 h-[1px] my-4">{error}</p>
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-32 h-10 text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {isLoading ? <CircularProgress color="warning" size={20} /> : "Verify"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default VerifyOtp;
