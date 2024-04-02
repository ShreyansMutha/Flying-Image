import React, { useState } from "react";
import Right from "../assets/right.gif";
import Left from "../assets/left.gif";
import BackImage from "../assets/back.jpg";

const Dashboard = () => {
  const [position, setPosition] = useState({ x: 50, y: 40 });
  const [imageState, setImageState] = useState(Left);
  const [clickEnabled, setClickEnabled] = useState(true);

  const handleClick = (event) => {
    if (!clickEnabled) return;
    setImageState(event.clientX > position.x ? Right : Left);
    const distanceX = event.clientX - position.x;
    const distanceY = event.clientY - position.y;
    const distance = Math.hypot(distanceX, distanceY);
    const speed = 0.3; 
    const duration = Math.round(distance / speed); 
    const clampedX = Math.max(50, Math.min(event.clientX, window.innerWidth - 50));
    const clampedY = Math.max(40, Math.min(event.clientY, window.innerHeight - 40));
    setPosition({ x: clampedX, y: clampedY });
    setClickEnabled(false);
    const imageElement = document.getElementById("flyingImage");
    if (imageElement) {
      imageElement.style.transitionDuration = `${duration}ms`;
      setTimeout(() => {
        setClickEnabled(true);
      }, duration);
    }
  };

  return (
    <div
      className={`h-screen bg-cover ${clickEnabled ? "cursor-crosshair" : "cursor-wait"}`}
      style={{ backgroundImage: `url(${BackImage})` }}
      onClick={handleClick}
    >
      <img
        id="flyingImage"
        src={imageState}
        alt="Flying Image"
        className="w-24 h-20 transition-transform ease-linear cursor-move"
        style={{ transform: `translate(${position.x - 50}px, ${position.y - 40}px)` }}
      />
    </div>
  );
};

export default Dashboard;
