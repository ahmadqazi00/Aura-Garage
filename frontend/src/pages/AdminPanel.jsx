import React, { useState } from "react";
import axios from "axios";
import {
  IoGridOutline,
  IoCarSportOutline,
  IoPeopleOutline,
  IoSettingsOutline,
  IoCloudUploadOutline,
  IoAddOutline,
  IoCloseOutline,
  IoSearchOutline,
} from "react-icons/io5";

const AdminPanel = () => {
  const [images, setImages] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    model: "",
    year: "",
    color: "",
    price: "",
    mileage: "",
    description: "",
  });

  // Input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Select images from device
  const handleImages = (e) => {
    const files = Array.from(e.target.files);

    const previews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    // Backend allows max 10 images
    setImages((prev) => [...prev, ...previews].slice(0, 10));

    // So the same image can be selected again
    e.target.value = "";
  };

  // Remove image
  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (images.length === 0) {
        alert("Please select at least one car image");
        return;
      }

      setSubmitting(true);

      const data = new FormData();

      // Field name must be "images" (same as backend upload.array("images"))
      images.forEach((image) => data.append("images", image.file));

      data.append("name", formData.name);
      data.append("model", formData.model);
      data.append("year", formData.year);
      data.append("color", formData.color);
      data.append("price", formData.price);
      data.append("mileage", formData.mileage);
      data.append("description", formData.description);

      const response = await axios.post(
        "http://localhost:5274/register-car",
        data,
      );

      console.log("CAR ADDED:", response.data);

      alert("Car added successfully!");

      // Clear form
      setFormData({
        name: "",
        model: "",
        year: "",
        color: "",
        price: "",
        mileage: "",
        description: "",
      });

      setImages([]);
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Something went wrong while adding the car",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#f5f7fa] flex text-[#172033]">
      {/* ================= SIDEBAR ================= */}
      <aside className="w-60 h-screen bg-[#101a2b] text-white flex-shrink-0 hidden md:flex flex-col">
        {/* Logo */}
        <div className="h-20 flex items-center px-6 border-b border-white/10">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center mr-3">
            <IoCarSportOutline className="text-2xl" />
          </div>

          <div>
            <h1 className="text-lg font-bold">AuraGarage</h1>
            <p className="text-[10px] text-gray-400">DRIVE YOUR DREAMS</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-3 mt-6 space-y-2">
          <SidebarItem icon={<IoGridOutline />} text="Dashboard" active />

          <SidebarItem icon={<IoCarSportOutline />} text="Cars" />

          <SidebarItem icon={<IoPeopleOutline />} text="Users" />

          <SidebarItem icon={<IoSettingsOutline />} text="Settings" />
        </nav>

        {/* Bottom */}
        <div className="mt-auto p-4">
          <div className="rounded-xl bg-white/5 border border-white/10 p-4">
            <p className="text-xs text-gray-400">Admin Panel</p>
            <p className="text-sm font-semibold mt-1">AuraGarage</p>
          </div>
        </div>
      </aside>

      {/* ================= MAIN ================= */}
      <main className="flex-1 min-h-screen overflow-y-auto overflow-x-hidden flex flex-col">
        {/* TOP BAR */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-5 lg:px-8 flex-shrink-0">
          <div>
            <h2 className="text-xl font-bold">Dashboard</h2>

            <p className="text-xs text-gray-400">Manage your garage</p>
          </div>

          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="hidden sm:flex items-center bg-[#f5f7fa] rounded-lg px-3 py-2">
              <IoSearchOutline className="text-gray-400" />

              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none text-sm ml-2 w-32"
              />
            </div>

            {/* Admin */}
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-[#101a2b] text-white flex items-center justify-center text-sm">
                A
              </div>

              <div className="hidden lg:block">
                <p className="text-sm font-semibold">Admin</p>

                <p className="text-[10px] text-gray-400">Administrator</p>
              </div>
            </div>
          </div>
        </header>

        {/* ================= CONTENT ================= */}
        <div className="flex-1 overflow-hidden p-4 lg:p-6">
          <div className="h-full grid grid-cols-1 xl:grid-cols-[1fr_420px] gap-5">
            {/* ================= LEFT DASHBOARD ================= */}
            <section className="min-w-0 flex flex-col gap-5">
              {/* Welcome */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold">Welcome back, Admin 👋</h1>

                  <p className="text-sm text-gray-400 mt-1">
                    Here's your AuraGarage overview.
                  </p>
                </div>

                <div className="hidden sm:flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  Garage Active
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <StatCard
                  title="Total Cars"
                  value="24"
                  icon={<IoCarSportOutline />}
                />

                <StatCard
                  title="Users"
                  value="128"
                  icon={<IoPeopleOutline />}
                />

                <StatCard
                  title="Available"
                  value="18"
                  icon={<IoGridOutline />}
                />
              </div>
            </section>

            {/* ================= ADD CAR ================= */}
            <section className="bg-white rounded-2xl border border-gray-200 shadow-sm h-full overflow-hidden flex flex-col">
              {/* Form Header */}
              <div className="px-6 py-5 border-b flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <IoCarSportOutline className="text-xl" />
                  </div>

                  <div>
                    <h2 className="text-lg font-bold">Add New Car</h2>

                    <p className="text-xs text-gray-400">
                      Enter vehicle details
                    </p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="flex-1 p-5 flex flex-col min-h-0"
              >
                {/* Images */}
                <div className="mb-4">
                  <label className="text-xs font-semibold block mb-2">
                    Car Images ({images.length}/10)
                  </label>

                  <label className="h-20 border-2 border-dashed border-blue-200 bg-blue-50/30 rounded-xl flex items-center justify-center gap-3 cursor-pointer hover:bg-blue-50 transition">
                    <IoCloudUploadOutline className="text-2xl text-blue-500" />

                    <div>
                      <p className="text-xs font-semibold text-blue-600">
                        Select images
                      </p>

                      <p className="text-[10px] text-gray-400">
                        JPG, PNG or WEBP (max 10)
                      </p>
                    </div>

                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImages}
                      className="hidden"
                    />
                  </label>

                  {/* Preview */}
                  {images.length > 0 && (
                    <div className="flex gap-2 mt-2 overflow-x-auto pb-1">
                      {images.map((image, index) => (
                        <div
                          key={index}
                          className="relative w-14 h-12 flex-shrink-0"
                        >
                          <img
                            src={image.url}
                            alt="car"
                            className="w-full h-full object-cover rounded-lg"
                          />

                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center"
                          >
                            <IoCloseOutline className="text-xs" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Name + Model */}
                <div className="grid grid-cols-2 gap-3">
                  <FormInput
                    label="Name"
                    name="name"
                    placeholder="Toyota"
                    value={formData.name}
                    onChange={handleChange}
                  />

                  <FormInput
                    label="Model"
                    name="model"
                    placeholder="Corolla"
                    value={formData.model}
                    onChange={handleChange}
                  />
                </div>

                {/* Year + Color */}
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <FormInput
                    label="Year"
                    name="year"
                    type="number"
                    placeholder="2022"
                    value={formData.year}
                    onChange={handleChange}
                  />

                  <FormInput
                    label="Color"
                    name="color"
                    placeholder="White"
                    value={formData.color}
                    onChange={handleChange}
                  />
                </div>

                {/* Price + Mileage */}
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <FormInput
                    label="Price"
                    name="price"
                    type="number"
                    placeholder="18500"
                    value={formData.price}
                    onChange={handleChange}
                  />

                  <FormInput
                    label="Mileage"
                    name="mileage"
                    type="number"
                    placeholder="25000"
                    value={formData.mileage}
                    onChange={handleChange}
                  />
                </div>

                {/* Description */}
                <div className="mt-3 flex-1 min-h-0">
                  <label className="text-xs font-semibold block mb-2">
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter car description..."
                    className="w-full h-full min-h-[90px] max-h-[130px] resize-none border border-gray-200 rounded-xl px-3 py-3 text-xs outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-4 h-11 flex-shrink-0 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition"
                >
                  <IoAddOutline className="text-xl" />
                  {submitting ? "Adding..." : "Add Car"}
                </button>
              </form>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

/* ================= COMPONENTS ================= */

const SidebarItem = ({ icon, text, active }) => {
  return (
    <button
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition ${
        active
          ? "bg-blue-600 text-white"
          : "text-gray-400 hover:bg-white/5 hover:text-white"
      }`}
    >
      <span className="text-lg">{icon}</span>
      {text}
    </button>
  );
};

const StatCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-3">
      <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xl flex-shrink-0">
        {icon}
      </div>

      <div>
        <p className="text-xs text-gray-400">{title}</p>

        <h3 className="text-xl font-bold">{value}</h3>
      </div>
    </div>
  );
};

const FormInput = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div>
      <label className="text-xs font-semibold block mb-2">{label}</label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="w-full h-10 border border-gray-200 rounded-lg px-3 text-xs outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </div>
  );
};

export default AdminPanel;
