import axios from "axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";

export const api = axios.create({
  baseURL: "https://car-manage-kappa.vercel.app/api",
});

export const getAllCars = async () => {
  try {
    const response = await api.get("/car/allcars", {
      timeout: 10 * 1000,
    });

    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    toast.error("Something went wrong");
    throw error;
  }
};
export const updateCar = async (id, data, token) => {
  try {
    const response = await api.put(
      `/car/update/${id}`,
      {
        data,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    throw error;
  }
};
export const deleteCar = async (id, token) => {
  try {
    const response = await api.delete(`/car/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw error;
  }
};
export const getCar = async (id) => {
  try {
    const response = await api.get(`/car/cars/${id}`, {
      timeout: 10 * 1000,
    });

    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    toast.error("Something went wrong");
    throw error;
  }
};

export const createUser = async (email, name, password) => {
  try {
    return await api.post(`/user/register`, { email, name, password });
  } catch (error) {
    toast.error("Something went wrong, Please try again");
    throw error;
  }
};
export const login = async (email, password) => {
  try {
    return await api.post(`/user/login`, { email, password });
  } catch (error) {
    toast.error("Something went wrong, Please try again");
    throw error;
  }
};

export const toFav = async (id, email, token) => {
  try {
    await api.post(
      `/user/toFav/${id}`,
      {
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (e) {
    throw e;
  }
};

export const getAllFav = async (email, token) => {
  if (!token) return;
  try {
    const res = await api.post(
      `/user/allFav`,
      {
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (e) {
    toast.error("Something went wrong while fetching favs");
    throw e;
  }
};

export const createCar = async (data, token) => {
  try {
    const res = await api.post(
      `/car/create`,
      {
        data,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    throw error;
  }
};

export const forgotpassword = async (email) => {
  try {
    const res = await api.post(`/user/forgot-password`, {
      email,
    });

    return res;
  } catch (error) {
    throw error;
  }
};
