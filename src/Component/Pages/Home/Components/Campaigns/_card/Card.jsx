import React from 'react';
import './Card.css';

const Card = ({ date, des, heading, image }) => {
  // Split the date into day and month
  const [day, month] = date.split(' ');

  return (
    <div>
      <figure className="snip1527">
        <div className="image">
          <img src={image} alt="Campaign" />
        </div>
        <figcaption>
          <div className="date">
            <span className="day">{day}</span>
            <span className="month">{month}</span>
          </div>
          <h3>{heading}</h3>
          <p>{des}</p>
        </figcaption>
        <a href="#"></a>
      </figure>
    </div>
  );
};

export default Card;
