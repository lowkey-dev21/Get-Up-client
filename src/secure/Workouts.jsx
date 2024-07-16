import Cookie from "js-cookie";
import Navbar from "../components/Navbar";
import DisplayWork from "../components/DisplayWork.jsx";
import { useState, useEffect } from "react";
import axios from "../services/api.js";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput.jsx";
import Loading from "../components/Loading.jsx";
import { Toaster, toast } from "sonner";
import useSWR from 'swr'


const Workouts = () => {
  const [workouts, setWorkouts] = useState([]); // Initialize as null initially
  const navigate = useNavigate();
  const [space, setSpace] = useState(false);
  const [loading, setLoading] = useState(true);

 



  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const token = Cookie.get("token");
        if (!token) {
          navigate("/login");
          return; // Return early if token is missing
        }
        const res = await axios.get("/api/workouts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res.data);
        setWorkouts(res.data.workouts);
        setLoading(false);
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Failed to fetch workouts. Please try again later.");
        }
        navigate("/login");
      }
    };

    fetchWorkouts();
  }, [navigate]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="mt-0 w-full">
        <Navbar />
        <Toaster richColors expand={true} position="top-right" />
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
        <FormInput space={space} setSpace={setSpace} />
      </div>
    </>
  );
};

export default Workouts;
