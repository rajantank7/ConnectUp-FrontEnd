import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const [loading, setLoading] = useState(true);

  const fecthConnections = async () => {
    try {
      const res = await axios.get(
        "http://192.168.18.131:3000/user/connections",
        {
          withCredentials: true,
        }
      );
      dispatch(addConnections(res?.data?.connections));
    } catch (error) {
      console.error("Error fetching connections:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fecthConnections();
  }, []);

  if (loading) {
    return (
      <div className="text-center my-10 font-bold text-xl text-gray-400">
        Loading connections...
      </div>
    );
  }

  if (!connections) return;

  if (connections.length === 0)
    return (
      <div className="text-center my-10 font-bold text-2xl">
        No Connections Found
      </div>
    );

  return (
    <div className="my-10 px-4">
      <h1 className="text-center text-gray-300 text-2xl sm:text-3xl font-bold my-4">
        Connections
      </h1>
      <div className="flex flex-col gap-6 items-center">
        {connections.map((connection) => {
          const { firstName, lastName, photoUrl, age, gender, about } =
            connection || {};

          return (
            <div
              key={connection._id}
              className="bg-base-300 rounded-xl shadow-md w-full max-w-md sm:max-w-2xl p-4 hover:scale-[1.01] transition-transform duration-200"
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                <img
                  src={photoUrl}
                  alt={firstName}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover flex-shrink-0 "
                />

                <div className="flex flex-col sm:flex-grow justify-center w-full">
                  <h2 className="text-lg sm:text-xl font-bold text-white text-center sm:text-left">
                    {firstName + " " + lastName}
                  </h2>
                  {age && gender && (
                    <p className="text-gray-400 text-sm sm:text-base text-center sm:text-left">
                      {age}, {gender}
                    </p>
                  )}
                  <p className="text-gray-400 text-sm sm:text-base mt-2 text-center sm:text-left line-clamp-3">
                    {about}
                  </p>
                </div>
                <div className="mt-4 flex justify-center sm:justify-end">
                  <button className="btn btn-primary text-sm sm:text-base  px-6">
                    Chat
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
