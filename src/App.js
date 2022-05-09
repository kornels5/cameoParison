import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { IssueDetails } from "./components/IssueDetails";
import { IssuesList } from "./components/IssuesList";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/issue/:id" element={<IssueDetails />} />
          <Route path="/" element={<IssuesList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
