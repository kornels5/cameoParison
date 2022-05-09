import ReactDOM from "react-dom";
import { IssuesList } from "./components/IssuesList";

const App = () => {
  return (
    <div>
      <IssuesList />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
