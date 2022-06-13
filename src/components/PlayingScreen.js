import { useEffect, useState } from "react";
import { fetchImages } from "../services/fetchImages";
import { useAsync } from "../hooks/useAsync";
import { Card } from "./Card";

const PlayingScreen = ({ selection }) => {
  //rounds represents: 0 - 9
  const [round, setRound] = useState(0);
  const { error, status, data, run } = useAsync({ status: "pending" });

  const submit = (a, b, sign) => {
    const result = Math.sign(a.price - b.price) === sign ? "right" : "wrong";
    console.log(result);

    setRound((n) => n + 1);
  };

  useEffect(() => {
    const promises = Promise.all([
      fetchImages(selection[round].a.id),
      fetchImages(selection[round].b.id),
    ]);

    run(promises);
    if (status === "resolved") {
      console.log(data[0]);
    }
  }, [round]);

  return (
    <>
      <header>
        <p>
          Tap on the more monetisable celebritys face, or tap same price if
          society values them equally.
        </p>
      </header>
      <div className="game-container">
        {status === "resolved" && (
          <div className="game">
            <div className="card-container">
              <Card
                celeb={data[0]}
                onClick={() => submit(data[0], data[1], 1)}
              />
            </div>
            <div>
              <button
                className="same"
                onClick={() => submit(data[0], data[1], 0)}
              >
                same price
              </button>
            </div>
            <div className="card-container">
              <Card
                celeb={data[1]}
                onClick={() => submit(data[0], data[1], -1)}
              />
            </div>
          </div>
        )}
        {status === "rejected" && (
          <p className="error">Oops! Failed to load data {error}</p>
        )}
      </div>
      <div className="results">
        <span className="result">result</span>
      </div>
    </>
  );
};

export { PlayingScreen };
