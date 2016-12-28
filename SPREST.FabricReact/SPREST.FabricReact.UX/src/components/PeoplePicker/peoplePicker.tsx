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
     * Global Variables
     */

    // The search query promise
    _promise = null;

    // The query string
    _queryString = "";

    // The search results
    _results = {};

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
                items.splice(0, items.length - 1);

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
    }

    // Method to query the people picker api for the inputed text
    private resolveSuggestions(filterText: string, currentPersonas: IPersonaProps[]): IPersonaProps[] | PromiseLike<IPersonaProps[]> {
        // Save the query string
        this._queryString = filterText.toLowerCase();

        // See if we have already searched for this result
        if (this._results[this._queryString] != null) { return this._results[this._queryString]; }

        // See if we are executing a query
        if (this._promise != null) { return this._promise }

        // Ensure the min required characters has been entered
        if (filterText.length < 3) { return this._promise }

        // Create a promise
        this._promise = new Promise((resolve, reject) => {
            // Wait two seconds before querying for the user
            setTimeout(() => {
                // Query for the people
                (new $REST.PeoplePicker())
                    // Set the search query
                    .clientPeoplePickerSearchUser({
                        MaximumEntitySuggestions: 10,
                        QueryString: filterText
                    })
                    // Execute the request
                    .execute((results: $REST.Types.IPeoplePickerSearchUser) => {
                        let personas = [];

                        // Add the result
                        let key = filterText.toLowerCase();
                        this._results[key] = [];

                        // Parse the results
                        for (let result of results.ClientPeoplePickerSearchUser) {
                            let persona = {
                                key: result.Key,
                                primaryText: result.DisplayText,
                                secondaryText: result.EntityData.Email
                            };

                            // Add the persona to the results array
                            this._results[key].push(persona);

                            // Ensure the persona matches the query string
                            // Note - This is to ensure the latest query string is applied
                            if (result.DisplayText.toLowerCase().indexOf(this._queryString) >= 0) {
                                // Add the persona
                                personas.push(persona);
                            }
                        }

                        // Resolve the promise
                        resolve(personas);

                        // Clear the promise
                        this._promise = null;
                    });
            }, 2000);
        });

        // Return the promise
        return this._promise;
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