import "./ErrorPage.css";
import Button from "./Button";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="page-100">
      <div className="page">
        <h1>404</h1>
        <h3>Sorry, the page you tried cannot be found</h3>
        <div className="errorbtn">
          <Link to="/">
            <Button
              className="btns"
              buttonStyle="btn--outline"
              buttonSize="btn--large"
            >
              Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
