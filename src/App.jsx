import { Route, Routes } from "react-router-dom";

import { Sidebar } from "./layout/Sidebar";
import { useEffect, useState } from "react";
import { Header } from "./layout/header";
import { routes } from "./router";
import ProtectedRoute from "./components/ProtectedRoute";
import { Home1 } from "./pages/home1";
import { dispatchAction } from "./app/store";
import { setAuthToken } from "./features/authSlice";

function App() {
  const token = localStorage.getItem("auth_token");

  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    dispatchAction(setAuthToken(token || ""));
  }, [token]);

  return (
    <>
      <div
        style={{
          height: "100dvh",
          width: "100vw",
          display: "flex",
          overflow: "hidden",
        }}
      >
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          <Header />

          <main
            style={{
              flexGrow: 1,
              overflow: "auto",
            }}
          >
            <Routes>
              {routes.map((route) => (
                <Route key={route.path} path={route.path} element={route.component} />
              ))}

              {/* Protected Routes */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home1 />
                  </ProtectedRoute>
                }
              />

              <Route
                path="*"
                /*Go to path - "/" */ element={
                  <div className="text-gray-500 font-bold text-7xl w-full text-center mt-44 ">
                    The page you’re looking <br /> for can’t be found.
                  </div>
                }
              />
            </Routes>
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
