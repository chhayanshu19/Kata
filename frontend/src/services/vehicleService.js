import api from "../api/axios";

export const getVehicles = async (
    search = "",
    page = 1
) => {

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

export const purchaseVehicle = async (id) => {
    const response = await api.post(
        `/vehicles/${id}/purchase/`,
        {},
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        }
    );

    return response.data;
};