import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.feed);
  const [loading, setLoading] = useState(true);

  const getFeed = async () => {
    try {
      const res = await axios.get("/api/feed", {
        withCredentials: true,
      });

      dispatch(addFeed(res.data));
    } catch (error) {
      console.error("Error fetching feed:", error);
    } finally {
      setLoading(false); // 👈 fetch is done
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (loading) {
    return;
  }

  if (!user) return;
  return (
    <div className="flex flex-col items-center my-6  md:my-3">
      <h1 className="text-lg sm:text-2xl font-semibold text-gray-300 mb-6 text-center">
        "ConnectUp – Find like-minded people and grow your network!"
      </h1>
      <UserCard user={user[0]} showFeedCheck={true} />
    </div>
  );
};

export default Feed;
