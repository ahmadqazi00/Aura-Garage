import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import {
  IoSearchOutline,
  IoLocationOutline,
  IoSpeedometerOutline,
  IoCalendarOutline,
  IoColorPaletteOutline,
} from "react-icons/io5";

const carShapes = {
  sedan: (
    <>
      <path d="M6 34v-6c0-3 2-5 5-6l16-3 14-9c2-1 4-2 6-2h26c4 0 7 2 10 5l7 6 14 2c4 1 6 3 6 6v7z" />
      <path d="M42 18l7-7h23c3 0 5 1 7 3l4 4z" fill="#f6f7f9" />
      <circle cx="28" cy="34" r="7" fill="#172033" />
      <circle cx="90" cy="34" r="7" fill="#172033" />
      <circle cx="28" cy="34" r="3" fill="#f6f7f9" />
      <circle cx="90" cy="34" r="3" fill="#f6f7f9" />
    </>
  ),
  suv: (
    <>
      <path d="M6 34v-8c0-3 2-5 5-5l8-1 6-8c1-2 3-3 5-3h54c3 0 5 1 6 3l6 8 8 1c4 0 6 2 6 5v8z" />
      <path d="M28 20l4-8h28v8z" fill="#f6f7f9" />
      <path d="M64 12h20l5 8H64z" fill="#f6f7f9" />
      <circle cx="28" cy="34" r="7" fill="#172033" />
      <circle cx="88" cy="34" r="7" fill="#172033" />
      <circle cx="28" cy="34" r="3" fill="#f6f7f9" />
      <circle cx="88" cy="34" r="3" fill="#f6f7f9" />
    </>
  ),
  sport: (
    <>
      <path d="M4 34v-4c0-3 2-4 5-5l22-4 20-8c3-1 6-2 9-2h14c4 0 7 2 10 4l8 5 14 3c4 1 6 2 6 5v6z" />
      <path d="M46 20l10-6h20l12 6z" fill="#f6f7f9" />
      <circle cx="26" cy="34" r="6.5" fill="#172033" />
      <circle cx="90" cy="34" r="6.5" fill="#172033" />
      <circle cx="26" cy="34" r="2.8" fill="#f6f7f9" />
      <circle cx="90" cy="34" r="2.8" fill="#f6f7f9" />
    </>
  ),
};

const drivingCars = [
  {
    type: "sedan",
    color: "text-blue-600",
    top: "8%",
    delay: 0,
    reverse: false,
  },
  { type: "suv", color: "text-slate-600", top: "62%", delay: 2, reverse: true },
  {
    type: "sport",
    color: "text-red-500",
    top: "30%",
    delay: 4,
    reverse: false,
  },
  {
    type: "sedan",
    color: "text-teal-600",
    top: "78%",
    delay: 6,
    reverse: true,
  },
];

const DrivingCars = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    <style>{`
  @keyframes driveRight {
    0% { transform: translateX(-200px); opacity: 0; }
    4% { opacity: 0.35; }
    21% { opacity: 0.35; }
    25% { transform: translateX(calc(100vw + 200px)); opacity: 0; }
    100% { transform: translateX(calc(100vw + 200px)); opacity: 0; }
  }
  @keyframes driveLeft {
    0% { transform: translateX(calc(100vw + 200px)); opacity: 0; }
    4% { opacity: 0.35; }
    21% { opacity: 0.35; }
    25% { transform: translateX(-200px); opacity: 0; }
    100% { transform: translateX(-200px); opacity: 0; }
  }
  @keyframes carBob {
    from { transform: translateY(0); }
    to { transform: translateY(-2px); }
  }
  .car-right { animation: driveRight 8s linear infinite both; }
  .car-left { animation: driveLeft 8s linear infinite both; }
  .car-bob { animation: carBob 0.25s ease-in-out infinite alternate; }
`}</style>
    {drivingCars.map((car, index) => (
      <div
        key={index}
        className={`absolute left-0 ${car.reverse ? "car-left" : "car-right"}`}
        style={{ top: car.top, animationDelay: `${car.delay}s` }}
      >
        <div className="car-bob">
          <svg
            viewBox="0 0 120 48"
            className={`w-28 md:w-36 ${car.color}`}
            fill="currentColor"
            style={{ transform: car.reverse ? "scaleX(-1)" : "none" }}
          >
            {carShapes[car.type]}
          </svg>
        </div>
      </div>
    ))}
  </div>
);

