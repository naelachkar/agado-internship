import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
  return (
    <>
      <h1>Text to speech</h1>
      <button onClick={() => navigate("/builtIn")}>Built-in JavaScript</button>
    </>
  );
}
