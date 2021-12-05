import React from 'react';
import * as ReactDOM from "react-dom";
import App from "./components/App.component";

var mountNode = document.getElementById("app");
ReactDOM.render(
    <React.StrictMode>
        <App name="Jane" />
    </React.StrictMode>,
    mountNode
);