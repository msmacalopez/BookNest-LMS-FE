import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { verifyEmailAction } from "../../features/auth/authAction";

export default function VerifyEmailPage() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const [message, setMessage] = useState("Verifying your email...");
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const run = async () => {
      const token = searchParams.get("token");

      if (!token) {
        setStatus("error");
        setMessage("Verification token is missing.");
        return;
      }

      const res = await dispatch(verifyEmailAction(token));

      if (res?.status === "success") {
        setStatus("success");
        setMessage(res?.message || "Email verified successfully.");
      } else {
        setStatus("error");
        setMessage(res?.message || "Verification failed.");
      }
    };

    run();
  }, [dispatch, searchParams]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Email Verification</h1>

        <p
          className={`mb-6 ${
            status === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>

        <Link
          to="/login"
          className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
}
