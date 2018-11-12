import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import {withTheme} from "@material-ui/core/styles/index";
import React from 'react';
import Loading from './Loading';
import {get} from 'lodash';

import {
    updateSolutionInstanceConfig,
} from '../api/solutions';

export class Instance extends React.PureComponent {
    state = {
        error: false,
        loading: false,
        instanceState: undefined,
    };

    onClickConfigure = () => {
        // Must open window from user interaction code otherwise it is likely
        // to be blocked by a popup blocker:
        const configWindow = window.open(
            undefined,
            '_blank',
            'width=500,height=500,scrollbars=no'
        );
        updateSolutionInstanceConfig(this.props.id).then(({body}) => {
            // After we generate the popup URL, set it to the previously opened
            // window:
            configWindow.location = body.data.popupUrl;
        });
    };

    onExpansionChange = () => {
    };

    render() {
        const {id, name} = this.props;

        const enabled = get(this.state, 'instanceState', this.props.enabled);

        const styles = {
            controls: {
                marginLeft: "10px",
                float: "right",
            },
            pill: {
                backgroundColor: enabled ? "#7ebc54" : "#df5252",
                borderRadius: "4px",
                marginRight: "10px",
                color: "white",
                padding: "3px 5px",
            },
            item: {
                width: '100%',
                border: 'none',
            },
            name: {
                marginTop: '2px'
            },
            button: {
                width: "100%",
                marginBottom: "10px"
            },
        };

        return (
            <Loading loading={this.state.loading}>
                <ExpansionPanel
                    key={id}
                    style={styles.item}
                    onChange={this.onExpansionChange}
                >
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <span style={styles.pill}>
                            {enabled ? "enabled" : "disabled"}
                        </span>
                        <Typography style={styles.name}>
                            {name}
                        </Typography>
                    </ExpansionPanelSummary>

                    <ExpansionPanelDetails>
                        <div id="Controls" style={styles.controls}>
                            <Button
                                style={styles.button}
                                onClick={this.onClickConfigure}
                                variant="outlined"
                                color="primary"
                            >
                                Configure
                            </Button>
                        </div>

                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </Loading>
        );
    }

}

export default withTheme()(Instance);