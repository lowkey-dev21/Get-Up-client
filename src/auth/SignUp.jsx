import { Link } from "react-router-dom";
import validator from "validator";
import { useState, useEffect } from "react";
import Cookie from "js-cookie";
import axios from "../services/api";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [redFlag, setRedFlag] = useState(true);
  const [redFlag2, setRedFlag2] = useState(true);
  const [redFlag3, setRedFlag3] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = { email, password, username };

    try {
      const res = await axios.post("/api/auth/signUp", user);
      const token = res.data.token;
      const username = res.data.username;
      Cookie.set("token", token);
      Cookie.set("username", username);

      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setUsername("");
      toast.success("Sign up successful");
      setTimeout(() => {
        navigate("/login");
      }, 5000);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  useEffect(() => {
    setRedFlag(password !== confirmPassword && confirmPassword !== "");
    setRedFlag2(!validator.isEmail(email) && email !== "");
    setRedFlag3(
      password !== "" &&
        !validator.isStrongPassword(password, {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        })
    );
  }, [password, confirmPassword, email]);

  return (
    <>
      <section className="w-full h-full items-center fixed flex justify-center">
        <div className="w-[90%] gap-3 py-6 flex flex-col justify-center items-center rounded-xl shadow-xl bg-white">
          <Toaster richColors expand={true} position="top-right" />
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col p-4 justify-center"
          >
            <label className="w-full text-2xl text-center">Sign Up</label>

            <input
              type="text"
              value={username}
              placeholder="Full Name "
              onChange={(e) => setUsername(e.target.value)}
              className={`${
                redFlag2 ? "focus:border-red-500" : "focus:border-green-500"
              } w-full outline-none border-[1px] p-3 mt-5 rounded-lg text-xl`}
            />

            {/* <p
              className={`${
                redFlag2 ? "flex " : "hidden"
              }  text-red-500 text-xs `}
            >
              Invalid Email
            </p> */}

            <input
              type="text"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className={`${
                redFlag2 ? "focus:border-red-500" : "focus:border-green-500"
              } w-full outline-none border-[1px] p-3 mt-5 rounded-lg text-xl`}
            />

            <p
              className={`${
                redFlag2 ? "flex " : "hidden"
              }  text-red-500 text-xs `}
            >
              Invalid Email
            </p>

            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="focus:border-green-500 w-full outline-none border-[1px] p-3 mt-5 rounded-lg text-xl"
            />
            <p
              className={`${
                redFlag3 ? "flex " : "hidden"
              }   text-xs text-red-500  `}
            >
              Password must be at least 8 characters long and consist of at
              least one special character (!%@#), one number, and one capital
              letter.
            </p>

            <input
              type="password"
              value={confirmPassword}
              autoComplete="false"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`${
                redFlag ? "focus:border-red-500" : "focus:border-green-500"
              } w-full outline-none border-[1px] p-3 mt-5 rounded-lg text-xl`}
            />
            <p
              className={`${
                redFlag ? "flex " : "hidden"
              }  text-red-500 text-xs `}
            >
              Passwords do not match
            </p>

            <button
              type="submit"
              className={`w-full text-x p-3 rounded-lg mt-3 ${
                redFlag || redFlag2 || redFlag3
                  ? "bg-[#a9aeb6] cursor-not-allowed"
                  : "bg-[#22C55E] cursor-pointer"
              }`}
              disabled={redFlag && redFlag2 && redFlag3}
            >
              Sign Up
            </button>
          </form>

          <p>
            Have an account?{" "}
            <Link to={"/login"} className="text-green-500">
              Login
            </Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default SignUp;
