import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="page">
      <div className="card not-found">
        <h1>Page Not Found</h1>
        <Link to="/">Go home</Link>
      </div>
    </div>
  );
}
