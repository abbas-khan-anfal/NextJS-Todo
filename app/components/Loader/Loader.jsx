import React from 'react';
import './Loader.css';

function Loader({loaderWidth}) {
  return (
    <div className="loader" style={{width:loaderWidth ? loaderWidth : '50px'}}></div>
  )
}

export default Loader;