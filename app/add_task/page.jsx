'use client';
import React, { useState } from 'react';
import Title from '../components/Title/Title';
import Styles from './page.module.css';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar/Navbar';
import axios from 'axios';
import toast from 'react-hot-toast';

function page() {

  const router = useRouter();
    const [taskName, setTaskName] = useState("");
    const [task, setTask] = useState("");
    const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const dataObj = {
      taskName,task
    }
    try
    {
      const response = await axios.post(`/api/tasks`, dataObj, {
        headers : {
          "Content-Type":"application/json"
        }
      });
      setTaskName("");
      setTask("");
      toast.success(response?.data?.message || "Task saved successfully");
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
    <>
    <Navbar />
    <div className={`container ${Styles.taskPage}`}>
      <div className="row">
        <div className="col-lg-4 col-md-6 col-sm-12">

          <div className="mb-3">
            <button onClick={() => router.back()} className='circleBtn'>
              <i className="fa-solid fa-arrow-left"></i>
            </button>
          </div>

          <div className="mb-3">
            <form onSubmit={submitHandler}>
              <Title title="Add Task" />
              <div className="mb-3">
                <input type="text" className='inputField' placeholder='Task name' onChange={e => setTaskName(e.target.value)} value={taskName} required disabled={loading} />
              </div>
              <div className="mb-3">
                <textarea rows="3" className='inputField' placeholder='Enter your task' onChange={e => setTask(e.target.value)} value={task} required disabled={loading}></textarea>
              </div>
              <div className="mb-3">
                <button type='submit' className='unBtn mdBtn' disabled={loading}>{loading ? 'Task saving...' : 'Save Task'}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default page;