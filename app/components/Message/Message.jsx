'use client';
import React from 'react';
import './Message.css';

function Message({message}) {
  return (
    <div className='message'>
        <span>{message || "something went wrong"}</span>
    </div>
  )
}

export default Message;