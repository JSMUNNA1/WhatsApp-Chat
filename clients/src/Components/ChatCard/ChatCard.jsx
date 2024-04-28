/* eslint-disable react/prop-types */
const ChatCard = ({ name, userImg }) => {
  return (
    <>
      <div className="flex  items-center justify-center py-2 group cursor-pointer">
        <div className="w-[20%]">
          <img className="h-14 w-14 rounded-full" src={userImg} alt="" />
        </div>
        <div className=" pl-5 w-[80%]">
          <div className=" flex  justify-between items-center">
            <p className="text-lg">{name}</p>
            <p className="text-sm">timestamp</p>
          </div>
          <div className=" flex justify-between items-center">
            <p>messages..</p>
            <div className="flex space-x-2 items-center">
              <p className="text-xs  px-2 py-1 text-white bg-green-500 rounded-full">
                5
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ChatCard;
