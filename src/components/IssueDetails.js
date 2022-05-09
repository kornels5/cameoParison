import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchIssue } from "../services/fetchIssues";
import { useAsync } from "../hooks/useAsync";

const IssueDetails = () => {
  const { id } = useParams();

  const {
    data: issue,
    status,
    error,
    run,
  } = useAsync({
    status: "pending",
  });

  useEffect(() => {
    run(fetchIssue(id));
  }, [run]);

  if (status === "pending") {
    return <div>...Loading</div>;
  } else if (status === "rejected") {
    throw error;
  } else if (status === "resolved") {
    return <div>{issue.title}</div>;
  }
};

export { IssueDetails };
