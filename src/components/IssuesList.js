import { useEffect } from "react";
import { useAsync } from "../hooks/useAsync";
import { fetchIssues } from "../services/fetchIssues";
const IssuesList = () => {
  const {
    data: issues,
    status,
    error,
    run,
  } = useAsync({
    status: "pending",
  });

  useEffect(() => {
    run(fetchIssues());
  }, [run]);
  return <div>IssuesList</div>;
};

export { IssuesList };
