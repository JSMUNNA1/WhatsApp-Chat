import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkOtp } from "../../Redux/Otp/OtpAction";
import { useNavigate } from "react-router-dom";
const CheckOtp = () => {
  const [inputData, setInputData] = useState({ otp: "" });
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const { otp } = useSelector((state) => state);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputData);
    dispatch(checkOtp({ otp: inputData }));

    if (!otp?.otp?.status) {
      navigator("/signup");
    } else {
      alert("Invaild Otp or TimeOut");
    }
  };
  const handleChange = (e) => {
    setInputData({ otp: e.target.value });
    console.log(inputData);
  };
  return (
    <>
      <div className="flex  justify-center mt-[250px] items-center ">
        <div className=" w-[30%] p-10 shadow-md bg-white">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <p className="mb-2">
                Enter Otp:(Otp valid for only for 5 minutes)
              </p>
              <input
                type="number"
                value={inputData.otp}
                onChange={handleChange}
                placeholder="Enter otp"
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
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default CheckOtp;
