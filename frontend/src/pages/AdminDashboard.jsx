import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import { useToast } from "../context/ToastContext";
import {
  getVehicles,
  deleteVehicle,
  restockVehicle,
} from "../services/vehicleService";
import Modal from "../components/Modal";
import Footer from "../components/Footer";

export default function AdminDashboard() {
  const [vehicles, setVehicles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [restockQuantity, setRestockQuantity] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    fetchVehicles();
  }, []);

  async function fetchVehicles() {
    try {
      const data = await getVehicles();
      setVehicles(data.results);
    } catch (error) {
      console.error(error);
    }
  }
  const handleDelete = (vehicle) => {
    setSelectedVehicle(vehicle);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteVehicle(selectedVehicle.id);

      // Close the modal first
      setIsDeleteModalOpen(false);
      setSelectedVehicle(null);

      // Then refresh the list
      await fetchVehicles();

      showToast("Vehicle deleted successfully!");
    } catch (error) {
      console.error(error);
      showToast("Failed to delete vehicle.", "error");
    }
  };

  const handleRestock = (vehicle) => {
    setSelectedVehicle(vehicle);

    setRestockQuantity("");

    setIsModalOpen(true);
  };

  const submitRestock = async () => {
    if (!restockQuantity || Number(restockQuantity) <= 0) {
      showToast("Please enter a valid quantity.", "warning");
      return;
    }

    try {
      await restockVehicle(selectedVehicle.id, Number(restockQuantity));

      // Close the modal FIRST
      setIsModalOpen(false);
      setSelectedVehicle(null);
      setRestockQuantity("");

      // Then refresh the list
      await fetchVehicles();

      showToast("Vehicle restocked successfully!");
    } catch (error) {
      console.error(error);
      showToast("Failed to restock vehicle.", "error");
    }
  };

  return (
    <>
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-10 bg-[#F7F5F0] min-h-screen">
        <div className="flex justify-between items-center mb-8 gap-4 flex-wrap">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#B23A3A]">
              Back Office
            </span>
            <h1 className="text-4xl font-black uppercase tracking-tight text-[#14161A] mt-1">
              Admin Dashboard
            </h1>
          </div>

          <Link
            to="/vehicle/new"
            className="flex items-center gap-2 bg-[#3F9C63] text-white px-5 py-3 rounded-sm font-bold uppercase tracking-wide text-sm hover:bg-[#347f51] transition-colors"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M12 5v14M5 12h14" strokeLinecap="round" />
            </svg>
            Add Vehicle
          </Link>
        </div>

        {vehicles.length === 0 ? (
          <div className="bg-white border border-[#E4E0D6] rounded-md shadow-sm py-20 px-8 text-center">
            <div className="text-6xl mb-5">🚘</div>

            <h2 className="text-3xl font-black uppercase tracking-tight text-[#14161A]">
              No Vehicles Available
            </h2>

            <p className="mt-3 text-[#7C8494] max-w-lg mx-auto">
              There are currently no vehicles in the inventory. Start by adding
              your first vehicle.
            </p>

            <Link
              to="/vehicle/new"
              className="inline-block mt-8 bg-[#3F9C63] text-white font-bold uppercase tracking-wide px-6 py-3 rounded-sm hover:bg-[#347f51] transition-colors"
            >
              + Add First Vehicle
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {vehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="bg-white border border-[#E4E0D6] rounded-md p-5 flex flex-col sm:flex-row justify-between sm:items-center gap-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <span className="hidden sm:flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#14161A] text-[#F2A93B] font-mono font-bold text-xs">
                    {vehicle.make?.slice(0, 2).toUpperCase()}
                  </span>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-lg font-black uppercase tracking-tight text-[#14161A]">
                        {vehicle.make} {vehicle.model}
                      </h2>

                      <span className="border-2 border-[#14161A] rounded-sm px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#14161A]">
                        {vehicle.category}
                      </span>
                    </div>

                    <p className="text-sm text-[#7C8494] font-mono mt-1">
                      Qty on hand:{" "}
                      <span
                        className={`font-bold tabular-nums ${
                          vehicle.quantity > 0
                            ? "text-[#3F9C63]"
                            : "text-[#B23A3A]"
                        }`}
                      >
                        {vehicle.quantity}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 flex-wrap">
                  <Link
                    to={`/vehicle/edit/${vehicle.id}`}
                    className="bg-[#3D4451] text-white px-4 py-2 rounded-sm font-semibold text-sm uppercase tracking-wide hover:bg-[#2c333e] transition-colors"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleRestock(vehicle)}
                    className="bg-[#F2A93B] text-[#14161A] px-4 py-2 rounded-sm font-semibold text-sm uppercase tracking-wide hover:bg-[#dc9527] transition-colors"
                  >
                    Restock
                  </button>

                  <button
                    onClick={() => handleDelete(vehicle)}
                    className="bg-[#B23A3A] text-white px-4 py-2 rounded-sm font-semibold text-sm uppercase tracking-wide hover:bg-[#942e2e] transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
      <Modal
        isOpen={isModalOpen}
        title="Restock Vehicle"
        onClose={() => setIsModalOpen(false)}
      >
        <p className="mb-3 font-mono font-bold uppercase tracking-wide text-[#14161A]">
          {selectedVehicle?.make} {selectedVehicle?.model}
        </p>

        <label className="block text-xs font-mono uppercase tracking-widest text-[#7C8494] mb-1">
          Quantity to add
        </label>
        <input
          type="number"
          placeholder="0"
          value={restockQuantity}
          onChange={(e) => setRestockQuantity(e.target.value)}
          className="w-full border border-[#D8D5CC] rounded-sm p-3 mb-5 focus:outline-none focus:ring-2 focus:ring-[#F2A93B] focus:border-transparent transition"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={() => setIsModalOpen(false)}
            className="px-4 py-2 rounded-sm border border-[#D8D5CC] font-semibold text-sm uppercase tracking-wide hover:bg-[#F7F5F0] transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={submitRestock}
            className="bg-[#3F9C63] text-white px-4 py-2 rounded-sm font-semibold text-sm uppercase tracking-wide hover:bg-[#347f51] transition-colors"
          >
            Restock
          </button>
        </div>
      </Modal>
      <Modal
        isOpen={isDeleteModalOpen}
        title="Delete Vehicle"
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedVehicle(null);
        }}
      >
        <p className="text-gray-700 mb-6">
          Are you sure you want to delete{" "}
          <span className="font-bold">
            {selectedVehicle?.make} {selectedVehicle?.model}
          </span>
          ?
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => {
              setIsDeleteModalOpen(false);
              setSelectedVehicle(null);
            }}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={confirmDelete}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </Modal>
    </>
  );
}
