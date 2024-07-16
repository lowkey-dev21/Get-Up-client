// eslint-disable-next-line react/prop-types
import axios from "../services/api";
import Cookie from "js-cookie"
import { Toaster, toast } from "sonner"; // Assuming `toast` is properly imported from "sonner"

// eslint-disable-next-line react/prop-types
const DisplayWork = ({ exercise, days, reps, id }) => {
  const handleSubmit = async () => {
    try {
      const token = Cookie.get("token");
      console.log(id, "workout id");
      await axios.delete(`/api/workouts?workoutId=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Workout deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete workout.");
    }
  };
  return (
    <>
      <section className=" p-3 gap-1 shadow-xl justify-between bg-white mb-3 mx-4 rounded-2xl flex ">
      <Toaster richColors expand={true} position="top-right" />
        <div className=" flex flex-col ">
          <p className=" text-xl">{exercise}</p>
          <p className=" text-red-400 ">{days}</p>
          <p>Count: {reps}</p>
        </div>

        <div onClick={handleSubmit} className=" text-xl text-red-500">
          <i className="fa-solid fa-trash"></i>
        </div>
      </section>
    </>
  );
};

export default DisplayWork;
