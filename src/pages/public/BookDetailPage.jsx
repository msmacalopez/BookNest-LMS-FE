import React from "react";
import BookReviews from "../../components/BookReviews";
import { Link } from "react-router-dom";

export default function BookDetailPage() {
  return (
    <div className="p-10 pt-2">
      <h2 className="text-primary text-4xl text-center font-bold my-5 ">
        Book Details
      </h2>
      <div className="card card-side bg-base-100 shadow-sm  lg:gap-20 flex flex-col md:flex-row">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
            alt="Movie"
            className="max-h-150 md:max-h-none min-w-100 rounded-2xl"
          />
        </figure>
        <div className="card-body flex flex-col gap-5 max-w-200">
          <h2 className="card-title text-accent text-3xl font-bold">
            Hunter X
          </h2>
          <div className="flex gap-5">
            <p className="font-bold uppercase">Reviews:</p>
            <p>Stars</p>
          </div>
          <div className="flex gap-5">
            <p className="font-bold uppercase">Genre:</p>
            <p>Drama</p>
          </div>
          <div className="flex gap-5">
            <p className="font-bold uppercase">Description:</p>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde,
              ipsam? Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Enim quia aut, debitis odit aliquid similique voluptatem quidem
              natus odio qui.
            </p>
          </div>
          <div className="flex gap-5">
            <p className="font-bold uppercase">Publisher:</p>
            <p>Patagonia Editions</p>
          </div>
          <div className="flex gap-5">
            <p className="font-bold uppercase">Year:</p>
            <p>2014</p>
          </div>
          <div className="flex gap-5">
            <p className="font-bold uppercase">ISBN:</p>
            <p>2132183798124637473</p>
          </div>
          <div className="flex gap-5">
            <p className="font-bold uppercase">Language:</p>
            <p>English</p>
          </div>
          <div className="flex gap-5">
            <p className="font-bold uppercase">Country:</p>
            <p>UK</p>
          </div>
          <div className="flex gap-5">
            <p className="font-bold uppercase">Pages:</p>
            <p>140p</p>
          </div>
          <div className="flex gap-5">
            <p className="font-bold uppercase">Edition:</p>
            <div className="flex gap-5">
              <div className="badge badge-accent text-white">Kindle</div>
              <div className="badge badge-outline-accent">Paperback</div>
              <div className="badge badge-outline-accent">Hardcover</div>
              <div className="badge badge-outline-accent">Audio</div>
            </div>
          </div>
          <div className="card-actions justify-end mt-5">
            {/* If not available -> badge with Avilable Soon */}
            <div className="badge badge-error badge-lg min-h-10">
              Available Soon
            </div>
            {/* available and logged in*/}
            <button className="btn btn-primary">Borrow</button>
            {/* available and NO logged in*/}
            <Link to="/login" className="btn btn-primary">
              Log In to Borrow
            </Link>
          </div>
        </div>
      </div>
      <BookReviews />
    </div>
  );
}
