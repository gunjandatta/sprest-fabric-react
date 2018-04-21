import * as React from "react";
import {
    DatePicker,
    DayOfWeek
} from "office-ui-fabric-react";
import {
    Strings
} from "./strings";

/**
 * Datepicker Properties
 */
export interface IDatepickerDemoProps {
    visible: any;
}

// Date picker
export class DatepickerDemo extends React.Component<IDatepickerDemoProps, any> {
    public render() {
        let {visible} = this.props;

        return (
            !visible ? <div /> :
            <div>
                <h1>Demo</h1>
                <div className="ms-Grid">
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-md3">
                            <DatePicker
                                label="Select a Date"
                                isRequired={true}
                                firstDayOfWeek={DayOfWeek.Sunday}
                                strings={Strings}
                                placeholder='Select a date...'
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}