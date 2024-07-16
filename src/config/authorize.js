import axios from "../services/api.js";
import { Cookie } from "js-cookie";
import { toast } from "sonner";
import { mutate } from "swr";

export const fetchWorkouts = async (fetchEndpoint) => {
  try {
    const token = Cookie.get("token");
    const response = await axios.get(fetchEndpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const postWorkout = async (fetchEndpoint, exercise, days, reps) => {
  try {
    const workout = { exercise, days, reps };
    const token = Cookie.get("token");
    await axios.post(fetchEndpoint, workout, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    mutate(fetchEndpoint);
  } catch (error) {
    toast.error("Error creating workout");
  }
};

export const deleteWorkout = async (fetchEndpoint, id) => {
  try {
    await axios.delete(`${fetchEndpoint}?id=${id}`);
  } catch (error) {
    toast.error("Error deleting workout");
  }
};
