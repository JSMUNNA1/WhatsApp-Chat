/* eslint-disable no-unused-vars */
import "./init";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import { AiOutlineSearch } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import Menu from "@mui/material/Menu";
import { useDispatch, useSelector } from "react-redux";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import {
  BsEmojiSmile,
  BsFilter,
  BsMicFill,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { TbCircleDashed } from "react-icons/tb";
import ChatCard from "./ChatCard/ChatCard";
import { useEffect, useState } from "react";
import whatsappRightImg from "../Images/whatsapright.png";
import MessageCard from "./MessageCard/MessageCard";
import { ImAttachment } from "react-icons/im";
import styles from "./HomePage.module.css";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile/Profile";
import { FaS } from "react-icons/fa6";
import Group from "./Group/Group";
import { LogOutAction, currUser, searchUser } from "../Redux/Auth/Action";
import { createChat, getUserChat } from "../Redux/Auth/Chat/ActionChat";
import {
  createmessage,
  getAllmessage,
} from "../Redux/Auth/message/ActionMessage";
import { BASE_API_URL } from "./config/api";
const HomePage = () => {
  const [querys, setQuerys] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [content, setContent] = useState("");
  const [isPrfile, setIsProfile] = useState(false);
  const [isGroup, setIsGroup] = useState(false);
  const navigate = useNavigate();
  const { auth, chat, message } = useSelector((store) => store);
  //webSocket Releted Coding
  const [isconnected, setIsConnected] = useState();
  const [stompClient, setStompClient] = useState(false);
  const [messages, setMessages] = useState([]);
  const getCookie = (name) => {
    const value = `;${document.cookie}`;
    const parts = value.split(`;${name}=`);

    if (parts.length === 2) {
      return parts.pop().split(";").shift();
    }
  };

  const onError = (error) => {
    console.log("in On Error", error);
  };
  const onMessage = (message) => {
    console.log("in On Message", message);
  };
  const onConnect = (frame) => {
    setIsConnected(true);
  };
  const onMessageRevice = (payload) => {
    console.log("receive Message", JSON.parse(payload.body));
    const recieveMessage = JSON.parse(payload.body);
    setMessages([...messages, recieveMessage]);
  };
  useEffect(() => {
    if (message.newMessages && stompClient) {
      setMessages(...messages, message.newMessages);
      stompClient?.send(
        "/app/message",
        {},
        JSON.stringify(message.newMessages)
      );
    }
  }, [message.newMessages]);

  useEffect(() => {
    setMessages(message.messages);
  }, [message.messages]);

  useEffect(() => {
    if (isconnected && stompClient && auth.reqUser && currentChat) {
      const subscription = stompClient.subscribe(
        "/group/" + currentChat.id.toString,
        onMessageRevice
      );
      return () => {
        subscription.unsubscribe();
      };
    }
  });

  useEffect(() => {
    connect();
  }, []);

  const connect = () => {
    const sock = new SockJS("http://localhost:5050/ws");
    const temp = over(sock);
    setStompClient(temp);

    const headers = {
      Authorization: `Bearer ${token}`,
      "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
    };
    temp.connect(headers, onConnect, onError);
  };

  //End WebSocket

  const handleClickOnChatCard = (item, userId) => {
    // setCurrentChat(item);
    console.log(userId);
    dispatch(createChat({ token, userId }));
    setQuerys("");
  };
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const handleSearch = (keyword) => {
    dispatch(searchUser({ keyword, token }));
  };
  useEffect(() => {
    dispatch(getUserChat({ token }));
  }, [chat.createdChat, chat.createdGroup]);
  const handleCreateNewMessage = () => {
    dispatch(
      createmessage({
        token: token,
        data: { chatId: currentChat.id, content: content },
      })
    );
  };
  useEffect(() => {
    if (currentChat?.id)
      dispatch(getAllmessage({ chatId: currentChat.id, token: token }));
    console.log(message.messages);
  }, [currentChat, message.newMessages]);

  const handleNavigate = () => {
    //  navigate('/profile')
    setIsProfile(true);
  };
  const handleCoseOpenProfile = () => {
    setIsProfile(false);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleGroup = () => {
    setIsGroup(true);
  };

  const handleLogOut = () => {
    auth.reqUser = null;

    dispatch(LogOutAction());
    navigate("/signup");
  };
  useEffect(() => {
    if (token) dispatch(currUser(token));
  }, [token]);
  useEffect(() => {
    if (!auth.reqUser) {
      navigate("/otp");
    }
  }, [auth.reqUser]);

  const handleCurrentChat = (item) => {
    setCurrentChat(item);
    console.log(currentChat, "currentChat");
  };

  return (
    <>
      <div className="relative bg-slate-500">
        <div className=" absolute top-0  py-14 bg-[#00a884] w-[100%] "></div>
        <div className="flex bg-[#f0f2f5] h-[90vh] absolute top-[5vh] w-[98%] left-6">
          <div className="left  w-[30%] bg-[#e8e9ec] h-full ">
            {/* {profile} */}
            {isGroup && <Group setIsGroup={setIsGroup}></Group>}
            {isPrfile && (
              <div className="w-full h-full">
                <Profile
                  handleCoseOpenProfile={handleCoseOpenProfile}
                ></Profile>
              </div>
            )}
            {/* Home */}
            {!isPrfile && !isGroup && (
              <div className=" w-full ">
                <div className="flex justify-between items-center p-3">
                  <div
                    onClick={handleNavigate}
                    className=" cursor-pointer flex items-center space-x-3 "
                  >
                    <img
                      className="rounded-full cursor-pointer w-10 h-10"
                      src={
                        auth.reqUser?.profilePicture ||
                        "https://cdn.pixabay.com/photo/2023/09/07/14/26/cat-8239223_1280.png"
                      }
                      alt=""
                    />

                    <p>{auth.reqUser?.fullName}</p>
                  </div>

                  <div className="space-x-3 text-2xl flex">
                    <TbCircleDashed
                      className=" cursor-pointer"
                      onClick={() => navigate("/status")}
                    ></TbCircleDashed>
                    <BiCommentDetail></BiCommentDetail>
                    <div>
                      <BsThreeDotsVertical
                        id="basic-button"
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClick}
                      ></BsThreeDotsVertical>

                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleGroup}>CreateGorup</MenuItem>
                        <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                      </Menu>
                    </div>
                  </div>
                </div>

                <div className="relative flex justify-center items-center bg-white py-4 px-3">
                  <input
                    className="border-none outline-none
                bg-slate-200 rounded-md w-[93%] pl-9 py-2 "
                    type="text"
                    placeholder="Search or Start new Chat "
                    onChange={(e) => {
                      setQuerys(e.target.value);
                      handleSearch(e.target.value);
                    }}
                    value={querys}
                  />
                  <AiOutlineSearch className="left-5 top-7 absolute"></AiOutlineSearch>
                  <div className="">
                    <BsFilter className="ml-4 text-3xl"></BsFilter>
                  </div>
                </div>
                {/* allUser */}
                <div className="bg-white  overflow-scroll h-[72vh]  px-3">
                  {querys &&
                    auth.searchUser?.length > 0 &&
                    auth.searchUser?.map((item) => (
                      <div
                        onClick={() => handleClickOnChatCard(item, item.id)}
                        key={Math.random()}
                      >
                        <hr />
                        <ChatCard
                          name={item.fullName}
                          userImg={
                            item.profilePicture ||
                            "https://cdn.pixabay.com/photo/2016/08/31/11/54/icon-1633249_960_720.png"
                          }
                        ></ChatCard>
                      </div>
                    ))}

                  {chat.chats.length > 0 &&
                    !querys &&
                    chat.chats?.map((item) => (
                      <div
                        onClick={() => handleCurrentChat(item)}
                        key={Math.random()}
                      >
                        <hr />
                        {item.group ? (
                          <ChatCard
                            name={item.chatName}
                            userImg={
                              item.chatImage ||
                              "https://cdn.pixabay.com/photo/2017/11/10/05/46/group-2935521_1280.png"
                            }
                          ></ChatCard>
                        ) : (
                          <ChatCard
                            isChat={true}
                            name={
                              auth.reqUser?.id !== item.users[0]?.id
                                ? item.users[0].fullName
                                : item.users[1].fullName
                            }
                            userImg={
                              auth.reqUser?.id !== item.users[0]?.id
                                ? item.users[0].profilePicture ||
                                  "https://cdn.pixabay.com/photo/2016/08/31/11/54/icon-1633249_960_720.png"
                                : item.users[1].profilePicture ||
                                  "https://cdn.pixabay.com/photo/2016/08/31/11/54/icon-1633249_960_720.png"
                            }
                          ></ChatCard>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
          {/* default watsapp page */}

          {!currentChat && (
            <div className="right">
              <div className="w-[100%] flex flex-col justify-center items-center">
                <div>
                  <img className="" src={whatsappRightImg} alt="" />
                </div>
              </div>
            </div>
          )}
          {/* message Part */}
          {/* <ChatCard
                            name={item.chatName}
                            userImg={
                              item.chatImage ||
                              "https://cdn.pixabay.com/photo/2017/11/10/05/46/group-2935521_1280.png"
                            }
                          ></ChatCard> */}

          {currentChat && (
            <div className="w-[70%] relative">
              <div className=" w-full   absolute top-0  bg-[#f0f2f5]">
                <div className="  flex justify-between">
                  <div className="py-3 space-x-4 flex items-center px-3 ">
                    <img
                      className="w-10 h-10 rounded-full"
                      src={
                        currentChat.group
                          ? currentChat.chatImage
                          : auth.reqUser?.id !== currentChat.users[0]?.id
                          ? currentChat.users[0].profilePicture ||
                            "https://cdn.pixabay.com/photo/2016/08/31/11/54/icon-1633249_960_720.png"
                          : currentChat.users[1].profilePicture ||
                            "https://cdn.pixabay.com/photo/2016/08/31/11/54/icon-1633249_960_720.png"
                      }
                    />
                    <p>
                      {currentChat.group
                        ? currentChat.chatName
                        : auth.reqUser?.id == currentChat.users[0].id
                        ? currentChat.users[1].fullName
                        : currentChat.users[0].fullName}
                    </p>
                  </div>
                  <div className="py-3 space-x-4 flex items-center px-3">
                    <AiOutlineSearch></AiOutlineSearch>
                    <BsThreeDotsVertical></BsThreeDotsVertical>
                  </div>
                </div>
              </div>
              {/* message Section  */}
              <div className="px-10 h-[85vh] overflow-y-scroll bg-blue-100">
                <div className=" space-y-1 flex flex-col justify-center border mt-20 py-2">
                  {messages.length > 0 &&
                    messages?.map((item, i) => (
                      <MessageCard
                        key={Math.random()}
                        isReqUserMessage={item.user.id !== auth.reqUser.id}
                        contentMessage={item.content}
                      ></MessageCard>
                    ))}
                </div>
              </div>
              {/* footer Part */}
              <div
                className="footer bg-[#f0f2f5] absolute  bottom-0 w-full py-3
             text-2xl "
              >
                <div className="flex justify-between items-center px-5">
                  <BsEmojiSmile className=" cursor-pointer "></BsEmojiSmile>
                  <ImAttachment className="cursor-pointer  "></ImAttachment>

                  <input
                    className="py-2 outline-none border-none bg-white pl-4  rounded-md w-[85%]"
                    type="text"
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Type message"
                    value={content}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleCreateNewMessage();
                        setContent("");
                      }
                    }}
                  />
                  <BsMicFill></BsMicFill>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default HomePage;
