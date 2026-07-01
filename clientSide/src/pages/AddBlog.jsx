import { useState, useContext , useEffect} from 'react';
import axios from 'axios';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Context from '../context/Context.jsx';
import { useNavigate } from 'react-router-dom';





const AddBlog = () => {
  const auth = useContext(Context);
  const navigate = useNavigate();

  // console.log(auth);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');

  useEffect(() => {

  if (!auth.id) return;

  const fetchBlogs = async () => {

    const api = await axios.get(
      `https://blog-application-lt7b.onrender.com/api/blogs/blog/${auth.id}`,
      {
        withCredentials: true,
      },
    );

    console.log(api.data.blog);

    setTitle(api.data.blog.title);
    setDescription(api.data.blog.description);
    setImgUrl(api.data.blog.imgUrl);
  };

  fetchBlogs();

}, [auth.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!auth.id){
      try {
      const api = await axios.post(
        `https://blog-application-lt7b.onrender.com/api/blogs/create`,
        {
          title,
          description,
          imgUrl,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      );

      // console.log(api);
      toast.success(api.data.message, {
        position: 'top-center',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        transition: Bounce,
      });

      auth.setIsAuthenticated(true);

      setTimeout(() => {
        navigate('/profile');
      }, 1500);
                   
      navigate('/profile');


    } catch (err) {
      // console.log(err.response.data);
      toast.error(err.response.data.message, {
        position: 'top-center',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        transition: Bounce,
      });

      auth.setIsAuthenticated(false);
    }}
    else{
      try {
      const api = await axios.put(
        `https://blog-application-lt7b.onrender.com/api/blogs/${auth.id}`,
        {
          title,
          description,
          imgUrl,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      );

      // console.log(api);
      toast.success(api.data.message, {
        position: 'top-center',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        transition: Bounce,
      });

      auth.setIsAuthenticated(true);

      setTimeout(() => {
        navigate('/profile');
      }, 1500);

      auth.setId("");
      navigate('/profile');
                   


    } catch (err) {
      // console.log(err.response.data);
      toast.error(err.response.data.message, {
        position: 'top-center',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        transition: Bounce,
      });

      auth.setIsAuthenticated(false);
    }
    }
    

                            

    

    // console.log(name, email, password);
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />

      <div className="container py-4 mt-5" style={{ width: '45%' }}>

        {
          (auth.id) ? <h2 className="text-white mb-3 text-center my-3">Edit Blog</h2> : <h2 className="text-white mb-3 text-center my-3">Add New Blog</h2>
        }



        <form onSubmit={handleSubmit}>
          <div className="mb-3 my-3">
            <label htmlFor="exampleInputTitle" className="form-label">
              Title
            </label>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="form-control"
              id="exampleInputTitle"
              aria-describedby="titleHelp"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputDescription" className="form-label">
              Description
            </label>

            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              className="form-control"
              id="exampleInputDescription"
              aria-describedby="descriptionHelp"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputImgUrl" className="form-label">
              ImgUrl
            </label>

            <input
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
              type="text"
              className="form-control"
              id="exampleInputImgUrl"
            />
          </div>

          <div className="d-grid gap-2 my-3">
            {
              (auth.id) ? <button type="submit" className="btn btn-primary">Edit Blog</button> : <button type="submit" className="btn btn-primary">Add Blog</button>
            }
          </div>
        </form>
      </div>
    </>
  );
};

export default AddBlog;
