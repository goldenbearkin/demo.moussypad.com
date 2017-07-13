import * as React from 'react';

// UI
import { Card, CardActions, CardMedia } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const styles = {
  cardActions: {
    padding: 5,
    width: '100%',
    textAlign: 'right'
  }
};

type PropsT = {
  thumbnailURL: string;
  style?: React.CSSProperties;
};

class PresentationCard extends React.Component<PropsT> {
  render() {
    return (
      <div style={this.props.style}>
        <Card>
          <CardMedia style={{ borderBottom: 'medium solid grey' }}>
            <img src={this.props.thumbnailURL} alt="" />
          </CardMedia>
          <CardActions style={styles.cardActions}>
             <FlatButton label="Present" /> 
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default PresentationCard;