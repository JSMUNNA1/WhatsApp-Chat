/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { currUser, signin } from "../../Redux/Auth/Action";

const SignIn = () => {
  const [openSnackbar, setSnackbar] = useState(false);
  const navigater = useNavigate();
  const [inputData, setInputData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const token = localStorage.getItem("token");
  const handleSubmit = (e) => {
    e.preventDefault();
    setSnackbar(true);
    dispatch(signin(inputData));
  };
  const hadleChange = (e) => {
    const { name, value } = e.target;
    setInputData((values) => ({ ...values, [name]: value }));
  };
  const handleSnackBarClose = () => {
    setSnackbar(false);
  };
  useEffect(() => {
    if (token) {
      console.log(token, "t::oken");
      dispatch(currUser(token));
    } else {
      console.log("token is Empty");
    }
  }, [token]);

  useEffect(() => {
    if (auth.reqUser != null && auth.reqUser.fullName) {
      navigater("/");
      console.log(auth.reqUser.fullName, ":::");
    } else {
      console.log("Empty the reqUser", auth.reqUser);
    }
  }, [auth.reqUser]);

  return (
    <>
      <div>
        <div className="flex justify-center h-screen items-center">
          <div className="w-[30%] p-10 shadow-md bg-white">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <p className="mb-2">Email</p>
                <input
                  type="text"
                  value={inputData.email}
                  placeholder="Enter your Email"
                  onChange={hadleChange}
                  className="py-2 outline outline-green-600
                          w-full rounded-md border "
                  name="email"
                />
              </div>
              <div>
                <p className="mb-2">Password</p>
                <input
                  type="text"
                  name="password"
                  value={inputData.password}
                  placeholder="Enter your Password"
                  onChange={hadleChange}
                  className="py-2 outline outline-green-600
                          w-full rounded-md border "
                />
              </div>
              <div className="flex">
                <button
                  type="submit"
                  className=" w-full  flex justify-center items-center bg-green-600 border-none p-2 rounded-sm text-white "
                >
                  SignIn
                </button>
              </div>
            </form>
            <div className="flex space-x-3 items-center mt-5">
              <p className="m-0">Create New Account</p>
              <button
                className="bg-green-400 border-none p-2 rounded-sm "
                onClick={() => navigater("/otp")}
              >
                {" "}
                signUp
              </button>
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
            Login Successfully Date
          </Alert>
        </Snackbar>
      </div>
    </>
  );
};
export default SignIn;
