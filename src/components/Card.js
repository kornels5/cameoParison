import { useState } from "react";

const Card = ({ celeb, onClick }) => {
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
        <div className="details ">
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
      </button>
    </div>
  );
};

export { Card };
