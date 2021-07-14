import React from "react";
import CommonRoute from "./components/Router";
import Snackbars from "./components/Snackbar";

export default function App(props) {
   let auth = true;

   return (
      <>
         <Snackbars />
         <CommonRoute />
        </>

   );
}
