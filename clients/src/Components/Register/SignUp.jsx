/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { currUser, register } from "../../Redux/Auth/Action";

const SignUp = () => {
  const { auth, otp } = useSelector((store) => store);
  const [openSnackbar, setSnackbar] = useState(false);
  const [inputData, setInputData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigater = useNavigate();

  const token = localStorage.getItem("token");
  useEffect(() => console.log(token, "SAOE"));
  useEffect(() => {
    if (token) {
      console.log(token, "t::oken");
      dispatch(currUser(token));
    } else {
      console.log("token is Empty");
    }
  }, [token]);

  //try
  useEffect(() => {
    console.log(otp?.otp?.email);
  });

  useEffect(() => {
    if (auth.reqUser != null && auth.reqUser.fullName) {
      navigater("/");
      console.log(auth.reqUser.fullName, ":::");
    } else {
      console.log("Empty the reqUser", auth.reqUser);
    }
  }, [auth.reqUser]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSnackbar(true);
    setInputData((prevInputData) => ({
      ...prevInputData,
      email: otp?.otp?.email, // Replace "new@email.com" with the new email value you want
    }));

    dispatch(register(inputData));
    console.log(inputData, "HandleSubmit");
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((values) => ({ ...values, [name]: value }));
  };
  return (
    <>
      <div>
        <div>
          <div className="flex flex-col justify-center  min-h-screen items-center">
            <div className="w-[30%] p-10 shadow-md bg-white">
              <form onSubmit={handleSubmit} className="space-x-5">
                <div>
                  <p className="mb-2">UserName</p>
                  <input
                    className=" py-2 px-3 ml-3 outline outline-green-600 w-full rounded-md border-1"
                    type="text"
                    placeholder="Enter UserName"
                    name="fullName"
                    onChange={(e) => handleChange(e)}
                    value={inputData.fullName}
                  />
                </div>
                <div>
                  <p className="mb-2">Email</p>
                  <input
                    className=" py-2 px-3 outline outline-green-600 w-full rounded-md border-1"
                    type="text"
                    placeholder=" Email"
                    name="email"
                    value={otp?.otp == null ? "invalid" : otp?.otp.email}
                    readOnly
                  />
                </div>
                <div>
                  <p className="mb-2">Password</p>
                  <input
                    className=" py-2 px-3 outline outline-green-600 w-full rounded-md border-1"
                    type="text"
                    placeholder="Enter password"
                    name="password"
                    onChange={(e) => handleChange(e)}
                    value={inputData.password}
                  />
                </div>
                <div className="flex">
                  <button
                    type="submit"
                    className=" w-full  flex justify-center items-center bg-green-600 border-none mt-2 p-2 rounded-sm text-white "
                  >
                    SignUp
                  </button>
                </div>
              </form>
              <div className="flex space-x-3 items-center mt-5">
                <p className="">Already have Account?</p>

                <p
                  onClick={() => navigater("/signin")}
                  className=" cursor-pointer bg-green-800 border-none rounded-sm text-white w-[100px] h-[40px] pl-8 pt-2.5"
                >
                  Login
                </p>
              </div>
            </div>
          </div>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={setSnackbar}
          >
            <Alert
              onClose={setSnackbar}
              severity="success"
              sx={{ width: "100%" }}
            >
              Your Account Successfully Created
            </Alert>
          </Snackbar>
        </div>
      </div>
    </>
  );
};
export default SignUp;
