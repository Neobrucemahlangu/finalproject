import React from "react";
import "./HomeSections.css";

const FutureGetaways = () => {
  const regions = ["Africa", "Europe", "Asia", "Middle East", "Oceania"];

  return (
    <section className="future-getaways">
      <h2>Inspiration for future getaways</h2>
      <div className="tabs">
        {regions.map((region, i) => (
          <button key={i}>{region}</button>
        ))}
      </div>
      <ul className="list">
        <li>Johannesburg — City • 3h drive</li>
        <li>Durban — Coast • 5h drive</li>
        <li>Gqeberha — Beach • 7h drive</li>
      </ul>
    </section>
  );
};

export default FutureGetaways;
