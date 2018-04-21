import * as React from "react";
import {
    Dropdown,
    IDropdownOption,
    Label
} from "office-ui-fabric-react";
import {
    Data,
    IData
} from "./data";

/**
 * Properties
 */
export interface IDropdownDemoProps {
    visible?: boolean;
}

/**
 * State
 */
export interface IDropdownDemoState {
    // Cities
    Cities?: IDropdownOption[];

    // Counties
    Counties?: IDropdownOption[];

    // Selected Item
    SelectedItem?: IData;

    // States
    States?: IDropdownOption[];
}

/**
 * Dropdown Demo
 */
export class DropdownDemo extends React.Component<IDropdownDemoProps, IDropdownDemoState> {
    data: IData[] = [];

    /**
     * Constructor
     */
    constructor(props: IDropdownDemoProps) {
        super(props);

        // Default the state
        this.state = {
            Cities: [],
            Counties: [],
            SelectedItem: {
                City: "",
                County: "",
                State: ""
            },
            States: []
        };

        // Get the data
        Data.get().then((data: IData[]) => {
            // Save a reference to the data
            this.data = data;

            // Parse the data
            for (let i = 0; i < data.length; i++) {
                let prevState: IDropdownOption = this.state.States.length > 0 ? this.state.States[this.state.States.length - 1] : null;

                // Remove duplicates
                if (prevState && prevState.key == data[i].State) {
                    continue;
                }

                // Add the value
                this.state.States.push({
                    key: data[i].State,
                    text: data[i].State
                });
            }
        });
    }

    /**
     * Events
     */

    // County change event
    private onCountyChange(option: IDropdownOption) {
        let cities: IDropdownOption[] = [];

        // Update the selected values
        let item = {
            City: "",
            County: option.text,
            State: this.state.SelectedItem.State
        };

        // Parse the data
        for (let data of this.data) {
            let prevState: IDropdownOption = cities.length > 0 ? cities[cities.length - 1] : null;

            // Remove duplicates
            if (prevState && prevState.key == data.City) {
                continue;
            }

            // See if this is the selected state and county
            if (data.County == option.key && data.State == item.State) {
                // Add the county
                cities.push({
                    key: data.City,
                    text: data.City
                });
            }
        }

        // Update the state
        this.setState({ Cities: cities, SelectedItem: item });
    }

    // State change event
    private onStateChange(option: IDropdownOption) {
        let counties: IDropdownOption[] = [];

        // Update the selected values
        let item = {
            City: "",
            County: "",
            State: option.text
        }

        // Parse the data
        for (let data of this.data) {
            let prevState: IDropdownOption = counties.length > 0 ? counties[counties.length - 1] : null;

            // Remove duplicates
            if (prevState && prevState.key == data.County) {
                continue;
            }

            // See if this is the selected state
            if (data.State == option.key) {
                // Add the county
                counties.push({
                    key: data.County,
                    text: data.County
                });
            }
        }

        // Update the state
        this.setState({ Cities: [], Counties: counties, SelectedItem: item });
    }

    // Render the component
    render() {
        return !this.props.visible ? <div /> :
            (
                <div>
                    <h1>Demo</h1>
                    <div className="ms-Grid">
                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-md3">
                                <Dropdown
                                    label="State"
                                    onChanged={option => this.onStateChange(option)}
                                    options={this.state.States}
                                    selectedKey={this.state.SelectedItem.State}
                                    />
                            </div>
                        </div>
                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-md3">
                                <Dropdown
                                    label="County"
                                    onChanged={option => this.onCountyChange(option)}
                                    options={this.state.Counties}
                                    selectedKey={this.state.SelectedItem.County}
                                    />
                            </div>
                        </div>
                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-md3">
                                <Dropdown
                                    label="City"
                                    options={this.state.Cities}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            );
    }
}