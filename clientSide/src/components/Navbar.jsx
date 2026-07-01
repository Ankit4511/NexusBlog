import { Link } from 'react-router-dom';
import axios from 'axios';
import Context from '../context/Context.jsx';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { BiSolidLogIn } from 'react-icons/bi';
import { FaUserCircle } from 'react-icons/fa';
import { RiLogoutBoxFill } from 'react-icons/ri';

const Navbar = () => {
  const auth = useContext(Context);
  const navigate = useNavigate();

  const logOut = async () => {
    try {
      const api = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/users/logout`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      );

      console.log(api);

      toast.success(api.data.message);

      setTimeout(() => {
        auth.setIsAuthenticated(false);
        navigate('/');
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="navbar">
        <Link to={'/'} className="left">
          <h2>Blog-Application</h2>
        </Link>

        <div className="right">
          
          

          {!auth.isAuthenticated && (
            <>
            <Link to={'/register'} className="items">
            <h3>Register</h3>
          </Link>
            </>
          )}

          {!auth.isAuthenticated && (
            <>
            <Link to={'/login'} className="items">
            <h3>
              <BiSolidLogIn />
            </h3>
          </Link>
            </>
          )}




          {auth.isAuthenticated && (
            <>
              <Link to={'/addblog'} className="items">
                <h3>Add Blog</h3>
              </Link>
            </>
          )}
          

          {auth.isAuthenticated && (
            <>
              <Link to={'/profile'} className="items">
                <h3>
                  <FaUserCircle />
                </h3>
              </Link>
            </>
          )}
          {auth.isAuthenticated && (
            <>
              <div onClick={logOut} className="items">
                <h3>
                  <RiLogoutBoxFill />
                </h3>
              </div>
            </>
          )}

          
        </div>
      </div>
    </>
  );
};
export default Navbar;
