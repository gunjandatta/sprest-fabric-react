/// <reference path="../../../node_modules/gd-sprest/dist/gd-sprest.d.ts" />
import * as React from "react";
import { Promise } from "es6-promise";
import {
    IBasePickerSuggestionsProps,
    IPersonaProps,
    ListPeoplePicker,
    NormalPeoplePicker
} from "office-ui-fabric-react";

/**
 * People Picker Properties
 */
export interface IPeoplePickerProps {
    /** The SP internal field name. */
    fieldName?: string;

    /** Flag to determine if multiple values is allowed */
    multiple?: boolean;

    /** The on change event. */
    onChange?: (fieldName: string, persona: $REST.Types.IUser) => any;

    /** The people picker properties */
    pickerProps?: IBasePickerSuggestionsProps;
}

/**
 * People Picker State
 */
export interface IPeoplePickerState {    
    /** The people picker properties */
    pickerProps?: IBasePickerSuggestionsProps;

    /** The promise used to return the user search results */
    promise?: PromiseLike<IPersonaProps[]>;

    /** The query string */
    queryString?: string;
}

/**
 * People Picker Default Properties
 */
const DefaultProps: IBasePickerSuggestionsProps = {
    /** The loading text */
    loadingText: "Loading...",

    /** Text displayed when no results are found */
    noResultsFoundText: "No results found",

    /** Text displayed when displaying suggestions */
    suggestionsHeaderText: "Suggested People"
};

/**
 * People Picker
 */
export class PeoplePicker extends React.Component<IPeoplePickerProps, IPeoplePickerState> {
    /**
     * Constructor
     */
    constructor(props: IPeoplePickerProps) {
        super(props);

        // Default the state values
        this.state = { pickerProps: props.pickerProps || {}, queryString: "" };
        this.state.pickerProps.loadingText = this.state.pickerProps.loadingText || DefaultProps.loadingText;
        this.state.pickerProps.noResultsFoundText = this.state.pickerProps.noResultsFoundText || DefaultProps.noResultsFoundText;
        this.state.pickerProps.suggestionsHeaderText = this.state.pickerProps.suggestionsHeaderText || DefaultProps.suggestionsHeaderText;
    }

    /**
     * Methods
     */

    // The on change event
    private onChange(items?: Array<IPersonaProps>) {
        // See if more than one item has been selected
        if (items && items.length > 0) {
            // See if this is a single people picker
            if (!this.props.multiple) {
                // Remove all items but the last one
                items.splice(0, items.length - 1)
            }

            // Get the web
            (new $REST.Web())
                // Get the user
                .ensureUser(items[0].key)
                // Execute the request
                .execute((user: $REST.Types.IUser) => {
                    // Call the on change event
                    this.props.onChange(this.props.fieldName, user.existsFl ? user : null);
                });
        }
    }

    // Method to query the people picker api for the inputed text
    private resolveSuggestions(filterText: string, currentPersonas: IPersonaProps[]): IPersonaProps[] | PromiseLike<IPersonaProps[]> {
        // Set the query string
        this.setState({ queryString: filterText });

        // Ensure the min required characters has been entered
        if (filterText.length < 3) { return this.state.promise || []; }

        // Return if the promise already exists
        if (this.state.promise) { return this.state.promise; }

        // Create a promise
        let promise = new Promise((resolve, reject) => {
            // Wait 1/2 a second before querying for the user
            setTimeout(() => {
                // Ensure the user has typed in at least 3 characters
                if (this.state.queryString.length >= 3) {
                    // Query for the people picker
                    (new $REST.PeoplePicker())
                        // Set the search query
                        .clientPeoplePickerSearchUser({
                            MaximumEntitySuggestions: 10,
                            QueryString: filterText
                        })
                        // Execute the request
                        .execute((results: $REST.Types.IPeoplePickerSearchUser) => {
                            let personas = [];

                            // Parse the results
                            for (let result of results.ClientPeoplePickerSearchUser) {
                                // Add the persona
                                personas.push({
                                    key: result.Key,
                                    primaryText: result.DisplayText,
                                    secondaryText: result.EntityData.Email
                                });
                            }

                            // Resolve the promise
                            resolve(personas);

                            // Update the state
                            this.setState({ queryString: "", promise: null });
                        });
                }
            }, 500);
        });

        // Save the promise
        this.setState({ promise: promise });

        // Return the promise
        return promise;
    }

    // Render the component
    render() {
        return (
            this.props.multiple ?
                <NormalPeoplePicker
                    onChange={items => this.onChange(items)}
                    onResolveSuggestions={(filterText, currentPersonas) => this.resolveSuggestions(filterText, currentPersonas)}
                    getTextFromItem={(persona: IPersonaProps) => persona.primaryText}
                    pickerSuggestionsProps={this.state.pickerProps}
                    className={'ms-PeoplePicker'}>
                </NormalPeoplePicker>
                :
                <ListPeoplePicker
                    onChange={items => this.onChange(items)}
                    onResolveSuggestions={(filterText, currentPersonas) => this.resolveSuggestions(filterText, currentPersonas)}
                    getTextFromItem={(persona: IPersonaProps) => persona.primaryText}
                    pickerSuggestionsProps={this.state.pickerProps}
                    className={'ms-PeoplePicker'}>
                </ListPeoplePicker>
        );
    }
}