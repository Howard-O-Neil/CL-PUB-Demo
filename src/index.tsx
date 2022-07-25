import * as React from "react";
import * as ReactDom from "react-dom";
import "@/libs/all.min"

import App from "@/App";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

ReactDom.render(
  <App />
  ,
  document.getElementById("root")
);
