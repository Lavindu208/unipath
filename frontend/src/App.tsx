import { useState } from "react";
import authService from "./services/authService";
import type { User } from "./types/auth.types";
import SignUp from "./components/auth/SignUp";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import "./App.css";

type AuthView = "login" | "signup" | "dashboard";

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    return authService.getCurrentUser();
  });
  const [currentView, setCurrentView] = useState<AuthView>(() => {
    return authService.isAuthenticated() && authService.getCurrentUser()
      ? "dashboard"
      : "login";
  });
  const [notification, setNotification] = useState<string | undefined>();

  const handleSignUpSuccess = (message?: string) => {
    setNotification(message || "Registration successful! Please log in.");
    setCurrentView("login");
  };

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    setNotification(undefined);
    setCurrentView("dashboard");
  };

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
    setNotification(undefined);
    setCurrentView("login");
  };

  if (currentView === "dashboard" && currentUser) {
    return <Dashboard user={currentUser} onLogout={handleLogout} />;
  }

  if (currentView === "signup") {
    return <SignUp onNavigateToLogin={handleSignUpSuccess} />;
  }

  return (
    <Login
      onSuccessLogin={handleLoginSuccess}
      onNavigateToSignUp={() => {
        setNotification(undefined);
        setCurrentView("signup");
      }}
      successNotification={notification}
    />
  );
}

export default App;
