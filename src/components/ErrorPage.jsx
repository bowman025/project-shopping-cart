import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div>
      <h1>Nothing to see here, folks!</h1>
      <Link to="/">
        Go back to the home page.
      </Link>
    </div>
  )
}

export default ErrorPage;