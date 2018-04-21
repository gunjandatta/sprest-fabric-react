import * as React from "react";
import {
    Dialog,
    DialogType,
    TextField
} from "office-ui-fabric-react";
import {
    Data,
    IData
} from "./data";

/**
 * Properties
 */
export interface IViewItemDialogProps {
    closeDialog: any;
    item: IData;
    visible?: boolean;
}

/**
 * State
 */
export interface IViewItemDialogState {}

/**
 * View Item Dialog
 */
export class ViewItemDialog extends React.Component<IViewItemDialogProps, IViewItemDialogState> {
    // Render the component
    render() {
        return (
            <Dialog
                isBlocking={true}
                isOpen={this.props.visible}
                title="Location"
                type={DialogType.close}
                onDismiss={() => this.props.closeDialog()}>
                <TextField
                    label="City:"
                    readOnly={true}
                    value={this.props.item.Title} />
                <TextField
                    label="County:"
                    readOnly={true}
                    value={this.props.item.County} />
                <TextField
                    label="State:"
                    readOnly={true}
                    value={this.props.item.State} />
            </Dialog>
        );
    }
}