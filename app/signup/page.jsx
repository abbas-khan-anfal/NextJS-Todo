'use client';
import React, { useState } from 'react';
import Styles from './page.module.css';
import Link from 'next/link';
import Title from '../components/Title/Title';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

function page() {

  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const dataObj = {
      fullName,email,password
    }
    try
    {
      const response = await axios.post(`/api/auth/signup`, dataObj, {
        headers : {
          "Content-Type":"application/json"
        }
      });
      setFullName("");
      setEmail("");
      setPassword("");
      toast.success(response?.data?.message || "Signup successfull");
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    }
    catch(error)
    {
      toast.error(error?.response?.data?.message || error.message)
    }
    finally
    {
      setLoading(false);
    }
  }

  return (
    <div className="container authPage">
      <div className="row justify-content-center">
        <div className="col-4">
          <form onSubmit={submitHandler}>

            <Title title="Signup" />
            <div className="mb-3">
              <input type="text" required className='inputField' placeholder='Enter full name' onChange={e => setFullName(e.target.value)} value={fullName} disabled={loading} />
            </div>
            <div className="mb-3">
              <input type="email" required className='inputField' placeholder='Enter email' onChange={e => setEmail(e.target.value)} value={email} disabled={loading} />
            </div>
            <div className="mb-3">
              <input type="password" required className='inputField' placeholder='Enter password' onChange={e => setPassword(e.target.value)} value={password} disabled={loading} />
            </div>
            <div className="mb-3">
              <button type='submit' disabled={loading} className='unBtn lgBtn'>{loading ? 'Signing...' : 'Signup'}</button>
            </div>
            <div className="mb-3">
              <p className='text-center authLinkText'>Already have an account? <Link href="/login">Login</Link></p>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  )
}

export default page;