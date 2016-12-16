import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    CommandBar
} from "office-ui-fabric-react";
import {
    Dashboard
} from "./components/dashboard";

// Render the examples
ReactDOM.render((
    <div>
        <Dashboard />
    </div>
), document.querySelector("#main"));