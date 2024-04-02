import React, { useState } from "react";
import Right from "../assets/right.gif";
import Left from "../assets/left.gif";
import Back from "../assets/back.jpg";

const Dashboard = () => {
  const [position, setPosition] = useState({ x: 50, y: 40 });
  const [imageState, setImageState] = useState(Left);
  const handleClick = (event) => {
    setImageState(event.clientX > position.x ? Right : Left);
    const newX = event.clientX;
    const newY = event.clientY;
    const maxX = window.innerWidth - 50;
    const maxY = window.innerHeight - 40;
    const minX = 50;
    const minY = 40;
    const clampedX = Math.max(minX, Math.min(newX, maxX));
    const clampedY = Math.max(minY, Math.min(newY, maxY));
    setPosition({ x: clampedX, y: clampedY });
  };

  return (
    <div
      className="h-screen cursor-pointer"
      style={{
        backgroundImage: `url(${Back})`,
        backgroundSize: "cover",
      }}
      image
      onClick={handleClick}
    >
      <div className="relative">
        <img
          src={imageState}
          alt="Moving Image"
          className="w-24 h-20 transition-transform duration-700 ease-in"
          style={{
            transform: `translate(${position.x - 50}px, ${position.y - 40}px)`,
          }}
        />
      </div>
    </div>
  );
};

export default Dashboard;
