import { SnackbarProvider } from "notistack";
import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../Utils/ProtecterateRoute";
import "../assets/style/style.scss";
import Dashboard from "./Dashboard";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Header from "../Component/Header";
import AddNotes from "./AddNotes/AddNotes";
import EditNotes from "./EditNotes/EditNotes";
import ViewNotes from "./ViewNotes/ViewNotes";

function App() {
  return (
    <SnackbarProvider
      maxSnack={4}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      autoHideDuration={3000}
      style={{
        success: { backgroundColor: "#00b74a", color: "#ffffff" },
        error: { backgroundColor: "#f93154", color: "#ffffff" },
        warning: { backgroundColor: "#ffa900", color: "#ffffff" },
        info: { backgroundColor: "#39c0ed", color: "#ffffff" },
      }}
    >
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/AddNotes" element={<AddNotes />} />
          <Route path="/EditNotes/:id" element={<EditNotes />} />
          <Route path="/ViewNotes/:id" element={<ViewNotes />} />
        </Route>
      </Routes>
    </SnackbarProvider>
  );
}

export default App;
