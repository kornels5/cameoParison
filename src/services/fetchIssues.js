import { Octokit } from "octokit";

const { AUTH_TOKEN } = process.env;

const octokit = new Octokit({
  auth: AUTH_TOKEN,
  userAgent: "github-issues-viewer/1.0.0",
});

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

export { fetchIssues };
