import { useRouteError, Link } from "react-router";
import styles from "./ErrorPage.module.css";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className={styles.errorPage}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occured.</p>
      <Link to="/">Back to Home</Link>
    </div>
  )
}

export default ErrorPage;