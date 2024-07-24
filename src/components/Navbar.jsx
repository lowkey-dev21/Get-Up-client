import Cookie from "js-cookie"
import { useNavigate} from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Navbar = ({ username }) => {
  const navigate = useNavigate()
  const logout = ()=>{
    Cookie.remove("token");
   navigate("/login")
  }
  return (
    <>
      <section className=" fixed  w-full flex justify-between px-3 h-[60px] items-center   backdrop-blur-lg ">
        <div className=" text-2xl font-semibold">
          Get <span className=" text-green-500"> Up </span>
        </div>

        <div>
          <p>{username}</p>
          <div onClick={logout} to={"signUp"}>
           Logout 
          </div>
        </div>
      </section>
    </>
  );
};

export default Navbar;
