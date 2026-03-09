import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Birthday from "../pages/birthday";
import Clips from "../pages/Clips";
import Home from "../pages/home";
import PacCan from "../pages/PacCan";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path={"/"} element={<Home />} />
      <Route path={"/birthday"} element={<Birthday />} />
      <Route path={"/clips"} element={<Clips />} />
      <Route path={"/pac-can"} element={<PacCan />} />
    </Route>
  )
);
