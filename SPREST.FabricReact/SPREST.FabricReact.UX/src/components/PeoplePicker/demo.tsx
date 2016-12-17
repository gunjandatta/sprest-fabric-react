import * as React from "react";
import {
    Label
} from "office-ui-fabric-react";
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
            <div>
                <h1>Demo</h1>
                <div className="ms-Grid">
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-u-md3">
                            <Label>Single User</Label>
                            <PeoplePicker />
                        </div>
                        <div className="ms-Grid-col ms-u-md3">
                            <Label>Multiple Users</Label>
                            <PeoplePicker multiple={true} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}