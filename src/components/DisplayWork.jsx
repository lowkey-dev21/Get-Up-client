import axios from "../services/api";
import Cookie from "js-cookie";
import { toast } from "sonner";
import { mutate } from "swr";

// eslint-disable-next-line react/prop-types
const DisplayWork = ({ exercise, days, reps, id }) => {
  const handleDelete = async () => {
    try {
      const token = Cookie.get("token");
      await axios.delete(`/api/workouts?workoutId=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Workout deleted successfully.");

      // Optimistically update the cache
      mutate('/api/workouts', (currentData) => {
        return currentData.filter(workout => workout._id !== id);
      }, false);

      // Revalidate the cache
      mutate('/api/workouts');
    } catch (error) {
      toast.error("Failed to delete workout.");
    }
  };

  return (
    <section className="p-3 gap-1 shadow-xl justify-between bg-white mb-3 mx-4 rounded-2xl flex">
      <div className="flex flex-col">
        <p className="text-xl">{exercise}</p>
        <p className="text-red-400">{days}</p>
        <p>Count: {reps}</p>
      </div>

      <div onClick={handleDelete} className="text-xl text-red-500 cursor-pointer">
        <i className="fa-solid fa-trash"></i>
      </div>
    </section>
  );
};

export default DisplayWork;
