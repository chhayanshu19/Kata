import api from "../api/axios";

export const getVehicles = async (search = "", page = 1) => {
  const response = await api.get("/vehicles/", {
    params: {
      search,
      page,
    },
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  return response.data;
};

export const getVehicle = async (id) => {
  const response = await api.get(`/vehicles/${id}/`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  return response.data;
};

export const createVehicle = async (vehicleData) => {
  const response = await api.post("/vehicles/", vehicleData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  return response.data;
};

export const updateVehicle = async (id, vehicleData) => {
  const response = await api.put(`/vehicles/${id}/`, vehicleData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  return response.data;
};

export const deleteVehicle = async (id) => {
  const response = await api.delete(`/vehicles/${id}/`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  return response.data;
};

export const purchaseVehicle = async (id) => {
  const response = await api.post(
    `/vehicles/${id}/purchase/`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    },
  );

  return response.data;
};
