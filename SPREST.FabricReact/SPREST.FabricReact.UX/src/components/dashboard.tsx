import * as React from "react";
import {
    CommandBar,
    IContextualMenuItem
} from "office-ui-fabric-react";
import {
    DatepickerDemo,
    DropdownDemo,
    PeoplePickerDemo
} from ".";

/**
 * Dashboard
 */
export class Dashboard extends React.Component<any, any> {
    /**
     * Constructor
     */
    constructor(props) {
        super(props);

        // Default the state
        this.state = {
            ShowDatepicker: true,
            ShowDropdown: false,
            ShowPeoplePicker: false
        }
    }

    /**
     * Menu Items
     * Note - event.preventDefault() is needed for the SP App, otherwise a postback will occur.
     */
    MenuItems:Array<IContextualMenuItem> = [
        {
            key: "datepicker",
            name: "Date Picker",
            ariaLabel: "Displays the date picker example.",
            onClick: event => { event.preventDefault(); this.setState({ ShowDatepicker: true, ShowDropdown: false, ShowPeoplePicker: false }); }
        },
        {
            key: "dropdown",
            name: "Drop Down List",
            ariaLabel: "Displays the drop down list example.",
            onClick: event => { event.preventDefault(); this.setState({ ShowDatepicker: false, ShowDropdown: true, ShowPeoplePicker: false }); }
        },
        {
            key: "peoplePicker",
            name: "People Picker",
            ariaLabel: "Displays the people picker example.",
            onClick: event => { event.preventDefault(); this.setState({ ShowDatepicker: false, ShowDropdown: false, ShowPeoplePicker: true }); }
        }
    ];

    /**
     * Methods
     */

    // Render the component
    render() {
        return (
            <div>
                <CommandBar items={this.MenuItems} />
                <DatepickerDemo visible={this.state.ShowDatepicker} />
                <DropdownDemo visible={this.state.ShowDropdown} />
                <PeoplePickerDemo visible={this.state.ShowPeoplePicker} />
            </div>
        );
    }
}