/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import SelectedMember from "./SelectedMember";
import ChatCard from "../ChatCard/ChatCard";
import NewGroup from "./NewGroup";
import { useDispatch, useSelector } from "react-redux";
import { searchUser } from "../../Redux/Auth/Action";

const Group = ({ setIsGroup }) => {
  const [newGroup, setNewGroup] = useState(false);
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const token = localStorage.getItem("token");
  const [groupMember, setGroupMember] = useState(new Set());
  const [query, setQuery] = useState("");
  const handleRemoveMember = (item) => {
    groupMember.delete(item);
    setGroupMember(groupMember);
  };
  const handleSearch = () => {
    dispatch(searchUser({ keyword: query, token }));
  };
  return (
    <>
      <div className="w-full h-full">
        {!newGroup && (
          <div>
            <div className="flex items-center space-x-10 bg-[#008069] text-white pt-16 px-10 pb-5">
              <BsArrowLeft className="cursor-pointer text-2xl font-bold "></BsArrowLeft>
              <p className="text-xl font-semibold">Add Group Participats</p>
            </div>
            <div className="relative bg-white py-4 px-3">
              <div className="flex space-x-2 flex-wrap space-y-1 ">
                {groupMember.size > 0 &&
                  Array.from(groupMember).map((item) => (
                    <SelectedMember
                      key={Math.random()}
                      handleRemoveMember={() => handleRemoveMember(item)}
                      member={item}
                    />
                  ))}
              </div>
              <input
                onChange={(e) => {
                  handleSearch(e.target.value);
                  setQuery(e.target.value);
                  //console.log(e.target.value);
                }}
                className=" outline-none border-b border-[#8888] p-2 w-[93%]"
                placeholder="search user"
                type="text"
                value={query}
              />
            </div>

            <div className="bg-white overflow-y-scroll h-[50.2vh]">
              {query &&
                auth.searchUser?.length > 0 &&
                auth.searchUser?.map((item) => (
                  <div
                    key={Math.random()}
                    onClick={() => {
                      groupMember.add(item);
                      setGroupMember(groupMember);
                      setQuery("");
                    }}
                  >
                    <ChatCard
                      name={item.fullName}
                      userImg={item.profilePicture}
                    ></ChatCard>
                  </div>
                ))}
            </div>
            <div className=" bottom-10 py-10 flex bg-slate-200 items-center justify-center">
              <div
                className=" bg-green-600 rounded-full p-4 cursor-pointer"
                onClick={() => setNewGroup(true)}
              >
                <BsArrowRight></BsArrowRight>
              </div>
            </div>
          </div>
        )}
        {newGroup && (
          <NewGroup setIsGroup={setIsGroup} groupMember={groupMember} />
        )}
      </div>
    </>
  );
};
export default Group;
