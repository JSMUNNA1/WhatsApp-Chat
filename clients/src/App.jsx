/* eslint-disable no-unused-vars */
import { Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage";
import Status from "./Status/Status";
import StatusViewer from "./Status/StatusViewer";
import SignIn from "./Components/Register/SignIn";
import SignUp from "./Components/Register/SignUp";
import Profile from "./Components/Profile/Profile";
import Otp from "./Components/Register/Otp";
import CheckOtp from "./Components/Register/CheckOtp";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/otp" element={<Otp></Otp>}></Route>
        <Route path="/checkOtp" element={<CheckOtp />}></Route>
        <Route path="/status" element={<Status></Status>}></Route>
        <Route path="/status/:userId" element={<StatusViewer></StatusViewer>} />
        <Route path="/signin" element={<SignIn></SignIn>} />
        <Route path="/signup" element={<SignUp></SignUp>} />
        <Route path="/profile" element={<Profile></Profile>} />
      </Routes>
    </>
  );
}

export default App;
