import React from 'react';
import { white } from '@material-ui/core/colors/';
import Typography from '@material-ui/core/Typography';

class FormHeader extends React.Component {

    render() {
		const { onRegister } = this.props;
		const styles = {
			explainSubtitle: {
				textAlign: 'center',
				 marginBottom: "20px",
				  fontSize: "small"
			},
			setupHeader: {
                textAlign: "center",
                marginBottom: 15,
            }
        };
        
        return (
            <div>
                <Typography
                    style={styles.setupHeader}
                    variant="headline"
                    classes={{root: 'SetupForm-heading'}}
                >
                    {this.props.title}
                </Typography>

                <div style={styles.explainSubtitle}>
                    {this.props.explain}
                </div>
            </div>
        );
    }
}
        
export default FormHeader;