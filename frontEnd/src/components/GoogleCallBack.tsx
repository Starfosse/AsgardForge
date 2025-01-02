import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const GoogleCallBack = () => {
  const navigate = useNavigate();
  const { checkAuthStatus } = useAuth();
  useEffect(() => {
    const handleAuth = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");
      if (token) {
        try {
          localStorage.setItem("access_token", token);
          await checkAuthStatus();
          navigate("/");
        } catch (error) {
          console.error(error);
        }
      }
    };
    handleAuth();
  }, []);
  return <div>Authentification en cours...</div>;
};
