import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getVehicles, purchaseVehicle } from "../services/vehicleService";
import LoadingSpinner from "../components/LoadingSpinner";
import { useToast } from "../context/ToastContext";
import Footer from "../components/Footer";

export default function Dashboard() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategory] = useState("");
  const [ordering, setOrdering] = useState("");
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

  async function handlePurchase(id) {
    try {
      await purchaseVehicle(id);
      showToast("Vehicle purchased successfully!");

      setVehicles((prev) =>
        prev.map((vehicle) =>
          vehicle.id === id
            ? {
                ...vehicle,
                quantity: vehicle.quantity - 1,
              }
            : vehicle,
        ),
      );
    } catch (error) {
      showToast(error.response?.data?.error || "Purchase failed.", "error");
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

      <main className="max-w-7xl mx-auto px-6 py-10 bg-[#F7F5F0] min-h-screen">
        <div className="mb-8">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#B23A3A]">
            Showroom Floor
          </span>
          <h1 className="text-4xl font-black uppercase tracking-tight text-[#14161A] mt-1">
            Vehicle Inventory
          </h1>
        </div>

        <div className="mb-8 bg-white border border-[#E4E0D6] rounded-md p-4 grid grid-cols-1 md:grid-cols-3 gap-4 shadow-sm">
          {/* Search */}
          <div>
            <label className="block text-[10px] font-mono uppercase tracking-widest text-[#7C8494] mb-1">
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
              className="w-full border border-[#D8D5CC] rounded-sm p-3 focus:outline-none focus:ring-2 focus:ring-[#F2A93B] focus:border-transparent transition"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-[10px] font-mono uppercase tracking-widest text-[#7C8494] mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => {
                setPage(1);
                setCategory(e.target.value);
              }}
              className="w-full border border-[#D8D5CC] rounded-sm p-3 focus:outline-none focus:ring-2 focus:ring-[#F2A93B] focus:border-transparent transition"
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
            <label className="block text-[10px] font-mono uppercase tracking-widest text-[#7C8494] mb-1">
              Sort By
            </label>
            <select
              value={ordering}
              onChange={(e) => {
                setPage(1);
                setOrdering(e.target.value);
              }}
              className="w-full border border-[#D8D5CC] rounded-sm p-3 focus:outline-none focus:ring-2 focus:ring-[#F2A93B] focus:border-transparent transition"
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
          <div className="bg-white border border-[#E4E0D6] rounded-md shadow-sm py-20 px-8 text-center">
            <div className="text-6xl mb-5">🚗</div>

            <h2 className="text-3xl font-black uppercase tracking-tight text-[#14161A]">
              No Vehicles Found
            </h2>

            <p className="mt-3 text-[#7C8494] max-w-lg mx-auto">
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
                className="mt-8 bg-[#C81E3A] text-white font-bold uppercase tracking-wide px-6 py-3 rounded-sm hover:bg-[#a8172f] transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((vehicle) => {
              const stockPct = Math.max(
                0,
                Math.min(100, (vehicle.quantity / 10) * 100),
              );

              return (
                <div
                  key={vehicle.id}
                  className="bg-white rounded-md border border-[#E4E0D6] shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 overflow-hidden flex flex-col"
                >
                  <div className="h-1.5 w-full bg-gradient-to-r from-[#C81E3A] to-[#F2A93B]" />

                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h2 className="text-xl font-black uppercase tracking-tight text-[#14161A]">
                          {vehicle.make}
                        </h2>

                        <p className="text-[#7C8494] font-medium">
                          {vehicle.model}
                        </p>
                      </div>

                      <span className="shrink-0 border-2 border-[#14161A] rounded-sm px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[#14161A]">
                        {vehicle.category}
                      </span>
                    </div>

                    <p className="mt-5 text-3xl font-mono font-bold tabular-nums text-[#14161A]">
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                        maximumFractionDigits: 0,
                      }).format(vehicle.price)}
                    </p>

                    <div className="mt-4">
                      <div className="flex justify-between items-center mb-1">
                        <span
                          className={`text-xs font-bold uppercase tracking-wide ${
                            vehicle.quantity > 0
                              ? "text-[#3F9C63]"
                              : "text-[#B23A3A]"
                          }`}
                        >
                          {vehicle.quantity > 0
                            ? `In Stock · ${vehicle.quantity}`
                            : "Out of Stock"}
                        </span>
                      </div>

                      <div className="h-1.5 w-full bg-[#EDE9E0] rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            vehicle.quantity > 0
                              ? "bg-[#3F9C63]"
                              : "bg-[#B23A3A]"
                          }`}
                          style={{ width: `${stockPct}%` }}
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => handlePurchase(vehicle.id)}
                      disabled={vehicle.quantity === 0}
                      className={`mt-6 w-full py-3 rounded-sm font-bold uppercase tracking-wide transition-colors ${
                        vehicle.quantity === 0
                          ? "bg-[#D8D5CC] text-[#8A8778] cursor-not-allowed"
                          : "bg-[#C81E3A] text-white hover:bg-[#a8172f]"
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
            className="bg-white border border-[#D8D5CC] px-4 py-2 rounded-sm font-semibold text-sm uppercase tracking-wide hover:bg-[#EDE9E0] disabled:opacity-40 disabled:hover:bg-white transition-colors"
          >
            Previous
          </button>

          <span className="font-mono font-bold text-[#14161A] tabular-nums">
            {String(page).padStart(2, "0")} /{" "}
            {String(totalPages).padStart(2, "0")}
          </span>

          <button
            disabled={page >= totalPages}
            onClick={() => setPage(page + 1)}
            className="bg-white border border-[#D8D5CC] px-4 py-2 rounded-sm font-semibold text-sm uppercase tracking-wide hover:bg-[#EDE9E0] disabled:opacity-40 disabled:hover:bg-white transition-colors"
          >
            Next
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
}
