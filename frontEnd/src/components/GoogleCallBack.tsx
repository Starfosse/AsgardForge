import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const GoogleCallBack = () => {
  const { checkAuthStatus } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const handleCallBack = async () => {
      try {
        const response = await fetch(
          `/api/auth/google/callback${window.location.search}`
        );
        if (!response.ok) {
          throw new Error("Authentication failed");
        }
        const { access_token } = await response.json();
        localStorage.setItem("access_token", access_token);

        await checkAuthStatus();
        navigate("/");
      } catch (error) {
        console.error("Authentification error :", error);
        navigate("/login");
      }
    };
    handleCallBack();
  }, []);
  return <div>Authentification en cours...</div>;
};
