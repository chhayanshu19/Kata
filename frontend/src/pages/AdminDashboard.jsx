import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import { getVehicles } from "../services/vehicleService";

export default function AdminDashboard() {
  const [vehicles, setVehicles] = useState([]);

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

  return (
    <>
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>

          <Link
            to="/vehicle/new"
            className="bg-green-600 text-white px-5 py-3 rounded hover:bg-green-700"
          >
            + Add Vehicle
          </Link>
        </div>

        <div className="space-y-4">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="border rounded-lg p-5 flex justify-between items-center shadow"
            >
              <div>
                <h2 className="text-xl font-bold">
                  {vehicle.make} {vehicle.model}
                </h2>

                <p>{vehicle.category}</p>

                <p>Quantity : {vehicle.quantity}</p>
              </div>

              <div className="flex gap-3">
                <Link
                  to={`/vehicle/edit/${vehicle.id}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Edit
                </Link>

                <button className="bg-red-600 text-white px-4 py-2 rounded">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
