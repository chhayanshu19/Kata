import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getVehicles, purchaseVehicle } from "../services/vehicleService";

export default function Dashboard() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategory] = useState("");
  const [ordering, setOrdering] = useState("");

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
      alert(error.response?.data?.error || "Purchase failed");
    }
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <h2 className="text-center mt-20 text-xl">Loading...</h2>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-8">Vehicle Inventory</h1>

        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <input
            type="text"
            placeholder="Search vehicles..."
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            className="border rounded-lg p-3"
          />

          {/* Category */}
          <select
            value={category}
            onChange={(e) => {
              setPage(1);
              setCategory(e.target.value);
            }}
            className="border rounded-lg p-3"
          >
            <option value="">All Categories</option>
            <option value="SUV">SUV</option>
            <option value="Sedan">Sedan</option>
            <option value="Hatchback">Hatchback</option>
            <option value="Truck">Truck</option>
            <option value="Sports">Sports</option>
          </select>

          {/* Sort */}
          <select
            value={ordering}
            onChange={(e) => {
              setPage(1);
              setOrdering(e.target.value);
            }}
            className="border rounded-lg p-3"
          >
            <option value="">Default Sorting</option>

            <option value="price">Price: Low → High</option>

            <option value="-price">Price: High → Low</option>

            <option value="quantity">Quantity: Low → High</option>

            <option value="-quantity">Quantity: High → Low</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="bg-white rounded-xl shadow-md border hover:shadow-xl transition-all duration-300 p-6"
            >
              <h2 className="text-2xl font-bold">{vehicle.make}</h2>

              <p>{vehicle.model}</p>

              <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                {vehicle.category}
              </span>

              <p className="mt-4 text-2xl font-bold text-green-700">
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                  maximumFractionDigits: 0,
                }).format(vehicle.price)}
              </p>

              <p className="mt-4">
                {vehicle.quantity > 0 ? (
                  <span className="text-green-600 font-semibold">
                    🟢 In Stock ({vehicle.quantity})
                  </span>
                ) : (
                  <span className="text-red-600 font-semibold">
                    🔴 Out of Stock
                  </span>
                )}
              </p>
              <button
                onClick={() => handlePurchase(vehicle.id)}
                disabled={vehicle.quantity === 0}
                className={`mt-6 w-full py-3 rounded-lg font-semibold transition ${
                  vehicle.quantity === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {vehicle.quantity === 0 ? "Out of Stock" : "Purchase"}
              </button>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-4 mt-10">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="bg-gray-200 px-4 py-2 rounded disabled:opacity-50"
          >
            Previous
          </button>

          <span className="font-bold">Page {page}</span>

          <button
            disabled={page >= totalPages}
            onClick={() => setPage(page + 1)}
            className="bg-gray-200 px-4 py-2 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </main>
    </>
  );
}
