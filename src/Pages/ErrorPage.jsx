import "../errorpage.css";
import { useNavigate } from "react-router";
export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="gif">
        <img src="https://i.postimg.cc/2yrFyxKv/giphy.gif" alt="gif_ing" />
      </div>
      <div className="content">
        <h1 className="main-heading">Page Not Found</h1>
        <p>
          ...maybe the page you're looking for is not found or never existed.
        </p>
        <button onClick={() => navigate(-1)}>
          Back to home <i className="far fa-hand-point-right"></i>
        </button>
      </div>
    </div>
  );
}
