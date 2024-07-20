import { useState } from "react";
import { Link } from "react-router-dom";
import Cookie from "js-cookie";
import axios from "../services/api";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";
import LoadBtn from "../components/LoadBtn.jsx";
import workout from "../assets/workout.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = { email, password };
      const res = await axios.post("/api/auth/login", user);
      const token = res.data.token;
      Cookie.set("token", token);
      setLoad(true);
      setTimeout(() => {
        navigate("/");
      }, 5000);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  return (
    <>
      <section className=" w-full h-full items-center fixed flex-col  mt-[3rem]    flex ">
        <Toaster richColors expand={true} position="top-right" />
        <p className=" text-2xl  font-semibold  "  > Get <span className=" text-green-500 " >Up</span> </p>
        <img src={workout} className=" max-w-[73%]" alt="" />
        <div className=" w-[90%] gap-3  py-6  flex flex-col justify-center items-center rounded-xl shadow-xl bg-white ">
          <form
            onSubmit={handleSubmit}
            className=" w-full flex flex-col p-4  justify-center  "
          >
         

            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className=" focus:border-green-500 w-full outline-none border-[1px] p-3 mt-5 rounded-lg text-xl "
            />
            <p className=" hidden">Message</p>

            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className=" focus:border-green-500 w-full outline-none border-[1px] p-3 mt-5 rounded-lg text-xl "
            />
            <p className="hidden">Message</p>

            <button className=" text-left  mt-3 text-green-500 ">
              Forgot Password ?
            </button>

            <button className=" w-full flex justify-center items-center text-xl bg-green-500 p-3 rounded-lg mt-2 ">
              <div className={` ${load ? "flex" : "hidden"} `}>
                <LoadBtn />
              </div>
              <span className={`${load ? " hidden" : "flex"}`}>Login</span>
            </button>
          </form>

          <p>
            <span>Don`t have account? </span>
            <Link to={"/signUp"} className=" text-green-500 ">
              Register
            </Link>
          </p>
        </div>
      </section>
    </>
  );
};
export default Login;
