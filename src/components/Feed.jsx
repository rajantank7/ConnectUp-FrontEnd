import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.feed);
 

  const getFeed = async () => {
    try {
      const res = await axios.get("http://192.168.18.131:3000/feed", {
        withCredentials: true,
      });
      
      dispatch(addFeed(res.data));
    } catch (error) {
      console.error("Error fetching feed:", error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!user) return;
  return (
    <div className="flex justify-center my-9  md:my-6">
      <UserCard user={user[0]} showFeedCheck={true} />
    </div>
  );
};

export default Feed;
