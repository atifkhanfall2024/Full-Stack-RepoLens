"use client";

import { useState } from "react";
import axios from "axios";

export default function SignupPage() {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("/api/signup", form);
      alert(res.data.message);
    } catch (err: any) {
      alert(err.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async () => {
    try {
      setOtpLoading(true);
      await axios.post("/api/send-otp", { email: form.email });
      alert("OTP sent to email");
    } catch (err: any) {
      alert(err.response?.data?.message || "OTP Error");
    } finally {
      setOtpLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  from-blue-50 to-gray-100 px-4">

      {/* Card */}
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-100">

        {/* Heading */}
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Create Account 🚀
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Join and start building something amazing
        </p>

        {/* Form */}
        <form onSubmit={handleSignup} className="space-y-4">

          {/* Full Name */}
          <div>
            <label className="text-sm text-gray-600">Full Name</label>
            <input
              type="text"
              name="fullname"
              value={form.fullname}
              onChange={handleChange}
              required
              className="w-full mt-1 px-3 py-2 border text-black border-gray-200 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
          </div>

          {/* Email + OTP */}
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <div className="flex gap-2 mt-1">
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="flex-1 px-3 py-2 border text-black  border-gray-200 rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
              <button
                type="button"
                onClick={handleSendOtp}
                className="px-3 py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-black"
              >
                {otpLoading ? "Sending..." : "Send OTP"}
              </button>
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full mt-1 px-3 text-black  py-2 border border-gray-200 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter password"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm text-gray-600">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="w-full mt-1 px-3 py-2 text-black  border border-gray-200 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm password"
            />
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg 
            hover:bg-blue-700 transition duration-200 font-medium"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-gray-500 mt-6 text-center">
          Already have an account?{" "}
          <span className="text-blue-600 cursor-pointer hover:underline">
            Login
          </span>
        </p>
      </div>
    </div>
  );
}