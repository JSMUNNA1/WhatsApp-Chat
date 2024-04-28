/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { otpGenerated } from "../../Redux/Otp/OtpAction";

const Otp = () => {
  const [inputData, setInputData] = useState({ email: "" });
  const dispatch = useDispatch();
  const navigater = useNavigate();
  const { otp } = useSelector((state) => state);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputData);
    dispatch(otpGenerated({ email: inputData }));

    if (otp?.email?.status || otp?.email == null) {
      navigater("/checkOtp");
    } else if (otp?.email?.message === "Already used this Email") {
      alert("This email is Already Using..");
    } else {
      alert("Something Error..");
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({ email: e.target.value });

    console.log(inputData);
  };
  return (
    <>
      <div className="flex  justify-center mt-[250px] items-center ">
        <div className=" w-[30%] p-10 shadow-md bg-white">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <p className="mb-2">Email</p>
              <input
                type="email"
                value={inputData.email}
                onChange={handleChange}
                placeholder="Enter your Email"
                className="py-2 outline outline-green-600
                          w-full rounded-md border "
                name="email"
              />
            </div>

            <div className="flex">
              <button
                type="submit"
                className=" w-full  flex justify-center items-center bg-green-600 border-none p-2 rounded-sm text-white "
              >
                submit
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
    </>
  );
};

export default Otp;
