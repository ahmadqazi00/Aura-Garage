import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

import {
  IoArrowBackOutline,
  IoLocationOutline,
  IoSpeedometerOutline,
  IoCalendarOutline,
  IoColorPaletteOutline,
  IoCarSportOutline,
} from "react-icons/io5";

const Information = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getCar = async () => {
      try {
        const response = await axios.get(`http://localhost:5274/cars/${id}`);
        setCar(response.data);
        setActiveIndex(0);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load car details");
      } finally {
        setLoading(false);
      }
    };

    getCar();
  }, [id]);

  const gallery = car ? (car.images?.length ? car.images : [car.image]) : [];

  const prevImage = () =>
    setActiveIndex((i) => (i === 0 ? gallery.length - 1 : i - 1));
  const nextImage = () =>
    setActiveIndex((i) => (i === gallery.length - 1 ? 0 : i + 1));

  const specs = car
    ? [
        { label: "Model", value: car.model, icon: IoCarSportOutline },
        { label: "Year", value: car.year, icon: IoCalendarOutline },
        {
          label: "Mileage",
          value: `${Number(car.mileage).toLocaleString()} km`,
          icon: IoSpeedometerOutline,
        },
        { label: "Color", value: car.color, icon: IoColorPaletteOutline },
      ]
    : [];
  const [activeIndex, setActiveIndex] = useState(0);
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
            <Link
              to="/"
              className="text-gray-500 hover:text-blue-600 transition"
            >
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

      <main className="max-w-7xl mx-auto px-5 lg:px-8 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition mb-6"
        >
          <IoArrowBackOutline className="text-lg" />
          Back to cars
        </button>

        {loading && (
          <div className="text-center py-24">
            <p className="text-gray-400 text-sm">Loading car details...</p>
          </div>
        )}

        {!loading && error && (
          <div className="text-center py-24">
            <h3 className="font-semibold text-lg">Something went wrong</h3>
            <p className="text-sm text-gray-400 mt-1">{error}</p>

            <Link
              to="/"
              className="inline-block mt-5 bg-[#101a2b] text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-blue-600 transition"
            >
              Go to Home
            </Link>
          </div>
        )}

        {!loading && car && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3">
              {/* <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <img
                  src={`http://localhost:5274${car.image}`}
                  alt={car.name}
                  className="w-full h-72 sm:h-96 lg:h-[460px] object-cover"
                />
              </div> */}
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <div className="relative">
                  <img
                    src={`http://localhost:5274${gallery[activeIndex]}`}
                    alt={car.name}
                    className="w-full h-72 sm:h-96 lg:h-[460px] object-cover"
                  />

                  {gallery.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white w-10 h-10 rounded-full flex items-center justify-center shadow"
                      >
                        <IoChevronBackOutline className="text-xl" />
                      </button>

                      <button
                        onClick={nextImage}
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white w-10 h-10 rounded-full flex items-center justify-center shadow"
                      >
                        <IoChevronForwardOutline className="text-xl" />
                      </button>

                      <span className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
                        {activeIndex + 1} / {gallery.length}
                      </span>
                    </>
                  )}
                </div>

                {gallery.length > 1 && (
                  <div className="flex gap-2 p-3 overflow-x-auto">
                    {gallery.map((img, index) => (
                      <img
                        key={index}
                        src={`http://localhost:5274${img}`}
                        alt={`${car.name} ${index + 1}`}
                        onClick={() => setActiveIndex(index)}
                        className={`w-20 h-16 object-cover rounded-lg cursor-pointer border-2 shrink-0 ${
                          index === activeIndex
                            ? "border-blue-600"
                            : "border-transparent opacity-70"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 p-6 mt-6">
                <h3 className="text-lg font-bold">Description</h3>

                <p className="text-sm text-gray-500 mt-3 leading-7 whitespace-pre-line">
                  {car.description}
                </p>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-gray-200 p-6 lg:sticky lg:top-28">
                <span className="inline-block bg-green-50 text-green-700 px-3 py-1 rounded-full text-[11px] font-semibold">
                  Available
                </span>

                <h2 className="text-3xl font-bold mt-3">{car.name}</h2>

                <p className="text-sm text-gray-400 mt-1">{car.model}</p>

                <p className="text-3xl font-bold text-blue-600 mt-5">
                  Rs. {Number(car.price).toLocaleString()}
                </p>

                <div className="grid grid-cols-2 gap-3 mt-6">
                  {specs.map((item) => (
                    <div
                      key={item.label}
                      className="bg-[#f6f7f9] rounded-xl p-4"
                    >
                      <item.icon className="text-blue-500 text-xl" />

                      <p className="text-xs text-gray-400 mt-2">{item.label}</p>

                      <p className="text-sm font-semibold mt-0.5 break-words">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => navigate("/contact")}
                  className="w-full mt-6 py-3 rounded-xl bg-[#101a2b] text-white text-sm font-semibold hover:bg-blue-600 transition"
                >
                  Contact Dealership
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-[#101a2b] text-white mt-10">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-bold">AuraGarage</h3>
            <p className="text-xs text-gray-400 mt-1">
              Quality cars. Better journeys.
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

export default Information;
