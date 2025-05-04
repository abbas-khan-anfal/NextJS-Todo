'use client';
import React, { useContext, useEffect, useState } from 'react';
import './Navbar.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import userAvatar from '../../assets/userAvatar.jpg';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import axios from 'axios';
import Context from '@/app/context/Functional Context/Context';

function Navbar() {
  const router = useRouter();
  const [navBar, setNavBar] = useState(false);
  const pathname = usePathname();
  const { user } = useContext(Context);

  const navToggleHandler = () => {
    setNavBar(!navBar);
  }


  const logoutHandler = async (e) => {
    e.preventDefault();
    try
    {
      const response = await axios.get(`/api/auth/logout`);
      toast.success(response?.data?.message || "Logout successfull");
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    }
    catch(error)
    {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  return (
    <nav>
        <div className='logo_div'>
            <button className='nav_toggle_btn open_nav' onClick={navToggleHandler}>&#9776;</button>
            <Link href='/' title='Logo' className='logo'>Todo</Link>
        </div>

        <ul className={navBar ? 'show' : ''}>
            <div className='close_nav_div'>
                <button className='nav_toggle_btn close_nav' onClick={navToggleHandler}>&#10005;</button>
            </div>
            <li><Link href="/" className={`${pathname === "/" ? 'active' : ''}`}>Home</Link></li>
            <li><Link href="/add_task" className={`${pathname === "/add_task" ? 'active' : ''}`}>Add Task</Link></li>
            <li><a href="#" onClick={logoutHandler}>Logout</a></li>
            <li><Link href="/profile" className={`${pathname === "/profile" ? 'active' : ''} navProfileLink`}>
                    <Image
                      src={user?.img_path || userAvatar}
                      alt="User"
                      title="Your Profile"
                      className="navUserImg"
                      width={100}
                      height={100}
                    />
            </Link></li>
        </ul>
    </nav>
  )
}

export default Navbar;