import { useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';
import UserDetail from '../components/UserDetail';

const Home = () => {
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const api = await axios.get(
        `https://blog-application-lt7b.onrender.com/api/blogs/allblogs`,
        {
          withCredentials: true,
        },
      );

      console.log(api.data.blogs);

      setBlog(api.data.blogs);
    };

    fetchBlogs();
  }, []);

  return (
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
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Home;
