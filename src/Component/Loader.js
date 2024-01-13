import React from "react";

const Loader = () => {
  return (
    <div className="loading-indicator">
      <div className="line"></div>
      <div className="subline inc"></div>
      <div className="subline dec"></div>
    </div>
  )
}

export default Loader;