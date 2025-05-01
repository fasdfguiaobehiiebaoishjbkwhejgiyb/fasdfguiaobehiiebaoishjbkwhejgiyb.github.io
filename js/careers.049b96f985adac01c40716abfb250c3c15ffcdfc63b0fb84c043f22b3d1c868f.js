function Careers() {
  const [jobs, setJobs] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(
          `https://boards-api.greenhouse.io/v1/boards/${window.GREENHOUSE_BOARD_TOKEN}/jobs?content=true`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch job listings");
        }
        const data = await response.json();
        setJobs(data.jobs);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  if (loading) {
    return React.createElement(
      "div",
      { className: "careers-loading-container text-center py-8" },
      React.createElement(
        "p",
        { className: "careers-loading-text text-lg text-gray-600" },
        "Loading job listings..."
      )
    );
  }

  if (error) {
    return React.createElement(
      "div",
      { className: "careers-error-container text-center py-8" },
      React.createElement(
        "p",
        { className: "careers-error-message text-lg text-red-600" },
        `Error: ${error}`
      )
    );
  }

  return React.createElement(
    "div",
    { className: "careers-section py-8" },
    React.createElement(
      "h1",
      { className: "careers-heading text-3xl font-bold text-center mb-8" },
      "Careers at Kernelize"
    ),
    jobs.length === 0
      ? React.createElement(
          "p",
          { className: "careers-empty-message text-center text-gray-600" },
          "No job listings available at the moment."
        )
      : React.createElement(
          "div",
          {
            className:
              "careers-jobs-container flex flex-col space-y-6 max-w-3xl mx-auto",
          },
          jobs.map((job) =>
            React.createElement(
              "div",
              {
                key: job.id,
                className:
                  "careers-job-card bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow w-full",
              },
              React.createElement(
                "h2",
                { className: "careers-job-title text-xl font-semibold mb-2" },
                job.title
              ),
              React.createElement(
                "p",
                { className: "careers-job-department text-gray-600 mb-2" },
                React.createElement(
                  "span",
                  { className: "careers-job-label font-medium" },
                  "Department: "
                ),
                job.departments && Array.isArray(job.departments)
                  ? job.departments.map((dept) => dept.name).join(", ")
                  : "Not specified"
              ),
              React.createElement(
                "p",
                { className: "careers-job-location text-gray-600 mb-4" },
                React.createElement(
                  "span",
                  { className: "careers-job-label font-medium" },
                  "Location: "
                ),
                job.location.name
              ),
              React.createElement(
                "a",
                {
                  href: job.absolute_url,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className:
                    "careers-job-apply-button inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors",
                },
                "Apply Now"
              )
            )
          )
        )
  );
}

const root = ReactDOM.createRoot(document.getElementById("careers-root"));
root.render(React.createElement(Careers));
