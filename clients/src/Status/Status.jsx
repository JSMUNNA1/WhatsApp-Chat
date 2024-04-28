import { AiOutlineClose } from "react-icons/ai";
import StatusUserCard from "./StatusUserCard";
import { useNavigate } from "react-router-dom";
const Status = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(-1);
  };
  return (
    <>
      <div>
        <div className="flex  items-center px-[14vh] py-[7vh]">
          {/* Left side Part */}
          <div className="left h-[85vh] bg-[#1e262c] lg:w-[30%] w-[50%] px-5">
            <div className="pt-5 h-[13%]">
              <StatusUserCard></StatusUserCard>
            </div>
            <hr />
            <div className=" overflow-y-scroll h-[86%] pt-2">
              {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((item) => (
                <StatusUserCard key={Math.random()}></StatusUserCard>
              ))}
            </div>
          </div>
          {/*  Right Side Part */}
          <div className="relative h-[85vh] l:w-[70%] w-[50%] bg-[#0b141a]">
            <AiOutlineClose
              onClick={handleNavigate}
              className="text-white cursor-pointer  absolute top-5 
          right-10 text-xl "
            ></AiOutlineClose>
          </div>
        </div>
      </div>
    </>
  );
};
export default Status;
