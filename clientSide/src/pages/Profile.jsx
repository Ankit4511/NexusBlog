import { useContext, useEffect } from "react";
import axios from "axios";
import Context from "../context/Context.jsx";
import MyBlog from "../components/MyBlog.jsx";
import { FaUserCircle } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";

const Profile = () => {
  const auth = useContext(Context);

  console.log(auth);

  useEffect(() => {
    const fetchUser = async () => {
      const api = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/users/myprofile`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
      // console.log(api.data.user);

      auth.setUser(api.data.user);
      auth.setIsAuthenticated(true);
    };
    fetchUser();
  });
  return (
    <div className="text-center my-3">
      <h1>
        <FaUserCircle /> {"  "}
        {auth.user?.name}
      </h1>
      <h1>
        <BiLogoGmail /> {"  "}
        {auth.user?.email}
      </h1>

      <MyBlog />
    </div>
  );
};

export default Profile;
