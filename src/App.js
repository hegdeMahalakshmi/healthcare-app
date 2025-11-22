import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import { routesConfig } from "./Routes/routes";
import RouteComponent from "./RouteComponent";
import { AuthProvider } from "./context/AuthContext";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <ErrorBoundary>
            <Routes>
              {routesConfig.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <RouteComponent
                      layout={route.layout}
                      component={route.component}
                    />
                  }
                />
              ))}
            </Routes>
          </ErrorBoundary>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;

