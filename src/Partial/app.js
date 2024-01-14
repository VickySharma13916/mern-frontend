import { SnackbarProvider } from "notistack";
import React, { Suspense, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "../Component/Header";
import Loader from "../Component/Loader";
import SideBar from "../Component/SideBar";
import ProtectedRoute from "../Utils/ProtecterateRoute";
import "../assets/style/style.scss";
// Lazy-loaded components
const Login = React.lazy(() => import("./auth/Login"));
const Register = React.lazy(() => import("./auth/Register"));
const Notes = React.lazy(() => import("./Notes"));
const AddNotes = React.lazy(() => import("./Notes/AddNotes"));
const EditNotes = React.lazy(() => import("./Notes/EditNotes"));
const ViewNotes = React.lazy(() => import("./Notes/ViewNotes"));
function App() {
  const [isUserLogin, SetIsUserLogin] = useState(false);
  useEffect(() => {
    SetIsUserLogin(localStorage.getItem("user"));
  }, [isUserLogin]);
  return (
    <div className="w-100 layout position-relative">
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
        <Header SetIsUserLogin={SetIsUserLogin} />
        {isUserLogin && <SideBar />}
        <main className={`${isUserLogin ? "main-container" : "w-100 ms-0"}`}>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route
                path="/"
                element={<Login SetIsUserLogin={SetIsUserLogin} />}
              />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<ProtectedRoute />}>
                <Route path="/notes" element={<Notes />} />
                <Route path="/AddNotes" element={<AddNotes />} />
                <Route path="/EditNotes/:id" element={<EditNotes />} />
                <Route path="/ViewNotes/:id" element={<ViewNotes />} />
              </Route>
            </Routes>
          </Suspense>
        </main>
      </SnackbarProvider>
    </div>
  );
}

export default App;
