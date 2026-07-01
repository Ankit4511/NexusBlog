import axios from "axios";
import { useState , useEffect} from "react";
 import { FaUserCircle  } from 'react-icons/fa';
import { BiLogoGmail } from "react-icons/bi";


const UserDetail = ({id}) => {

    const [user, setUser] = useState({});

    useEffect(() => {
    const fetchUser = async () => {
      const api =  await axios.get(`https://blog-application-lt7b.onrender.com/api/users/${id}`,{
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true
      });

      console.log(api.data.user);
      setUser(api.data.user);


    }
    fetchUser();
  });



  return (
    <div>
      <h5><FaUserCircle /> {"  "}{user.name}</h5>
      <h5><BiLogoGmail />
{"  "}{user.email}</h5>
    </div>
  )
}

export default UserDetail
