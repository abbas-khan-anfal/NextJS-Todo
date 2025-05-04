'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Styles from './page.module.css';
import Title from './components/Title/Title';
import Navbar from './components/Navbar/Navbar';
import axios from 'axios';
import Message from './components/Message/Message';
import toast from 'react-hot-toast';
import Loader from './components/Loader/Loader';

function page() {

  const [allTasks, setAllTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTaskHandler = async () => {
    setLoading(true);
    try
    {
      const response = await axios.get(`/api/tasks`);
      setAllTasks(response?.data?.tasks || []);
    }
    catch(error)
    {
      console.log(error?.response?.data?.message || error.message)
    }
    finally
    {
      setLoading(false);
    }
  }

  const deleteTaskHandler = async (t_id, e) => {
    const delBtn = e.target;
    delBtn.innerHTML = "Deleting...";
    delBtn.disabled = true;
    try
    {
      const response = await axios.delete(`/api/tasks/del_task/${t_id}`);
      toast.success(response?.data?.message || "Task deleted successfully");
      fetchTaskHandler();
    }
    catch(error)
    {
      console.log(error?.response?.data?.message || error.message)
    }
    finally
    {
      delBtn.innerHTML = "Delete";
      delBtn.disabled = true;
    }
  }

  const updateTaskHandler = async (tId, e) => {
    const editCheckBox = e.target;
    editCheckBox.disabled = true;
    try
    {
      const response = await axios.put(`/api/tasks`, {taskId : tId}, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      toast.success(response?.data?.message || "Task updated successfully");
      fetchTaskHandler();
    }
    catch(error)
    {
      console.log(error?.response?.data?.message || error.message)
    }
    finally
    {
      editCheckBox.disabled = false;
    }
  }

  useEffect(() => {
    fetchTaskHandler();
  }, []);


  return (
    <>
    <Navbar />
    <div className={`container ${Styles.homePage}`}>
        <div className="row">
            <div className="col-8">
                <Title title="Add Task" />
                <div className="mb-3 d-flex justify-content-end">
                  <Link href="/add_task" className='unBtn mdBtn'>Add New Task</Link>
                </div>
                <div className='table-responsive'>
                <table className='table'>
                  <thead>
                    <tr>
                      <th>Sr:n</th>
                      <th>Task Name</th>
                      <th>Task Description</th>
                      <th>Completed</th>
                      <th>Delete</th>
                    </tr>
                  </thead>

                  <tbody>
                    {
                      !loading
                      ?
                      (
                      allTasks && allTasks.length > 0
                      ?
                      (
                        allTasks.map((task, index) => (
                          <tr key={task._id}>
                            <td>{index + 1}</td>
                            <td>{task.taskName}</td>
                            <td>{task.task}</td>
                            <td>
                              <input type="checkbox"
                              className={`form-check-input`}
                              onChange={(e) => updateTaskHandler(task._id,e)}
                              checked={task.isCompleted}
                              />
                            </td>
                            <td><button onClick={(e) => deleteTaskHandler(task._id, e)} className={`${Styles.dangerBtn} unBtn`}>Delete</button></td>
                          </tr>
                        ))
                      )
                      :
                      (
                        <tr>
                          <td colSpan="5"><Message message="No task found!" /></td>
                        </tr>
                      )
                    )
                    :
                    (
                      <tr>
                        <td colSpan="5">
                          <div className="d-flex justify-content-center">
                            <Loader loaderWidth="40px" />
                          </div>
                        </td>
                      </tr>
                    )
                    }
                  </tbody>
                </table>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default page