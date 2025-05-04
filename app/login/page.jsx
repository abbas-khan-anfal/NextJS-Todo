'use client';
import React, { useContext, useState } from 'react';
import Styles from './page.module.css';
import Link from 'next/link';
import Title from '../components/Title/Title';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Context from '../context/Functional Context/Context';

function page() {

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { fetchUserHandler } = useContext(Context);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const dataObj = {
      email,password
    }
    try
    {
      const response = await axios.post(`/api/auth/login`, dataObj, {
        headers : {
          "Content-Type":"application/json"
        }
      });
      setEmail("");
      setPassword("");
      toast.success(response?.data?.message || "Login successfull");
      fetchUserHandler();
      setTimeout(() => {
        router.push("/");
      }, 1000);
    }
    catch(error)
    {
      toast.error(error?.response?.data?.message || error.message);
    }
    finally
    {
      setLoading(false);
    }
  }

  return (
    <div className="container authPage">
      <div className="row justify-content-center">
        <div className="col-lg-4 col-md-6 col-sm-12">
          <form onSubmit={submitHandler}>

            <Title title="Login" />
            <div className="mb-3">
              <input type="email" required className='inputField' placeholder='Enter email' onChange={e => setEmail(e.target.value)} value={email} disabled={loading} />
            </div>
            <div className="mb-3">
              <input type="password" required className='inputField' placeholder='Enter password' onChange={e => setPassword(e.target.value)} value={password} disabled={loading} />
            </div>
            <div className="mb-3">
              <button disabled={loading} type='submit' className='unBtn lgBtn'>{loading ? 'Loging...' : 'Login'}</button>
            </div>
            <div className="mb-3">
              <p className='text-center authLinkText'>Don't have an account? <Link href="/signup">Signup</Link></p>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  )
}

export default page;