import { useEffect } from "react";
import { useAuth } from "../contexts/Auth.context";

export default function Logout() {
  const { isAuthed, logout } = useAuth();

  useEffect(() => {
    logout();
  }, [logout]);

  return (
    <div>
      <div className="row">
        <div className="col-12">
          <h1>
            {isAuthed ? "Logging out..." : "You were successfully logged out"}
          </h1>
        </div>
      </div>
    </div>
  );
}
