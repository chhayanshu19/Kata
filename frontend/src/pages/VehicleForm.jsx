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
    if (!formData.make.trim()) {
      showToast("Make is required.", "warning");
      return;
    }

    if (!formData.model.trim()) {
      showToast("Model is required.", "warning");
      return;
    }

    if (!formData.category) {
      showToast("Please select a category.", "warning");
      return;
    }

    if (!formData.price) {
      showToast("Price is required.", "warning");
      return;
    }

    if (Number(formData.price) <= 0) {
      showToast("Price must be greater than zero.", "warning");
      return;
    }

    if (formData.quantity === "") {
      showToast("Quantity is required.", "warning");
      return;
    }

    if (Number(formData.quantity) < 0) {
      showToast("Quantity cannot be negative.", "warning");
      return;
    }

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
      const message =
        error.response?.data?.non_field_errors?.[0] ||
        error.response?.data?.detail ||
        error.response?.data ||
        "Failed to save vehicle.";

      showToast(message, "error");
    }
  };

  return (
    <>
      <Navbar />

      <main className="max-w-2xl mx-auto px-6 py-10 bg-[#F8F9FB] min-h-screen">
        <span className="text-xs font-medium uppercase tracking-wide text-[#667085]">
          {isEdit ? "Update Record" : "New Record"}
        </span>
        <h1 className="text-[28px] font-semibold tracking-tight text-[#101828] mt-1 mb-8">
          {isEdit ? "Edit Vehicle" : "Add Vehicle"}
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-[#E4E7EC] rounded-xl p-6 shadow-sm space-y-5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-medium text-[#667085] mb-1.5">
                Make
              </label>
              <input
                type="text"
                name="make"
                placeholder="e.g. Toyota"
                value={formData.make}
                onChange={handleChange}
                className="w-full border border-[#D0D5DD] rounded-lg p-2.5 text-[#101828] placeholder:text-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#B98D3E]/40 focus:border-[#B98D3E] transition"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#667085] mb-1.5">
                Model
              </label>
              <input
                type="text"
                name="model"
                placeholder="e.g. Fortuner"
                value={formData.model}
                onChange={handleChange}
                className="w-full border border-[#D0D5DD] rounded-lg p-2.5 text-[#101828] placeholder:text-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#B98D3E]/40 focus:border-[#B98D3E] transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#667085] mb-1.5">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-[#D0D5DD] rounded-lg p-2.5 text-[#101828] focus:outline-none focus:ring-2 focus:ring-[#B98D3E]/40 focus:border-[#B98D3E] transition"
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
              <label className="block text-xs font-medium text-[#667085] mb-1.5">
                Price (₹)
              </label>
              <input
                type="number"
                name="price"
                placeholder="0"
                value={formData.price}
                onChange={handleChange}
                className="w-full border border-[#D0D5DD] rounded-lg p-2.5 font-mono tabular-nums text-[#101828] placeholder:text-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#B98D3E]/40 focus:border-[#B98D3E] transition"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#667085] mb-1.5">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                placeholder="0"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full border border-[#D0D5DD] rounded-lg p-2.5 font-mono tabular-nums text-[#101828] placeholder:text-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#B98D3E]/40 focus:border-[#B98D3E] transition"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={() => navigate("/admin")}
              className="px-4 py-2.5 rounded-lg border border-[#D0D5DD] font-medium text-sm text-[#344054] transition-all duration-150 hover:bg-[#F9FAFB] active:scale-[0.97] active:bg-[#F2F4F7]"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 bg-[#0B1220] text-white font-medium text-sm py-2.5 rounded-lg transition-all duration-150 hover:bg-[#182338] active:scale-[0.98] active:bg-[#060A12]"
            >
              {isEdit ? "Update Vehicle" : "Add Vehicle"}
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </>
  );
}
