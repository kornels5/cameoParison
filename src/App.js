import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { PlayingScreen } from "./components/PlayingScreen";
import { useAsync } from "./hooks/useAsync";
import { fetchCelebs } from "./services/fetchCelebs";
import { select } from "./services/select";

const App = () => {
  const [state, setState] = useState("welcome"); //welcome or playing
  const [selectedCelebs, setSelectedCelebs] = useState("");
  let screen;
  const { error, status, data, run } = useAsync({ status: "pending" });

  const start = (category) => {
    const { celebs, lookup } = data;
    const selected = select(celebs, lookup, category.slug);
    setSelectedCelebs(selected);
    setState("playing");
  };

  useEffect(() => {
    run(fetchCelebs());
  }, [run]);

  if (state === "welcome") {
    screen = <WelcomeScreen setCategory={start} />;
  } else if (state === "playing") {
    screen = <PlayingScreen selection={selectedCelebs} />;
  }

  return <main>{screen}</main>;
};

ReactDOM.render(<App />, document.getElementById("root"));
