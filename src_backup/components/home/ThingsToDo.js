import React from "react";
import "./ThingsToDo.css";

const ThingsToDo = () => {
  return (
    <div className="things-wrapper">
      <h2 className="section-title">Discover Airbnb Experiences</h2>
      <section className="things-to-do">
        <div className="thing trip">
          <div className="overlay">
            <h3>Things to do on your trip</h3>
            <button>Experiences</button>
          </div>
        </div>
        <div className="thing home">
          <div className="overlay">
            <h3>Things to do from home</h3>
            <button>Online Experiences</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ThingsToDo;
