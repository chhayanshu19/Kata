import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import { useToast } from "../context/ToastContext";
import {
  getVehicle,
  createVehicle,
  updateVehicle,
} from "../services/vehicleService";
import Footer from "../components/Footer";

export default function VehicleForm() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const { id } = useParams();

  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    make: "",
    model: "",
    category: "",
    price: "",
    quantity: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (isEdit) {
      loadVehicle();
    }
  }, [id]);

  async function loadVehicle() {
    try {
      const data = await getVehicle(id);

      setFormData({
        make: data.make,
        model: data.model,
        category: data.category,
        price: data.price,
        quantity: data.quantity,
      });
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await updateVehicle(id, formData);

        showToast("Vehicle updated successfully!");
      } else {
        await createVehicle(formData);

        showToast("Vehicle added successfully!");
      }

      navigate("/admin");
    } catch (error) {
      console.error(error);
      showToast("Failed to save vehicle.", "error");
    }
  };

  return (
    <>
      <Navbar />

      <main className="max-w-2xl mx-auto px-6 py-10 bg-[#F7F5F0] min-h-screen">
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#B23A3A]">
          {isEdit ? "Update Record" : "New Record"}
        </span>
        <h1 className="text-4xl font-black uppercase tracking-tight text-[#14161A] mt-1 mb-8">
          {isEdit ? "Edit Vehicle" : "Add Vehicle"}
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-[#E4E0D6] rounded-md p-6 shadow-sm space-y-5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-[#7C8494] mb-1">
                Make
              </label>
              <input
                type="text"
                name="make"
                placeholder="e.g. Toyota"
                value={formData.make}
                onChange={handleChange}
                className="w-full border border-[#D8D5CC] rounded-sm p-3 focus:outline-none focus:ring-2 focus:ring-[#F2A93B] focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-[#7C8494] mb-1">
                Model
              </label>
              <input
                type="text"
                name="model"
                placeholder="e.g. Fortuner"
                value={formData.model}
                onChange={handleChange}
                className="w-full border border-[#D8D5CC] rounded-sm p-3 focus:outline-none focus:ring-2 focus:ring-[#F2A93B] focus:border-transparent transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-[#7C8494] mb-1">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-[#D8D5CC] rounded-sm p-3 focus:outline-none focus:ring-2 focus:ring-[#F2A93B] focus:border-transparent transition"
            >
              <option value="">Select Category</option>
              <option value="SUV">SUV</option>
              <option value="Sedan">Sedan</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Truck">Truck</option>
              <option value="Sports">Sports</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-[#7C8494] mb-1">
                Price (₹)
              </label>
              <input
                type="number"
                name="price"
                placeholder="0"
                value={formData.price}
                onChange={handleChange}
                className="w-full border border-[#D8D5CC] rounded-sm p-3 font-mono focus:outline-none focus:ring-2 focus:ring-[#F2A93B] focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-[#7C8494] mb-1">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                placeholder="0"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full border border-[#D8D5CC] rounded-sm p-3 font-mono focus:outline-none focus:ring-2 focus:ring-[#F2A93B] focus:border-transparent transition"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#C81E3A] text-white font-bold uppercase tracking-wide p-3 rounded-sm hover:bg-[#a8172f] transition-colors"
          >
            {isEdit ? "Update Vehicle" : "Add Vehicle"}
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
}
