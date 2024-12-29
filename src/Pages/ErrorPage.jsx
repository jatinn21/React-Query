import "./errorpage.css";
import PropTypes from "prop-types";

ErrorPage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default function ErrorPage({ message }) {
  console.log("message:", message);
  return (
    <>
      <div className="message">
        <div className="overlay"></div>
        <div className="content">
          <h1 className="content__header">{message}</h1>
        </div>
      </div>

      <div className="error">
        <h3 className="error__title">ERROR CODE</h3>
        <div className="error__code">
          <h2>404</h2>
        </div>
      </div>
    </>
  );
}
