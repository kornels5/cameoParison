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

  if (status === "pending") {
    return <div>...Loading</div>;
  } else if (status === "resolved") {
    return (
      <main className="container flex flex-col mx-auto w-full items-center justify-center">
        <ul className="flex flex-col">
          {issues.map((issue) => {
            return (
              <li
                key={issue.node_id}
                className="border-gray-400 flex flex-row mb-2"
              >
                <div className="transition duration-500 shadow ease-in-out transform hover:-translate-y-1 hover:shadow-lg select-none cursor-pointer bg-white dark:bg-gray-800 rounded-md flex flex-1 items-center p-4">
                  <div className="flex flex-col w-10 h-10 justify-center items-center mr-4">
                    <a href="#" className="block relative">
                      <img
                        alt="profil"
                        src={issue.user.avatar_url}
                        className="mx-auto object-cover rounded-full h-10 w-10 "
                      />
                    </a>
                  </div>
                  <div className="flex-1 pl-1 md:mr-16">
                    <div className="font-medium dark:text-white">
                      {issue.title}
                    </div>
                    {/* <div className="text-gray-600 dark:text-gray-200 text-sm">
                      Developer
                    </div> */}
                  </div>
                  <div className="text-gray-600 dark:text-gray-200 text-xs">
                    {issue.created_at}
                  </div>
                  <button className="w-24 text-right flex justify-end">
                    <svg
                      width="12"
                      fill="currentColor"
                      height="12"
                      className="hover:text-gray-800 dark:hover:text-white dark:text-gray-200 text-gray-500"
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
                    </svg>
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </main>
    );
  } else if (status === "rejected") {
    throw error;
  }
};

export { IssuesList };
