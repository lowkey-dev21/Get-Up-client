import { useState } from "react";
import Cookie from "js-cookie";
import { toast } from "sonner";
import { mutate } from "swr";
import axios from "../services/api.js";

// eslint-disable-next-line react/prop-types
const FormInput = ({ space, setSpace }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [exercise, setExercise] = useState("");
  const [days, setDays] = useState("");
  const [reps, setReps] = useState("");

  const handleAddWorkout = async (workout) => {
    const token = Cookie.get("token");
    try {
      await axios.post("/api/workouts", workout, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      mutate("/api/workouts"); // Revalidate the SWR cache
      toast.success("Workout added successfully!");
    } catch (error) {
      console.error("Error submitting workout:", error);
      toast.error("Failed to add workout. Please try again later.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = { exercise, days, reps };
    await handleAddWorkout(workout);
    setExercise("");
    setDays("");
    setReps("");
    setSpace(false);
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setSpace(false);
    }, 500);
  };

  return (
    <>
      <button
        onClick={() => setSpace((prev) => !prev)}
        className={`${
          space ? "hidden" : "flex"
        } h-[50px] z-[100] w-[50px] bg-green-500 items-center justify-center rounded-full fixed bottom-[40px] right-[20px]`}
      >
        <i className="fa-solid fa-dumbbell"></i>
      </button>

      <div
        className={`element ${space ? "flex" : "hidden"} ${
          isClosing ? "slide-down" : ""
        } w-full h-[250px] bg-white bottom-0 fixed`}
      >
        <form
          className="flex flex-col w-full px-2 gap-1 mt-3"
          onSubmit={handleSubmit}
        >
          <label className="text-xl flex justify-between p-3 text-slate-700">
            Add Workout
            <button onClick={handleClose} className="">
              <i className="fa-solid text-2xl fa-xmark"></i>
            </button>
          </label>

          <input
            type="text"
            value={exercise}
            onChange={(e) => setExercise(e.target.value)}
            className="text-3xl w-full pl-1 outline-none caret-green-500"
            placeholder="Title"
          />
          <input
            type="text"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            className="text-xl w-full pl-1 outline-none caret-red-500"
            placeholder="Days"
          />
          <input
            type="text"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            className="text-xl w-full pl-1 outline-none"
            placeholder="Count"
          />

          <button
            type="submit"
            className={`h-[50px] z-[300] w-[50px] bg-green-500 items-center justify-center rounded-full fixed bottom-[40px] right-[20px]`}
          >
            <i className="fa-solid fa-dumbbell"></i>
          </button>
        </form>
      </div>
    </>
  );
};

export default FormInput;
