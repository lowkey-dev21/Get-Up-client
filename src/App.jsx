import { BrowserRouter, Routes, Route } from "react-router-dom";
import Workouts from "./secure/Workouts";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Workouts />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
