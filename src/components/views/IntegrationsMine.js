import React from 'react';
import View from '../View';
import Error from '../Error';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CloudCircle from '@material-ui/icons/CloudCircle';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {withTheme} from "@material-ui/core/styles/index";

export class MineIntegrations extends React.Component {

    state = {
        loading: true,
        error: false,
        deleteWorkflow: false,
        workflows: {},
    }

    componentDidMount() {
        this.loadAllWorkflows();
    }

    loadAllWorkflows() {
        fetch('/api/workflows', {credentials: 'include'}).then(res =>
            res.json().then(body => {
                if (res.ok) {
                    this.setState({
                        workflows: body.data,
                        loading: false,
                    });
                } else {
                    this.setState({
                        error: body,
                        loading: false,
                    });
                }
            })
        );
    }

    onClickConfigure(id) {
        alert(`You clicked CONFIGURE on workflow id ${id}`);
    }

    onClickStart(id) {
        alert('Implement me!');
    }

    onClickStop(id) {
        alert('Implement me!');
    }

    onClickDelete(id) {
        this.setState({
            deleteWorkflow: id
        })
    }

    deleteWorkflow(id) {
        return fetch('/api/delete', {
            credentials: 'include',
            body: JSON.stringify({
                id: id,
            }),
            headers: {
                'content-type': 'application/json',
            },
            method: 'POST',
            credentials: 'include',

        });
    }

    buildDeleteConfirmDialog() {
        return <Dialog
            open={this.state.deleteWorkflow}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete this workflow?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    const id = this.state.deleteWorkflow;
                    this.deleteWorkflow(id).then(res => {
                        this.setState({deleteWorkflow: false});
                        this.loadAllWorkflows();
                    })
                }} color="secondary">
                    Yes
                </Button>
                <Button onClick={() => {
                    this.setState({deleteWorkflow: false})
                }} color="primary" autoFocus>
                    No
                </Button>
            </DialogActions>
        </Dialog>
    }

    buildWorkflowDetails(id, enabled) {
        const styles = {
            controls: {
                marginLeft: "10px"
            },
            button: {
                width: "100%",
                marginBottom: "10px"
            }
        }

        const startButton = <Button style={styles.button} onClick={() => this.onClickStop(id)} variant="contained"
                                    color="primary">Start</Button>
        const stopButton = <Button style={styles.button} onClick={() => this.onClickStop(id)} variant="contained"
                                   color="secondary">Stop</Button>

        return <ExpansionPanelDetails>

            <div id="Logs">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                malesuada
                lacus ex,
                sit amet blandit leo lobortis eget.
            </div>

            <div id="Controls" style={styles.controls}>
                <Button style={styles.button} onClick={() => this.onClickConfigure(id)} variant="contained"
                        color="primary">Configure</Button>
                {enabled ? stopButton : startButton}
                <Button style={styles.button} onClick={() => this.onClickDelete(id)} variant="contained"
                        color="secondary">Delete</Button>
            </div>

        </ExpansionPanelDetails>
    }

    buildList(templates) {
        console.log(templates);
        const colors = {
            positive: this.props.theme.palette.primary.main,
            negative: this.props.theme.palette.secondary.main,
        }

        return (
            <div>
                <Typography variant="headline" style={{margin: "20px"}}>
                    My Workflows
                </Typography>
                <div>
                    <div>
                        <List>

                            {
                                templates.map(({name, id, enabled}, index) =>
                                    <ListItem key={index}>
                                        <ExpansionPanel>
                                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                                <CloudCircle/>
                                                <Typography>{name}
                                                    <span style={{
                                                        marginLeft: "5px",
                                                        backgroundColor: enabled ? colors.positive : colors.negative,
                                                        color: "white",
                                                        borderRadius: "5px",
                                                        padding: "2px",
                                                    }}>{enabled ? "enabled" : "disabled"}</span>
                                                </Typography>
                                            </ExpansionPanelSummary>
                                            {this.buildWorkflowDetails(id, enabled)}
                                        </ExpansionPanel>
                                    </ListItem>
                                )
                            }

                        </List>
                    </div>
                </div>
            </div>
        );
    }

    render() {

        let data;

        if (this.state.loading) {
            data = <CircularProgress/>;
        } else {
            data = this.state.error ?
                <Error msg={this.state.error}/> :
                this.buildList(this.state.workflows);
        }

        return (
            <View>
                {this.buildDeleteConfirmDialog()}
                {data}
            </View>
        );
    }

}

export default withTheme()(MineIntegrations);