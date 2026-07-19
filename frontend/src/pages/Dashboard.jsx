import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getVehicles, purchaseVehicle } from "../services/vehicleService";
import LoadingSpinner from "../components/LoadingSpinner";
import { useToast } from "../context/ToastContext";
import Footer from "../components/Footer";
import Modal from "../components/Modal";

const CATEGORY_STYLES = {
  SUV: "bg-[#EFF3F8] text-[#2F4B7C]",
  Sedan: "bg-[#F5EFE1] text-[#8A6A2A]",
  Hatchback: "bg-[#EAF3EF] text-[#1B7A5B]",
  Truck: "bg-[#F5EDE7] text-[#8A4B2A]",
  Sports: "bg-[#FBEAEA] text-[#B3261E]",
};
const DEFAULT_CATEGORY_STYLE = "bg-[#EEF0F3] text-[#475467]";

export default function Dashboard() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategory] = useState("");
  const [ordering, setOrdering] = useState("");
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const { showToast } = useToast();

  useEffect(() => {
    fetchVehicles();
  }, [search, page, category, ordering]);

  async function fetchVehicles() {
    try {
      const data = await getVehicles(search, page, category, ordering);

      setVehicles(data.results);
      setTotalPages(Math.ceil(data.count / 5));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handlePurchase() {
    try {
      await purchaseVehicle(selectedVehicle.id);

      showToast("Vehicle purchased successfully!");

      setIsPurchaseModalOpen(false);
      setSelectedVehicle(null);

      await fetchVehicles();
    } catch (error) {
      setIsPurchaseModalOpen(false);
      setSelectedVehicle(null);

      showToast(error.response?.data?.error || "Purchase failed.", "error");

      fetchVehicles();
    }
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <LoadingSpinner />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-10 bg-[#F8F9FB] min-h-screen">
        <div className="mb-8">
          <span className="text-xs font-medium uppercase tracking-wide text-[#667085]">
            Showroom Floor
          </span>
          <h1 className="text-[28px] font-semibold tracking-tight text-[#101828] mt-1">
            Vehicle Inventory
          </h1>
        </div>

        <div className="mb-8 bg-white border border-[#E4E7EC] rounded-xl p-4 grid grid-cols-1 md:grid-cols-3 gap-4 shadow-sm">
          {/* Search */}
          <div>
            <label className="block text-xs font-medium text-[#667085] mb-1.5">
              Search
            </label>
            <input
              type="text"
              placeholder="Make, model..."
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
              className="w-full border border-[#D0D5DD] rounded-lg p-2.5 text-[#101828] placeholder:text-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#B98D3E]/40 focus:border-[#B98D3E] transition"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-medium text-[#667085] mb-1.5">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => {
                setPage(1);
                setCategory(e.target.value);
              }}
              className="w-full border border-[#D0D5DD] rounded-lg p-2.5 text-[#101828] focus:outline-none focus:ring-2 focus:ring-[#B98D3E]/40 focus:border-[#B98D3E] transition"
            >
              <option value="">All Categories</option>
              <option value="SUV">SUV</option>
              <option value="Sedan">Sedan</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Truck">Truck</option>
              <option value="Sports">Sports</option>
            </select>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-xs font-medium text-[#667085] mb-1.5">
              Sort By
            </label>
            <select
              value={ordering}
              onChange={(e) => {
                setPage(1);
                setOrdering(e.target.value);
              }}
              className="w-full border border-[#D0D5DD] rounded-lg p-2.5 text-[#101828] focus:outline-none focus:ring-2 focus:ring-[#B98D3E]/40 focus:border-[#B98D3E] transition"
            >
              <option value="">Default Sorting</option>
              <option value="price">Price: Low → High</option>
              <option value="-price">Price: High → Low</option>
              <option value="quantity">Quantity: Low → High</option>
              <option value="-quantity">Quantity: High → Low</option>
            </select>
          </div>
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
              No vehicles found
            </h2>

            <p className="mt-2 text-[#667085] max-w-lg mx-auto text-sm">
              We couldn't find any vehicles matching your current search or
              selected filters.
            </p>

            {(search || category || ordering) && (
              <button
                onClick={() => {
                  setSearch("");
                  setCategory("");
                  setOrdering("");
                  setPage(1);
                }}
                className="mt-7 bg-[#0B1220] text-white font-medium text-sm px-5 py-2.5 rounded-lg transition-all duration-150 hover:bg-[#182338] active:scale-[0.97] active:bg-[#060A12]"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {vehicles.map((vehicle) => {
              const stockPct = Math.max(
                0,
                Math.min(100, (vehicle.quantity / 10) * 100),
              );
              const categoryStyle =
                CATEGORY_STYLES[vehicle.category] || DEFAULT_CATEGORY_STYLE;

              return (
                <div
                  key={vehicle.id}
                  className="bg-white rounded-xl border border-[#E4E7EC] shadow-sm hover:shadow-md hover:border-[#D0D5DD] transition-all duration-200 overflow-hidden flex flex-col"
                >
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h2 className="text-lg font-semibold tracking-tight text-[#101828]">
                          {vehicle.make}
                        </h2>

                        <p className="text-[#667085] text-sm">
                          {vehicle.model}
                        </p>
                      </div>

                      <span
                        className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${categoryStyle}`}
                      >
                        {vehicle.category}
                      </span>
                    </div>

                    <p className="mt-5 text-2xl font-semibold tabular-nums text-[#101828]">
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                        maximumFractionDigits: 0,
                      }).format(vehicle.price)}
                    </p>

                    <div className="mt-4">
                      <div className="flex justify-between items-center mb-1.5">
                        <span
                          className={`text-xs font-medium ${
                            vehicle.quantity > 0
                              ? "text-[#1B7A5B]"
                              : "text-[#B3261E]"
                          }`}
                        >
                          {vehicle.quantity > 0
                            ? `In stock · ${vehicle.quantity}`
                            : "Out of stock"}
                        </span>
                      </div>

                      <div className="h-1.5 w-full bg-[#F2F4F7] rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            vehicle.quantity > 0
                              ? "bg-[#1B7A5B]"
                              : "bg-[#B3261E]"
                          }`}
                          style={{ width: `${stockPct}%` }}
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedVehicle(vehicle);
                        setIsPurchaseModalOpen(true);
                      }}
                      disabled={vehicle.quantity === 0}
                      className={`mt-6 w-full py-2.5 rounded-lg font-medium text-sm transition-all duration-150 ${
                        vehicle.quantity === 0
                          ? "bg-[#F2F4F7] text-[#98A2B3] cursor-not-allowed"
                          : "bg-[#0B1220] text-white hover:bg-[#182338] active:scale-[0.97] active:bg-[#060A12]"
                      }`}
                    >
                      {vehicle.quantity === 0 ? "Out of Stock" : "Purchase"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="flex justify-center items-center gap-4 mt-12">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="bg-white border border-[#D0D5DD] px-4 py-2 rounded-lg font-medium text-sm text-[#344054] transition-all duration-150 hover:bg-[#F9FAFB] active:scale-[0.96] active:bg-[#F2F4F7] disabled:opacity-40 disabled:active:scale-100 disabled:hover:bg-white"
          >
            Previous
          </button>

          <span className="font-medium text-sm text-[#344054] tabular-nums">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page >= totalPages}
            onClick={() => setPage(page + 1)}
            className="bg-white border border-[#D0D5DD] px-4 py-2 rounded-lg font-medium text-sm text-[#344054] transition-all duration-150 hover:bg-[#F9FAFB] active:scale-[0.96] active:bg-[#F2F4F7] disabled:opacity-40 disabled:active:scale-100 disabled:hover:bg-white"
          >
            Next
          </button>
        </div>
      </main>
      <Modal
        isOpen={isPurchaseModalOpen}
        title="Confirm Purchase"
        onClose={() => {
          setIsPurchaseModalOpen(false);
          setSelectedVehicle(null);
        }}
      >
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold tracking-tight text-[#101828]">
              {selectedVehicle?.make} {selectedVehicle?.model}
            </h3>

            <p className="text-[#667085] text-sm">
              {selectedVehicle?.category}
            </p>
          </div>

          <div className="rounded-lg border border-[#E4E7EC] p-4 bg-[#F9FAFB] space-y-1.5 text-sm">
            <p className="flex justify-between">
              <span className="text-[#667085]">Price</span>
              <span className="font-semibold text-[#101828] tabular-nums">
                {selectedVehicle &&
                  new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                    maximumFractionDigits: 0,
                  }).format(selectedVehicle.price)}
              </span>
            </p>

            <p className="flex justify-between">
              <span className="text-[#667085]">Available stock</span>
              <span className="font-semibold text-[#101828] tabular-nums">
                {selectedVehicle?.quantity}
              </span>
            </p>
          </div>

          <p className="text-[#475467] text-sm">
            Are you sure you want to purchase this vehicle?
          </p>

          <div className="flex justify-end gap-3 pt-1">
            <button
              onClick={() => {
                setIsPurchaseModalOpen(false);
                setSelectedVehicle(null);
              }}
              className="px-4 py-2 border border-[#D0D5DD] rounded-lg font-medium text-sm text-[#344054] transition-all duration-150 hover:bg-[#F9FAFB] active:scale-[0.97] active:bg-[#F2F4F7]"
            >
              Cancel
            </button>

            <button
              onClick={handlePurchase}
              className="bg-[#1B7A5B] text-white px-4 py-2 rounded-lg font-medium text-sm transition-all duration-150 hover:bg-[#15614A] active:scale-[0.97] active:bg-[#114E3D]"
            >
              Confirm Purchase
            </button>
          </div>
        </div>
      </Modal>
      <Footer />
    </>
  );
}
