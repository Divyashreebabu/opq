import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const url = new URL(window.location.href);
    const token = url.searchParams.get("token");
    if (token) {
      localStorage.setItem("authToken", token);
      navigate("/dashboard");
    }
  }, []);

  return <div>Logging you in...</div>;
};

export default LoginSuccess;
