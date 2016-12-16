import * as React from "react";
import {
    Dropdown
} from "office-ui-fabric-react";

/**
 * Properties
 */
interface IDropdownDemoProps {
    visible?: boolean;
}

/**
 * Dropdown Demo
 */
export class DropdownDemo extends React.Component<IDropdownDemoProps, any> {
    /**
     * Events
     */

    // Property changed event
    componentWillReceiveProps(props:any) {
    }

    /**
     * Methods
     */

    // Render the component
    render() {
        return !this.props.visible ? <div /> :
        (
            <h1>Create Demo</h1>
        );
    }
}