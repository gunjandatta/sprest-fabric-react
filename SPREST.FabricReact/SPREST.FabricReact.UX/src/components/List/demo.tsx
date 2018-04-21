import * as React from "react";
import {
    DefaultButton,
    IconButton,
    ButtonType,
    DetailsList,
    SelectionMode
} from "office-ui-fabric-react";
import {
    Data,
    IData,
    NewItemPanel,
    ViewItemDialog
} from ".";

/**
 * Properties
 */
export interface IListDemoProps {
    visible?: boolean;
}

/**
 * State
 */
export interface IListDemoState {
    Items?: IData[];
    SelectedItem?: IData;
    ShowDialog?: boolean;
    ShowPanel?: boolean;
}

/**
 * List Demo
 */
export class ListDemo extends React.Component<IListDemoProps, IListDemoState> {
    /**
     * Constructor
     */
    constructor(props: IListDemoProps) {
        super(props);

        // Default the state
        this.state = {
            Items: [],
            SelectedItem: { County: "", State: "", Title: "" },
            ShowDialog: false,
            ShowPanel: false
        };

        // Get the data
        Data.get().then((data: IData[]) => {
            // Update the state
            this.setState({ Items: data });
        });
    }

    /**
     * Methods
     */

    // Render cell event
    private onRenderItemColumn(item, index, column) {
        // See if this is the 'Title' column
        if (column.key == "Title") {
            // Return the view item button
            return (
                <DefaultButton
                    buttonType={ButtonType.normal}
                    onClick={event => {
                        // Disable postback
                        event.preventDefault();

                        // Update the state
                        this.setState({
                            SelectedItem: item,
                            ShowDialog: true
                        });
                    }}>
                    {item[column.key]}
                </DefaultButton>
            );
        }

        // Return the field value
        return item[column.key];
    }

    // Render the component
    render() {
        return !this.props.visible ? <div /> :
            (
                <div>
                    <h1>Demo</h1>
                    <IconButton
                        buttonType={ButtonType.hero}
                        iconProps={{ iconName: "Add" }}
                        onClick={event => { event.preventDefault(); this.setState({ ShowPanel: true }); }}>
                        New Location
                    </IconButton>
                    <DetailsList
                        items={this.state.Items}
                        onRenderItemColumn={(item, index, column) => this.onRenderItemColumn(item, index, column)}
                        selectionMode={SelectionMode.none}
                    />
                    <ViewItemDialog
                        closeDialog={() => this.setState({ ShowDialog: false })}
                        item={this.state.SelectedItem}
                        visible={this.state.ShowDialog}
                    />
                    <NewItemPanel
                        closePanel={() => this.setState({ ShowPanel: false })}
                        visible={this.state.ShowPanel}
                    />
                </div>
            );
    }
}