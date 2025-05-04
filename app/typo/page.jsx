import React from 'react';
import Message from '../components/Message/Message';

function page() {
  return (
    <div className="container">
        <div className="row">
            <div className="col-12 text-center my-2">
                <h3>Typography</h3>
                <hr></hr>
            </div>

            <div className="col-6 my-2">
                <h3>Buttons</h3>
                <div className='my-1'>
                    <button className='unBtn'>Click me</button>
                </div>
                <div className='my-1'>
                    <button className='unBtn lgBtn'>Click me</button>
                </div>
                <div className='my-1'>
                    <button className='unBtn mdBtn'>Click me</button>
                </div>
                <div className='my-1'>
                    <button className='unBtn smBtn'>Click me</button>
                </div>
            </div>

            <div className="col-6 my-2">
                <h3>Inputs</h3>
                <div className='my-1'>
                    <label className='label'>Example Field</label>
                    <input type="text" className='inputField' />
                </div>
                <div className='my-1'>
                    <textarea className='inputField' rows={3}></textarea>
                </div>

            </div>

            <div className="col-6 my-2">
                <h3>Headings</h3>
                <h1 className='h1'>Heading - 1</h1>
                <h2 className='h2'>Heading - 2</h2>
                <h3 className='h3'>Heading - 3</h3>
                <h4 className='h4'>Heading - 1</h4>
                <h5 className='h5'>Heading - 2</h5>
                <h6 className='h6'>Heading - 3</h6>

            </div>

            <Message message="message goes here" />


        </div>
    </div>
  )
}

export default page