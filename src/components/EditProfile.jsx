import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const user = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [photoUrl, setPhotoUrl] = useState();
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [about, setAbout] = useState("");

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setPhotoUrl(user.photoUrl || "");
      setAge(user.age || "");
      setGender(user.gender || "");
      setAbout(user.about || "");
    }
  }, [user]);

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        "http://192.168.18.131:3000/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res?.data?.user));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        navigate("/");
      }, 3000);
    } catch (error) {
      console.error("Error saving profile:", error);
      // Handle error (e.g., show a notification)
    }
  };

  if (!user) {
    return (
      <div className="text-center mt-10 text-gray-400">Loading profile...</div>
    );
  }
  // return (
  //   <>
  //     <div className="flex flex-col lg:flex-row justify-center items-center gap-8 my-10 px-4">
  //       {/* Edit Profile Form */}
  //       <div className="card bg-base-300 shadow-md w-full max-w-md">
  //         <div className="card-body">
  //           <h2 className="card-title justify-center text-xl sm:text-2xl text-gray-400 mb-4">
  //             Edit Profile
  //           </h2>

  //           <fieldset className="mb-3">
  //             <legend className="text-sm text-gray-400 mb-1">First Name</legend>
  //             <input
  //               type="text"
  //               className="input input-bordered w-full"
  //               value={firstName}
  //               onChange={(e) => setFirstName(e.target.value)}
  //             />
  //           </fieldset>

  //           <fieldset className="mb-3">
  //             <legend className="text-sm text-gray-400 mb-1">Last Name</legend>
  //             <input
  //               type="text"
  //               className="input input-bordered w-full"
  //               value={lastName}
  //               onChange={(e) => setLastName(e.target.value)}
  //             />
  //           </fieldset>

  //           <fieldset className="mb-3">
  //             <legend className="text-sm text-gray-400 mb-1">Photo URL</legend>
  //             <input
  //               type="text"
  //               className="input input-bordered w-full"
  //               value={photoUrl}
  //               onChange={(e) => setPhotoUrl(e.target.value)}
  //             />
  //           </fieldset>

  //           <fieldset className="mb-3">
  //             <legend className="text-sm text-gray-400 mb-1">Age</legend>
  //             <input
  //               type="number"
  //               className="input input-bordered w-full"
  //               value={age}
  //               onChange={(e) => setAge(e.target.value)}
  //             />
  //           </fieldset>

  //           <fieldset className="mb-3">
  //             <legend className="text-sm text-gray-400 mb-1">Gender</legend>
  //             <select
  //               className="select select-bordered w-full"
  //               value={gender}
  //               onChange={(e) => setGender(e.target.value)}
  //             >
  //               <option value="male">Male</option>
  //               <option value="female">Female</option>
  //               <option value="other">Other</option>
  //             </select>
  //           </fieldset>

  //           <fieldset className="mb-3">
  //             <legend className="text-sm text-gray-400 mb-1">Bio</legend>
  //             <textarea
  //               className="textarea textarea-bordered w-full h-24"
  //               placeholder="Tell us something about you..."
  //               value={about}
  //               onChange={(e) => setAbout(e.target.value)}
  //             ></textarea>
  //           </fieldset>

  //           <div className="card-actions justify-center mt-4">
  //             <button className="btn btn-primary w-full" onClick={saveProfile}>
  //               Save Profile
  //             </button>
  //           </div>
  //         </div>
  //       </div>

  //       {/* Profile Preview Card */}
  //       <div className="w-full max-w-md lg:max-w-sm bg-base-300 rounded-lg shadow-md p-4">
  //         <UserCard
  //           user={{ firstName, lastName, photoUrl, age, gender, about }}
  //         />
  //       </div>
  //     </div>

  //     {showToast && (
  //       <div className="toast toast-top toast-center">
  //         <div className="alert alert-success">
  //           <span>Profile updated successfully! Redirecting to Feed</span>
  //         </div>
  //       </div>
  //     )}
  //   </>
  // );

  return (
    <>
      <div className="flex justify-center my-10 flex-col lg:flex-row items-center ">
        <div className="flex justify-center  w-80 lg:w-fit mx-auto lg:mx-0  ">
          <div className="card bg-base-300 w-96 shadow-sm ">
            <div className="card-body">
              <h2 className="card-title justify-center text-[1.5rem] text-gray-400 ">
                Edit Profile
              </h2>
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-[0.9rem] text-gray-400">
                  First Name:
                </legend>
                <input
                  type="text"
                  className="input"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-[0.9rem] text-gray-400">
                  Last Name:
                </legend>
                <input
                  type="text"
                  className="input"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-[0.9rem] text-gray-400">
                  Photo URL:
                </legend>
                <input
                  type="text"
                  className="input"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-[0.9rem] text-gray-400">
                  Age:
                </legend>
                <input
                  type="text"
                  className="input"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-[0.9rem] text-gray-400">
                  Gender
                </legend>
                <select
                  className="select select-bordered w-full"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option disabled value="">
                    Select Gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend text-[0.9rem] text-gray-400">
                  Your bio
                </legend>
                <textarea
                  className="textarea h-24"
                  placeholder="Bio"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                ></textarea>
              </fieldset>
              {/* {loginError && (
              <p className="text-red-500 text-sm mt-1">{loginError}</p>
            )} */}

              <div className="card-actions justify-center my-3">
                <button
                  className="btn btn-primary text-black text-[1rem]"
                  onClick={saveProfile}
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-col justify-center my-3 relative lg:bottom-22  mx-10 h-fit  rounded-lg">
          {/* <h1 className="font-bold text-2xl text-center text-gray-400 m-3">
            Profile Card Preview
          </h1> */}
          <h1 className="block lg:hidden text-2xl font-bold text-center my-4">
            Profile Card Preview
          </h1>
          <UserCard
            user={{ firstName, lastName, photoUrl, age, gender, about }}
          />
        </div>
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile updated successfully! Redirecting to Feed</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
