import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({ user, showFeedCheck = false }) => {
  const { _id, firstName, lastName, photoUrl, about, age, gender } = user || {};
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const handleSendRequest = async (status) => {
    try {
      const res = await axios.post(
        "/api/request/send/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(_id));
    } catch (error) {
      console.error("Error fetching connections:", error);
    }
  };

  if (showFeedCheck && (!feed || feed.length <= 0)) {
    return (
      <h1 className="text-center my-5 font-bold text-2xl">
        No New Users found
      </h1>
    );
  }

  return (
    <div className="card bg-base-300 w-80 md:w-90 shadow-sm ">
      <figure>
        <img src={photoUrl} alt="Shoes" className="w-90 h-70" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + " " + gender}</p>}
        <p>{about}</p>
        <div className="card-actions justify-center my-3">
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest("ignore")}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleSendRequest("interested")}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
