const Card = ({ celeb, onClick }) => {
  return (
    <div className="card-outer">
      <button
        className="card-inner"
        style={{
          backgroundImage: `url("${celeb.image}")`,
        }}
        onClick={onClick}
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
          <p className="type ">Musician - Singer/Songwriter</p>
        </div>
      </button>
    </div>
  );
};

export { Card };
