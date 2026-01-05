import React from "react";

export default function Hero() {
  return (
    <div>
      <div
        className="hero h-[480px]"
        style={{
          backgroundImage:
            "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md flex flex-col items-center justify-center">
            <h1 className="mb-5 text-5xl font-bold md:whitespace-nowrap">
              Welcome to BookNest
            </h1>
            <p className="mb-5">
              Your modern library management system for seamless book borrowing
              and management.
            </p>
            <div>
              <button className="btn btn-primary me-2">Get Started</button>
              <button className="btn btn-outline-primary ms-2">
                Browse Books
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
