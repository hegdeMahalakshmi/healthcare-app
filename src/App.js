import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import { routesConfig } from "./Routes/routes";
import RouteComponent from "./RouteComponent";
function App() {
  return (
    <>
      <Router>
        <Routes>
          {routesConfig.map((route) => (
            <Route
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
      </Router>
    </>
  );
}

export default App;

