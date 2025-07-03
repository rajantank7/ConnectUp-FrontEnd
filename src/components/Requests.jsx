import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "../utils/requestsslice";
import { useEffect, useState } from "react";
import axios from "axios";

const Requests = () => {
  const dispatch = useDispatch();
  const requets = useSelector((store) => store.requests);
  const [loading, setLoading] = useState(true);

  const handleRequests = async (status, _id) => {
    try {
      const res = await axios.post(
        "/api/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequests(_id));
    } catch (error) {
      console.error("Error", error);
    }
  };

  const fecthConnections = async () => {
    try {
      const res = await axios.get("/api/user/requests/received", {
        withCredentials: true,
      });

      dispatch(addRequests(res?.data?.requests));
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
        Loading Requests...
      </div>
    );
  }

  if (!requets) return;

  if (requets.length === 0)
    return (
      <div className="text-center my-10 font-bold text-2xl">
        No requests Found
      </div>
    );
  return (
    <div className="my-10 px-4">
      <h1 className="text-center text-gray-300 text-2xl sm:text-3xl font-bold my-4">
        Connection Requests
      </h1>
      <div className="flex flex-col gap-6 items-center">
        {requets.map((req) => {
          const { firstName, lastName, photoUrl, about } = req.fromUserId || {};

          return (
            <div
              key={req._id}
              className="bg-base-300 rounded-xl shadow-md w-full max-w-md sm:max-w-2xl p-4"
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                <img
                  src={photoUrl}
                  alt={firstName}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover flex-shrink-0"
                />

                <div className="flex flex-col sm:flex-grow justify-center w-full">
                  <h2 className="text-lg sm:text-xl font-bold text-white text-center sm:text-left">
                    {firstName + " " + lastName}
                  </h2>

                  <p className="text-gray-400 text-sm sm:text-base mt-2 text-center sm:text-left line-clamp-3">
                    {about}
                  </p>

                  {/* <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center sm:justify-start">
                    <button
                      className="btn btn-primary text-sm sm:text-base"
                      onClick={() => handleRequests("accepted", req._id)}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-secondary text-sm sm:text-base"
                      onClick={() => handleRequests("rejected", req._id)}
                    >
                      Reject
                    </button>
                  </div> */}
                </div>
                <div className="mt-4 flex gap-4  sm:gap-4 justify-center sm:justify-start">
                  <button
                    className="btn btn-primary text-sm sm:text-base"
                    onClick={() => handleRequests("accepted", req._id)}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-secondary text-sm sm:text-base"
                    onClick={() => handleRequests("rejected", req._id)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="my-10">
      <h1 className="text-center text-gray-300 text-3xl font-bold my-4">
        Connection Requests
      </h1>
      {requets.map((req) => {
        const { firstName, lastName, photoUrl, about } = req.fromUserId || {};
        return (
          <div className="card card-side flex items-center bg-base-300 shadow-sm mx-auto w-1/2 my-3 p-2">
            <figure>
              <img
                src={photoUrl}
                alt="Movie"
                className="w-25 h-25 rounded-[50%]"
              />
            </figure>
            <div className=" m-2 my-3">
              <h2 className=" text-xl font-bold text-gray-400 ">
                {firstName + " " + lastName}
              </h2>
              {/* {age && gender && (
                <p className=" text-gray-400">{age + ", " + gender}</p>
              )} */}
              <p className="w-100 text-gray-400">{about}</p>
            </div>
            <div className="flex gap-5  right-5 top-10">
              <button
                className="btn btn-primary"
                onClick={() => handleRequests("accepted", req._id)}
              >
                Accept
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => handleRequests("rejected", req._id)}
              >
                Reject
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
