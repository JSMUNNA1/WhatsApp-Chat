/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { BsArrowLeft, BsCheck2 } from "react-icons/bs";
import { CircularProgress } from "@mui/material";
import { useState } from "react";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { createGroupChat } from "../../Redux/Auth/Chat/ActionChat";

const NewGroup = ({ groupMember, setIsGroup }) => {
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupImage, setGroupImage] = useState("");
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { auth } = useSelector((state) => state);

  const uploadToCloudnary = (pics) => {
    setIsImageUploading(true);
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
        setGroupImage(data.url.toString());
        setIsImageUploading(false);
      });
  };

  const handleCreateGroup = () => {
    let userIds = [];
    console.log("GroupMemberData:=", groupMember);
    for (let user of groupMember) {
      userIds.push(user.id);
    }
    const group = {
      userIds: userIds,
      ChatName: groupName,
      ChatImage: groupImage,
    };
    const data = {
      group,
      token,
    };
    dispatch(createGroupChat(data));
    setIsGroup(false);
  };

  return (
    <>
      <div className=" w-full h-full ">
        <div
          className="flex items-center space-x-10 bg-[#008069]
     text-white pt-16 px-10 pb-5"
        >
          <BsArrowLeft
            className="text-2xl font-bold cursor-pointer
          "
          ></BsArrowLeft>
          <p className="text-xl font-semibold">New Group</p>
        </div>
        <div className="flex flex-col justify-center  items-center my-12">
          <label htmlFor="imgInput" className="relative">
            <img
              className="rounded-full  border-black-300 "
              src={
                groupImage ||
                "https://cdn.pixabay.com/photo/2023/10/27/18/54/ai-generated-8346024_1280.jpg"
              }
              alt=""
            />
            {isImageUploading && (
              <CircularProgress className=" absolute top-[5rem] left-[6rem]" />
            )}
          </label>
          <input
            type="file"
            id="imgInput"
            className="hidden"
            onChange={(e) => uploadToCloudnary(e.target.files[0])}
          />
        </div>
        <div className="w-full flex justify-between items-center py-2 px-5">
          <input
            className="w-full outline-none border-b-2 
           border-green-700 px-2 bg-transparent"
            placeholder="Group subject "
            value={groupName}
            type="text"
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>
        {groupName && (
          <div className="py-10 bg-slate-200 flex items-center justify-center">
            <Button onClick={handleCreateGroup}>
              <div className="bg-[#0c977d] rounded-full p-4">
                <BsCheck2 className=" text-white font-bold text-3xl"></BsCheck2>
              </div>
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
export default NewGroup;
