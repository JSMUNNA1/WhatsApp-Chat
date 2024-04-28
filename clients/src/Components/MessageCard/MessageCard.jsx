const MessageCard = ({ isReqUserMessage, contentMessage }) => {
  return (
    <>
      <div
        className={`py-2 px-2 rounded-md max-w[50%] ${
          isReqUserMessage ? "self-start bg-white" : "self-end bg-green-300"
        }`}
      >
        <p>{contentMessage}</p>
      </div>
    </>
  );
};
export default MessageCard;
