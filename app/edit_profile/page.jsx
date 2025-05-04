'use client';
import React, { useContext, useEffect, useState } from 'react';
import Title from '../components/Title/Title';
import Styles from './page.module.css';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar/Navbar';
import toast from 'react-hot-toast';
import axios from 'axios';
import Loader from '../components/Loader/Loader';
import Context from '../context/Functional Context/Context';

function page() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [loggedInUser, setLoggedInUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const { fetchUserHandler } = useContext(Context);

  const submitHandler = async (e) => {
    e.preventDefault();
    if(userId.toString().trim() === "")
    {
      toast.success("Invalid User ID");
      return;
    }

    const profileImg = e?.target?.profileImage?.files?.[0];
    setFormLoading(true);
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("fullName", fullName);
    formData.append("image", profileImg);
    try
    {
      const response = await axios.post(`/api/auth/me`, formData, {
        headers : {
          "Content-Type":"multipart/form-data"
        }
      });
      toast.success(response?.data?.message || "Profile updated");
      fetchUserHandler();
    }
    catch(error)
    {
      toast.error(error?.response?.data?.message || error.message)
    }
    finally
    {
      setFormLoading(false);
    }
  }

  const fetchUser = async () => {
    setLoading(true);
    setFormLoading(true);
    try
    {
      const response = await axios.get(`/api/auth/me`);
      setLoggedInUser(response?.data?.user || {});
      setUserId(response?.data?.user?._id || "");
      setFullName(response?.data?.user?.fullName || "");
      setEmail(response?.data?.user?.email || "");
    }
    catch(error)
    {
      console.log(error?.response?.data?.message || error.message);
    }
    finally
    {
      setLoading(false);
      setFormLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);


  return (
    <>
    <Navbar />
    <div className={`container ${Styles.editProfilepage}`}>
      <div className="row justify-content-center">
        <div className="col-lg-4 col-md-6 col-sm-12">

          <div className="mb-3">
            <button onClick={() => router.back()} className='circleBtn'>
              <i className="fa-solid fa-arrow-left"></i>
            </button>
          </div>

          <div className="mb-3">
            {
              !loading
              ?
              (
                <form onSubmit={submitHandler}>
                  <fieldset disabled={formLoading}>
                  <Title title="Profile" />
                  <div className="mb-3">
                    <input type="text" className='inputField' required placeholder='Your name' onChange={e => setFullName(e.target.value)} value={fullName} />
                  </div>
                  <div className="mb-3">
                    <input type="email" disabled required className='inputField' placeholder='Your email' onChange={e => setEmail(e.target.value)} value={email} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="profilePhoto">Profile Photo</label>
                    <input type="file" className='inputField' id="profilePhoto" placeholder='Profile photo' name='profileImage' />
                  </div>
                  <div className="mb-3">
                    <button type='submit' className='unBtn mdBtn'>Update Profile</button>
                  </div>
                  </fieldset>
                </form>
              )
              :
              (
                <div className="mb-3">
                  <Loader loaderWidth="40px" />
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default page;