const Home = () => {
  const navigate = useNavigate();

  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const getCars = async (searchValue = "") => {
    try {
      setLoading(true);

      const response = await axios.get(
        `http://localhost:5274/cars?search=${encodeURIComponent(searchValue)}`,
      );

      setCars(response.data);
    } catch (error) {
      console.log("GET CARS ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      getCars(search);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  const handleSearch = (e) => {
    e.preventDefault();

    getCars(search);
  };

  return (
    <div className="min-h-screen bg-[#f6f7f9] text-[#172033]">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#101a2b] text-white flex items-center justify-center font-bold">
              AG
            </div>

            <div>
              <h1 className="text-lg font-bold">AuraGarage</h1>

              <p className="text-[10px] text-gray-400 tracking-wider">
                DRIVE YOUR DREAMS
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm">
            <Link to="/" className="text-blue-600 font-semibold">
              Home
            </Link>

            <Link
              to="/contact"
              className="text-gray-500 hover:text-blue-600 transition"
            >
              Contact Dealership
            </Link>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
            <IoLocationOutline className="text-lg" />
            Pakistan
          </div>
        </div>
      </nav>

      <div className="relative overflow-hidden">
        <DrivingCars />

        <section className="relative z-10 max-w-7xl mx-auto px-5 lg:px-8 pt-12 pb-8">
          <div className="text-center">
            <p className="text-blue-600 text-sm font-semibold mb-2">
              WELCOME TO AURAGARAGE
            </p>

            <h2 className="text-3xl md:text-4xl font-bold">
              Find Your Perfect Car
            </h2>

            <p className="text-gray-500 mt-3 text-sm max-w-xl mx-auto">
              Explore our collection of quality cars and find the one that fits
              your style and budget.
            </p>

            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mt-7">
              <div className="bg-white border border-gray-200 rounded-2xl p-2 flex items-center shadow-sm">
                <IoSearchOutline className="text-xl text-gray-400 ml-3" />

                <input
                  type="text"
                  placeholder="Search by car name or model..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 px-3 py-3 outline-none text-sm"
                />

                <button
                  type="submit"
                  className="bg-[#101a2b] text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-blue-600 transition"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>

      <section id="cars" className="max-w-7xl mx-auto px-5 lg:px-8 pb-14">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-xl font-bold">Available Cars</h3>

            <p className="text-sm text-gray-400 mt-1">
              {cars.length} cars available
            </p>
          </div>
        </div>

        {loading && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-sm">Loading cars...</p>
          </div>
        )}

        {!loading && cars.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {cars.map((car) => (
              <div
                key={car._id}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={`http://localhost:5274${car.image || car.images?.[0]}`}
                    alt={car.name}
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />

                  <span className="absolute top-3 left-3 bg-white/95 px-3 py-1 rounded-full text-[11px] font-semibold">
                    Available
                  </span>

                  {car.images?.length > 1 && (
                    <span className="absolute bottom-3 right-3 bg-black/60 text-white px-2 py-1 rounded-full text-[10px]">
                      {car.images.length} photos
                    </span>
                  )}
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-base">{car.name}</h4>

                      <p className="text-xs text-gray-400 mt-1">{car.model}</p>
                    </div>

                    <p className="font-bold text-blue-600 text-sm whitespace-nowrap">
                      Rs. {Number(car.price).toLocaleString()}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <IoCalendarOutline className="text-blue-500" />

                      {car.year}
                    </div>

                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <IoSpeedometerOutline className="text-blue-500" />
                      {Number(car.mileage).toLocaleString()} km
                    </div>

                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <IoColorPaletteOutline className="text-blue-500" />

                      {car.color}
                    </div>
                  </div>

                  <button
                    onClick={() => navigate(`/information/${car._id}`)}
                    className="w-full mt-4 py-2.5 rounded-xl bg-[#101a2b] text-white text-xs font-semibold hover:bg-blue-600 transition"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && cars.length === 0 && (
          <div className="text-center py-16">
            <h3 className="font-semibold text-lg">No cars found</h3>

            <p className="text-sm text-gray-400 mt-1">
              Try searching for another car or model.
            </p>
          </div>
        )}
      </section>

      <footer className="bg-[#101a2b] text-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-bold">AuraGarage</h3>

            <p className="text-xs text-gray-400 mt-1">
              Quality cars. Better journeys.
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Project by: <span className="font-semibold">Ahmad Qazi</span>
            </p>
          </div>

          <p className="text-xs text-gray-500">
            © 2026 AuraGarage. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
