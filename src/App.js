import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routeHandling/routes";
function App() {
  return (
    <div className="w-full h-full min-h-[100vh] bg-bodyColor text-lightText px-4">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
