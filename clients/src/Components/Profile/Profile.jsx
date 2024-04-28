/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { BsArrowLeft, BsCheck2, BsPencil } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../Redux/Auth/Action";
import Value from "autoprefixer/lib/value";
import { data } from "autoprefixer";
// import { useNavigate } from "react-router-dom";
const Profile = ({ handleCoseOpenProfile }) => {
  const [flag, setFlag] = useState(false);
  // const navigate = useNavigate();
  const [userName, setUserName] = useState(null);
  const [tempPicture, setTempPicture] = useState(null);
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();

  const handleFlage = () => {
    setFlag(true);
  };
  const handleCheckClick = () => {
    setFlag(false);
    const data = {
      // id:auth.reqUser?.id,
      token: localStorage.getItem("token"),
      fullName: userName,
    };

    dispatch(updateUser(data));
  };

  const handleChage = (e) => {
    setUserName(e.target.value);
  };
  const uploadToCloudnary = (pics) => {
    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", "whatsapp");
    data.append("clound_name", "di4o7mdtg");
    fetch("https://api.cloudinary.com/v1_1/di4o7mdtg/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setTempPicture(data.url.toString());
        //  setMessage("profile image Updated successfully")
        //  setOpen(true)
        console.log("imgurl", data);

        const dataa = {
          token: localStorage.getItem("token"),
          data: { profilePicture: data.url.toString() },
        };
        dispatch(updateUser(dataa));
      });
  };
  const handleUpdateName = (e) => {
    const dataa = {
      // id:auth.reqUser?.id,
      token: localStorage.getItem("token"),
      data: { fullName: e.target.value },
    };
    if (e.target.key === "Enter") {
      dispatch(updateUser(dataa));
    }
  };
  return (
    <>
      <div className=" w-full h-full">
        <div className="flex items-center space-x-10 bg-[#006869] text-white pt-16 px-10 pb-5 ">
          <BsArrowLeft
            className=" cursor-pointer text-2xl font-bold"
            onClick={handleCoseOpenProfile}
          ></BsArrowLeft>
          <p className="cursor-poninter font-semibold"> Profile</p>
        </div>
        {/* updted profile pic Section */}
        <div className="flex flex-col  justify-center items-center my-12 ">
          <label htmlFor="imgInput">
            <img
              className=" rounded-full w-[15vh] h-[15vh]"
              src={
                auth.reqUser?.profilePicture ||
                "https://cdn.pixabay.com/photo/2023/09/07/14/26/cat-8239223_1280.png"
              }
              alt=""
            />
          </label>
          <input
            onChange={(e) => uploadToCloudnary(e.target.files[0])}
            type="file"
            id="imgInput"
            className="hidden"
          />
        </div>
        {/* nane Section */}
        <div className="bg-white px-3">
          <p className="py-3">Your name</p>
          {!flag && (
            <div className="flex  justify-between items-center">
              <p className="py-3">{userName || "userName"}</p>
              <BsPencil
                onClick={handleFlage}
                className=" cursor-pointer"
              ></BsPencil>
            </div>
          )}
          {flag && (
            <div className="flex justify-between items-center py-3">
              <input
                onKeyPress={handleUpdateName}
                //  onClick={handleUpdateName}
                onChange={handleChage}
                className="w-[80%] outline-none border-b-2 border-blue-700 px-2 py-2"
                type="text"
                placeholder="EnterYourName"
              />
              <BsCheck2
                onClick={handleCheckClick}
                className=" text-2xl  cursor-pointer  "
              />
            </div>
          )}
        </div>
        <div className="px-3 my-5 ">
          <p className="py-10">
            This is not userName, this name will be visible to your whatapp
            content
          </p>
        </div>
      </div>
    </>
  );
};
export default Profile;
