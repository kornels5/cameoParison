import { useState } from "react";

const categories = [
  { slug: "actors", label: "Actors" },
  { slug: "athletes", label: "Athletes" },
  { slug: "comedians", label: "Comedians" },
  { slug: "creators", label: "Creators" },
  { slug: "models ", label: "Models" },
  { slug: "musicians", label: "Musicians" },
  { slug: "reality-tv", label: "Reality TV" },
];

const WelcomeScreen = ({ setCategory }) => {
  const [selected, setSelected] = useState(false);

  return (
    <header>
      <h1 className="text-center">
        Cameop
        <span className="logo"> a </span>
        rison
      </h1>

      <p>
        On
        <a href="https://cameo.com" target="_blank" rel="noreferrer">
          cameo.com
        </a>
        , you can buy personalised video clips from everyone from Lindsay Lohan
        to Ice T.
      </p>

      <p>But who commands the highest price?</p>

      <p>pick a category to play the game:</p>
      <div className="categories">
        {categories.map((category, index) => (
          <button
            key={index}
            className="m-1"
            disabled={selected}
            // color="primary"
            onClick={() => {
              setSelected(true);
              setCategory(category);
            }}
          >
            {category.label}
          </button>
        ))}
      </div>
    </header>
  );
};

export { WelcomeScreen };
