import * as React from "react";
import {
    CommandBar,
    IContextualMenuItem
} from "office-ui-fabric-react";
import { DatepickerDemo } from "./Datepicker";
import { DropdownDemo } from "./Dropdown";
import { ListDemo } from "./List";
import { PeoplePickerDemo } from "./PeoplePicker";

/**
 * Dashboard State
 */
export interface IDashboardState {
    ShowDatepicker: boolean,
    ShowDropdown: boolean,
    ShowList: boolean,
    ShowPeoplePicker: boolean
};

/**
 * Dashboard
 */
export class Dashboard extends React.Component<any, IDashboardState> {
    /**
     * Constructor
     */
    constructor(props) {
        super(props);

        // Default the state
        this.state = {
            ShowDatepicker: true,
            ShowDropdown: false,
            ShowList: false,
            ShowPeoplePicker: false
        }
    }

    /**
     * Menu Items
     * Note - event.preventDefault() is needed for the SP App, otherwise a postback will occur.
     */
    MenuItems: Array<IContextualMenuItem> = [
        {
            key: "datepicker",
            name: "Date Picker",
            ariaLabel: "Displays the date picker example.",
            onClick: event => { event.preventDefault(); this.setState({ ShowDatepicker: true, ShowDropdown: false, ShowList: false, ShowPeoplePicker: false }); }
        },
        {
            key: "dropdown",
            name: "Drop Down",
            ariaLabel: "Displays the drop down list example.",
            onClick: event => { event.preventDefault(); this.setState({ ShowDatepicker: false, ShowDropdown: true, ShowList: false, ShowPeoplePicker: false }); }
        },
        {
            key: "list",
            name: "List",
            ariaLabel: "Displays the list example.",
            onClick: event => { event.preventDefault(); this.setState({ ShowDatepicker: false, ShowDropdown: false, ShowList: true, ShowPeoplePicker: false }); }
        },
        {
            key: "peoplePicker",
            name: "People Picker",
            ariaLabel: "Displays the people picker example.",
            onClick: event => { event.preventDefault(); this.setState({ ShowDatepicker: false, ShowDropdown: false, ShowList: false, ShowPeoplePicker: true }); }
        }
    ];

    /**
     * Methods
     */

    // Render the component
    render() {
        let { ShowDatepicker, ShowDropdown, ShowList, ShowPeoplePicker } = this.state;
        return (
            <div>
                <CommandBar items={this.MenuItems} />
                <DatepickerDemo visible={ShowDatepicker} />
                <DropdownDemo visible={ShowDropdown} />
                <ListDemo visible={ShowList} />
                <PeoplePickerDemo visible={ShowPeoplePicker} />
            </div>
        );
    }
}