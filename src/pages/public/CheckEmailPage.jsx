import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resendVerificationEmailAction } from "../../features/auth/authAction";
import { toast } from "react-toastify";

export default function CheckEmailPage() {
  const location = useLocation();
  const dispatch = useDispatch();

  const emailFromState = location.state?.email || "";
  const [email, setEmail] = useState(emailFromState);

  const handleResend = async () => {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    const res = await dispatch(resendVerificationEmailAction(email));

    if (res?.status === "success") {
      toast.success(res?.message || "Verification email sent");
    } else {
      toast.error(res?.message || "Failed to resend verification email");
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Check your email
        </h1>

        <p className="text-gray-600 text-center mb-6">
          We sent you a verification link. Please check your inbox and click the
          link to activate your account.
        </p>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
        />

        <button
          onClick={handleResend}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
        >
          Resend verification email
        </button>
      </div>
    </div>
  );
}
