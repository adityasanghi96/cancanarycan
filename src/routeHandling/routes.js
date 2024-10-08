import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Birthday from "../pages/birthday";
import Home from "../pages/home";
import PacCan from "../pages/PacCan";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      {/* //! ------------- A U T H ------------- */}
      {/* <Route path={LOGIN} element={<LoginPage />} /> */}
      <Route path={"/"} element={<Home />} />
      <Route path={"/birthday"} element={<Birthday />} />
      <Route path={"/pac-can"} element={<PacCan />} />
    </Route>
  )
);
