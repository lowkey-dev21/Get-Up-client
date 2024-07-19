import Cookie from "js-cookie";
import Navbar from "../components/Navbar";
import DisplayWork from "../components/DisplayWork.jsx";
import { useState, useEffect } from "react";
import axios from "../services/api.js";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput.jsx";
import Loading from "../components/Loading.jsx";
import { Toaster, toast } from "sonner";
import useSWR, { mutate } from "swr";

const fetchWorkouts = async () => {
  try {
    const token = Cookie.get("token");
    if (!token) {
      throw new Error("No token found");
    }
    const res = await axios.get("/api/workouts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.workouts;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Failed to fetch workouts. Please try again later.");
    }
    throw error;
  }
};

const Workouts = () => {
  const navigate = useNavigate();
  const [space, setSpace] = useState(false);

  useEffect(() => {
    const token = Cookie.get("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const { data: workouts, error, isLoading } = useSWR("/api/workouts", fetchWorkouts);

  const handleAddWorkout = async (newWorkout) => {
    try {
      const token = Cookie.get("token");
      if (!token) {
        navigate("/login");
        return;
      }
      await axios.post("/api/workouts", newWorkout, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Invalidate and refetch
      mutate("/api/workouts");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to add workout. Please try again later.");
      }
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    navigate("/login");
    return null;
  }

  return (
    <>
      <div className="mt-0 w-full">
        <Navbar />
        <Toaster closeButton richColors expand={true} position="top-right" />
        <div className="pt-[4rem]">
          {workouts && (
            <>
              {workouts.length < 1 ? (
                <div className="h-full gap-2 w-full flex-col flex items-center justify-center min-h-[80vh]">
                  <p className="text-slate-600">Nothing is here</p>
                  <button
                    onClick={() => setSpace(true)}
                    className="bg-green-500 p-2 rounded-lg"
                  >
                    Add Workout
                  </button>
                </div>
              ) : (
                workouts.map((workout) => (
                  <DisplayWork
                    key={workout._id}
                    exercise={workout.exercise}
                    days={workout.days}
                    reps={workout.reps}
                    id={workout._id}
                  />
                ))
              )}
            </>
          )}
        </div>
        <FormInput space={space} setSpace={setSpace} handleAddWorkout={handleAddWorkout} />
      </div>
    </>
  );
};

export default Workouts;
