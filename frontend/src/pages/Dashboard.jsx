import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getVehicles, purchaseVehicle } from "../services/vehicleService";

export default function Dashboard() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchVehicles();
  }, [search, page]);

  async function fetchVehicles() {
    try {
      const data = await getVehicles(search, page);

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

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search vehicles..."
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            className="border rounded-lg p-3 w-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="border rounded-xl shadow p-5">
              <h2 className="text-2xl font-bold">{vehicle.make}</h2>

              <p>{vehicle.model}</p>

              <p>{vehicle.category}</p>

              <p className="mt-3 font-semibold">₹ {vehicle.price}</p>

              <p>Quantity : {vehicle.quantity}</p>
              <button
                onClick={() => handlePurchase(vehicle.id)}
                disabled={vehicle.quantity === 0}
                className={`mt-4 w-full p-2 rounded text-white ${
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
