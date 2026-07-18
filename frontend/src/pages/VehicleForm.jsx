import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import {
  getVehicle,
  createVehicle,
  updateVehicle,
} from "../services/vehicleService";

export default function VehicleForm() {
  const navigate = useNavigate();

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
      } else {
        await createVehicle(formData);
      }

      navigate("/admin");
    } catch (error) {
      console.error(error);
      alert("Failed to save vehicle.");
    }
  };

  return (
    <>
      <Navbar />

      <main className="max-w-2xl mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold mb-8">
          {isEdit ? "Edit Vehicle" : "Add Vehicle"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="make"
            placeholder="Make"
            value={formData.make}
            onChange={handleChange}
            className="w-full border rounded p-3"
          />

          <input
            type="text"
            name="model"
            placeholder="Model"
            value={formData.model}
            onChange={handleChange}
            className="w-full border rounded p-3"
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded p-3"
          >
            <option value="">Select Category</option>
            <option value="SUV">SUV</option>
            <option value="Sedan">Sedan</option>
            <option value="Hatchback">Hatchback</option>
            <option value="Truck">Truck</option>
            <option value="Sports">Sports</option>
          </select>

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border rounded p-3"
          />

          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full border rounded p-3"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
          >
            {isEdit ? "Update Vehicle" : "Add Vehicle"}
          </button>
        </form>
      </main>
    </>
  );
}
