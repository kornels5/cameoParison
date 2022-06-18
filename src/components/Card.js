import { useState } from "react";

const Card = ({ celeb, onClick, showPrice, winner }) => {
  const [disabled, setDisabled] = useState(false);
  const clickHandler = () => {
    onClick();
    setDisabled(true);
  };

  return (
    <div className="card-outer">
      <button
        className="card-inner"
        style={{
          backgroundImage: `url("${celeb.image}")`,
        }}
        onClick={clickHandler}
        disabled={disabled}
      >
        <div className="details">
          <h2 className="">
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://cameo.com/${celeb.id}`}
            >
              {celeb.name}
            </a>
          </h2>
          <p className="type ">{celeb.type}</p>
        </div>
        {showPrice && (
          <div className={`price ${winner ? "large" : ""}`}>
            {/* in:scale={{ easing: elasticOut, duration: 600 }} */}
            <span>${celeb.price}</span>
          </div>
        )}
      </button>
    </div>
  );
};

export { Card };
