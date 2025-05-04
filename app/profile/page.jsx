'use client';
import React, { useContext, useEffect, useState } from 'react';
import Title from '../components/Title/Title';
import Styles from './page.module.css';
import Image from 'next/image';
import userAvatar from '../assets/userAvatar.jpg';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar/Navbar';
import axios from 'axios';
import Message from '../components/Message/Message';
import Loader from '../components/Loader/Loader';
import dayjs from 'dayjs';
import Context from '../context/Functional Context/Context';


function page() {

  const router = useRouter();
  const { user, loading } = useContext(Context);

  return (
    <>
    <Navbar/>
    <div className={`container ${Styles.profilePage}`}>
      <div className="row justify-content-center">
        <div className="col-lg-10 col-md-11 col-sm-12">

          <div className="mb-3">
            <button onClick={() => router.back()} className='circleBtn'>
              <i className="fa-solid fa-arrow-left"></i>
            </button>
          </div>


          <div>
            <div className='text-center'>
              <Title title="Your Profile" />
            </div>

            {
              !loading
              ?
              (
                Object.keys(user).length > 0
                ?
                (
                  <>
                  <div className="mb-3 text-center">
                    <span><h5 className='d-inline-block h5'>Full Name :</h5> {user?.fullName}</span><br></br>
                    <span><h5 className='d-inline-block h5'>Email :</h5> {user?.email}</span>
                    <br></br><span><h5 className='d-inline-block h5'>Join At :</h5> {dayjs(user?.createdAt).format("DD MMM YYYY")}</span>
                  </div>

                  <div className="mb-3 text-center">
                  {!loading && typeof window !== "undefined" && (
                    <Image
                      src={user?.img_path || userAvatar}
                      alt="Profile Image"
                      title="Profile Photo"
                      className={Styles.profileImg}
                      width={100}
                      height={100}
                    />
                  )}
                  </div>
                  </>
                
                )
                :
                (
                  <div className="mb-3 text-center">
                    <Message message="No data found, Login to continue" />
                  </div>
                )
              )
              :
              (
                <div className="mb-3 d-flex justify-content-center">
                  <Loader loaderWidth="40px" />
                </div>
              )

            }
            <div className="mb-3 text-center">
              <Link href="/edit_profile" className='unBtn mdBtn'>Edit Profile</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default page;