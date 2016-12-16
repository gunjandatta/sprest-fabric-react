import * as React from "react";
import {
    PeoplePicker
} from "./peoplepicker";

/**
 * Properties
 */
interface IPeoplePickerDemoProps {
    visible?: boolean;
}

/**
 * People Picker Demo
 */
export class PeoplePickerDemo extends React.Component<IPeoplePickerDemoProps, any> {
    // Render the component
    render() {
        return !this.props.visible ? <div /> :
        (
            <h1>TO DO</h1>
        );
    }
}