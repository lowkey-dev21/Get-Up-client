import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Navbar = ({ username }) => {
  return (
    <>
      <section className=" fixed  w-full flex justify-between px-3 h-[60px] items-center   backdrop-blur-lg ">
        <div className=" text-2xl font-semibold">
          Get <span className=" text-green-500"> Up </span>
        </div>

        <div>
          <p>{username}</p>
          <Link to={"signUp"}>
            <img className=" h-[35px] w-[35px] bg-slate-900 rounded-full " />
          </Link>
        </div>
      </section>
    </>
  );
};

export default Navbar;
