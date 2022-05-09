import { Octokit } from "octokit";

const { AUTH_TOKEN } = process.env;

const octokit = new Octokit({
  auth: AUTH_TOKEN,
  userAgent: "github-issues-viewer/1.0.0",
});

//TODO make general client which take endpoint and conf params

function fetchIssues() {
  return octokit
    .request("GET /repos/{owner}/{repo}/issues", {
      owner: "facebook",
      repo: "react",
    })
    .then(async (response) => {
      const { data, status } = await response;
      if (status === 200) {
        if (data && data.length > 0) {
          console.log("data: ", data);
          return data;
        } else {
          return Promise.reject(new Error("No data"));
        }
      } else {
        return Promise.reject(
          new Error(`response failed, status code: ${status}`)
        );
      }
    });
}

function fetchIssue(id) {
  return octokit
    .request("/repos/{owner}/{repo}/issues/{issue_number}", {
      owner: "facebook",
      repo: "react",
      issue_number: id,
    })
    .then(async (response) => {
      const { data, status } = await response;
      if (status === 200) {
        if (data) {
          console.log("data: ", data);
          return data;
        } else {
          return Promise.reject(new Error("No data"));
        }
      } else {
        return Promise.reject(
          new Error(`response failed, status code: ${status}`)
        );
      }
    });
}

export { fetchIssues, fetchIssue };
