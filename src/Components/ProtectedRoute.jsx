import { Navigate } from "react-router-dom";
import { useNoteAppContext } from "../Provider/NoteAppProvider";

export const ProtectedRoute = ({ children }) => {
    const {isLoggedIn} = useNoteAppContext();

    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    } else {
        return children;
    }
}