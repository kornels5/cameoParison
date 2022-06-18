import { useEffect, useState } from "react";
import { fetchImages } from "../services/fetchImages";
import { useAsync } from "../hooks/useAsync";
import { Card } from "./Card";
import { LoadingScreen } from "./LoadingScreen";
import { sleep } from "../utils/sleep";

const images = {
  wrong: new URL("../../static/icons/wrong.svg", import.meta.url),
  right: new URL("../../static/icons/right.svg", import.meta.url),
};
const ROUNDS = 10;

const PlayingScreen = ({ selection, setState }) => {
  //rounds represents: 0 - 9
  const [round, setRound] = useState(0);
  const [lastResult, setLastResult] = useState(null);
  const [results, setResults] = useState(Array(ROUNDS).fill(null));
  const { error, status, data, run } = useAsync({ status: "pending" });

  const submit = async (a, b, sign) => {
    const result = Math.sign(a.price - b.price) === sign ? "right" : "wrong";
    const resultsArray = results;

    resultsArray[round] = result;
    setResults(resultsArray);
    setLastResult(result);
    await sleep(1500);
    setLastResult(null);

    if (round < ROUNDS) {
      setRound((n) => n + 1);
    }
  };

  useEffect(() => {
    if (round < ROUNDS) {
      const promises = Promise.all([
        fetchImages(selection[round].a.id),
        fetchImages(selection[round].b.id),
      ]);

      run(promises);
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
        {status === "pending" && <LoadingScreen />}
        {status === "resolved" && round < ROUNDS && (
          <div className="game">
            <div className="card-container">
              <Card
                celeb={data[0]}
                onClick={() => submit(data[0], data[1], 1)}
                showPrice={!!lastResult}
                winner={data[0].price >= data[1].price}
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
                showPrice={!!lastResult}
                winner={data[1].price >= data[0].price}
              />
            </div>
          </div>
        )}
        {status === "rejected" && (
          <p className="error">Oops! Failed to load data {error}</p>
        )}
        {round === ROUNDS && (
          <div className="done">
            <strong>
              {results.filter((x) => x === "right").length}/{results.length}
            </strong>
            <button color="primary" onClick={() => setState("welcome")}>
              Back to main screen
            </button>
          </div>
        )}
      </div>

      {lastResult !== null && (
        <img
          className="giant-result"
          alt={`${lastResult} answer`}
          src={images[lastResult]}
        />
      )}

      <div
        className="results"
        style={{ gridTemplateColumns: `repeat(${ROUNDS}, 1fr)` }}
      >
        {results.map((result, index) => (
          <span key={index} className="result">
            {result !== null ? (
              <img alt={`${result} answer`} src={images[result]} />
            ) : (
              ""
            )}
          </span>
        ))}
      </div>
    </>
  );
};

export { PlayingScreen };
