import { Link } from "react-router-dom";

export function StatsPage() {
  return (
    <div className="stats-page">
      <h1>Statistics</h1>
      <p>Stats will be shown here once you start studying.</p>
      <Link to="/">← Back to Home</Link>
    </div>
  );
}
