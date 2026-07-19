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

const CATEGORY_STYLES = {
  SUV: "bg-[#EFF3F8] text-[#2F4B7C]",
  Sedan: "bg-[#F5EFE1] text-[#8A6A2A]",
  Hatchback: "bg-[#EAF3EF] text-[#1B7A5B]",
  Truck: "bg-[#F5EDE7] text-[#8A4B2A]",
  Sports: "bg-[#FBEAEA] text-[#B3261E]",
};
const DEFAULT_CATEGORY_STYLE = "bg-[#EEF0F3] text-[#475467]";

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

      <main className="max-w-6xl mx-auto px-6 py-10 bg-[#F8F9FB] min-h-screen">
        <div className="flex justify-between items-center mb-8 gap-4 flex-wrap">
          <div>
            <span className="text-xs font-medium uppercase tracking-wide text-[#667085]">
              Back Office
            </span>
            <h1 className="text-[28px] font-semibold tracking-tight text-[#101828] mt-1">
              Admin Dashboard
            </h1>
          </div>

          <Link
            to="/vehicle/new"
            className="flex items-center gap-2 bg-[#0B1220] text-white px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-150 hover:bg-[#182338] active:scale-[0.97] active:bg-[#060A12]"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 5v14M5 12h14" strokeLinecap="round" />
            </svg>
            Add Vehicle
          </Link>
        </div>

        {vehicles.length === 0 ? (
          <div className="bg-white border border-[#E4E7EC] rounded-xl shadow-sm py-20 px-8 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F2F4F7] mx-auto mb-5">
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6 text-[#98A2B3]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
              >
                <path
                  d="M3 13l1.5-4.5A2 2 0 0 1 6.4 7h11.2a2 2 0 0 1 1.9 1.5L21 13"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <rect x="3" y="13" width="18" height="5" rx="1.5" />
              </svg>
            </div>

            <h2 className="text-xl font-semibold tracking-tight text-[#101828]">
              No vehicles available
            </h2>

            <p className="mt-2 text-[#667085] max-w-lg mx-auto text-sm">
              There are currently no vehicles in the inventory. Start by adding
              your first vehicle.
            </p>

            <Link
              to="/vehicle/new"
              className="inline-block mt-7 bg-[#0B1220] text-white font-medium text-sm px-5 py-2.5 rounded-lg transition-all duration-150 hover:bg-[#182338] active:scale-[0.97] active:bg-[#060A12]"
            >
              + Add First Vehicle
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {vehicles.map((vehicle) => {
              const categoryStyle =
                CATEGORY_STYLES[vehicle.category] || DEFAULT_CATEGORY_STYLE;

              return (
                <div
                  key={vehicle.id}
                  className="bg-white border border-[#E4E7EC] rounded-xl p-5 flex flex-col sm:flex-row justify-between sm:items-center gap-4 shadow-sm hover:border-[#D0D5DD] transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F2F4F7] text-[#344054] font-semibold text-xs">
                      {vehicle.make?.slice(0, 2).toUpperCase()}
                    </span>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="text-[15px] font-semibold tracking-tight text-[#101828]">
                          {vehicle.make} {vehicle.model}
                        </h2>

                        <span
                          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${categoryStyle}`}
                        >
                          {vehicle.category}
                        </span>
                      </div>

                      <p className="text-sm text-[#667085] mt-1">
                        Qty on hand:{" "}
                        <span
                          className={`font-semibold tabular-nums ${
                            vehicle.quantity > 0
                              ? "text-[#1B7A5B]"
                              : "text-[#B3261E]"
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
                      className="bg-white border border-[#D0D5DD] text-[#344054] px-3.5 py-2 rounded-lg font-medium text-sm transition-all duration-150 hover:bg-[#F9FAFB] active:scale-[0.96] active:bg-[#F2F4F7]"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleRestock(vehicle)}
                      className="bg-white border border-[#D0D5DD] text-[#344054] px-3.5 py-2 rounded-lg font-medium text-sm transition-all duration-150 hover:bg-[#F9FAFB] active:scale-[0.96] active:bg-[#F2F4F7]"
                    >
                      Restock
                    </button>

                    <button
                      onClick={() => handleDelete(vehicle)}
                      className="bg-white border border-[#F3C6C4] text-[#B3261E] px-3.5 py-2 rounded-lg font-medium text-sm transition-all duration-150 hover:bg-[#FBEAEA] active:scale-[0.96] active:bg-[#F5D5D3]"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
      <Footer />
      <Modal
        isOpen={isModalOpen}
        title="Restock Vehicle"
        onClose={() => setIsModalOpen(false)}
      >
        <p className="mb-4 text-sm text-[#667085]">
          <span className="font-semibold text-[#101828]">
            {selectedVehicle?.make} {selectedVehicle?.model}
          </span>
        </p>

        <label className="block text-xs font-medium uppercase tracking-wide text-[#667085] mb-1.5">
          Quantity to add
        </label>
        <input
          type="number"
          placeholder="0"
          value={restockQuantity}
          onChange={(e) => setRestockQuantity(e.target.value)}
          className="w-full border border-[#D0D5DD] rounded-lg p-2.5 mb-5 text-[#101828] focus:outline-none focus:ring-2 focus:ring-[#B98D3E]/40 focus:border-[#B98D3E] transition"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={() => setIsModalOpen(false)}
            className="px-4 py-2 rounded-lg border border-[#D0D5DD] font-medium text-sm text-[#344054] transition-all duration-150 hover:bg-[#F9FAFB] active:scale-[0.97] active:bg-[#F2F4F7]"
          >
            Cancel
          </button>

          <button
            onClick={submitRestock}
            className="bg-[#0B1220] text-white px-4 py-2 rounded-lg font-medium text-sm transition-all duration-150 hover:bg-[#182338] active:scale-[0.97] active:bg-[#060A12]"
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
        <p className="text-sm text-[#475467] mb-6">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-[#101828]">
            {selectedVehicle?.make} {selectedVehicle?.model}
          </span>
          ? This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => {
              setIsDeleteModalOpen(false);
              setSelectedVehicle(null);
            }}
            className="px-4 py-2 rounded-lg border border-[#D0D5DD] font-medium text-sm text-[#344054] transition-all duration-150 hover:bg-[#F9FAFB] active:scale-[0.97] active:bg-[#F2F4F7]"
          >
            Cancel
          </button>

          <button
            onClick={confirmDelete}
            className="bg-[#B3261E] text-white px-4 py-2 rounded-lg font-medium text-sm transition-all duration-150 hover:bg-[#8F1E18] active:scale-[0.97] active:bg-[#711712]"
          >
            Delete
          </button>
        </div>
      </Modal>
    </>
  );
}
