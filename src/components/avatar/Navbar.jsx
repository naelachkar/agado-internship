import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate()

  return (
    <nav>
      <div className="divBtn" onClick={() => navigate("/")}>Home</div>
    </nav>
  );
}
