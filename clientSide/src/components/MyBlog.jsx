import { useContext, useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';
import UserDetail from '../components/UserDetail';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import Context from '../context/Context';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";



const MyBlog = () => {
  const [blog, setBlog] = useState([]);
  const auth = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      const api = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/blogs/myblogs`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      );

      //   console.log(api.data.blogs);
      setBlog(api.data.blogs);
    };

    fetchBlogs();
  }, []);

  const deleteBlog = async (id) => {
    const api = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/blogs/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      },
    );

    console.log(api.data.message);

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

    setBlog(blog.filter((item) => item._id !== id));
  };

  const editBlog = async (id) => {

    auth.setId(id);
    navigate('/addblog');
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

      <div className="container text-center my-5" style={{ width: '55%' }}>
        {blog.map((data) => (
          <React.Fragment key={data._id}>
            <div
              className="card mb-3 bg-secondary text-light my-5"
              style={{ maxWidth: '750px', height: '250px' }}
            >
              <div
                className="row g-0 h-100"
                style={{ maxWidth: '750px', height: '250px' }}
              >
                <div
                  className="col-md-4 h-100"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <img
                    src={data.imgUrl}
                    className="w-100 h-100 rounded"
                    alt="..."
                    style={{
                      objectFit: 'cover',
                    }}
                  />
                </div>

                <div className="col-md-8">
                  <div className="card-body">
                    <h3 className="card-title">{data.title}</h3>
                    <p className="card-text">{data.description}</p>
                    <p className="card-text">
                      <small>{data.createdAt}</small>
                    </p>
                    <UserDetail id={data.user} />

                    <button
                      type="button"
                      onClick={() => editBlog(data._id)}
                      className="btn btn-primary mx-2"
                    >
                      <FaEdit />

                    </button>

                    <button
                      onClick={() => deleteBlog(data._id)}
                      className="btn btn-danger mx-2"
                    >
                      <MdDelete />

                    </button>
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default MyBlog;
