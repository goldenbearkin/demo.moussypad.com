import * as React from 'react';

// UI
import { Card, CardActions, CardMedia } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import PresentationMode from '../PresentationMode/PresentationMode';

const styles = {
  cardActions: {
    padding: 5,
    width: '100%',
    textAlign: 'right'
  }
};

type PropsT = {
  presentationId: string;
  thumbnailURL: string;
  style?: React.CSSProperties;
};

type StateT = {
  isPresent: boolean;
};

class PresentationCard extends React.Component<PropsT, StateT> {
  constructor(props: PropsT) {
    super(props);
    this.state = {
      isPresent: false
    };
    this.handlClick = this.handlClick.bind(this);
    this.exitFullscreenHandler = this.exitFullscreenHandler.bind(this);
  }

  render() {
    if (this.state.isPresent) {
      return (
        <PresentationMode
          presentationId={this.props.presentationId}
          exitFullscreenHandler={this.exitFullscreenHandler}
        />
      );
    }

    return (
      <div style={this.props.style}>
        <Card>
          <CardMedia style={{ borderBottom: 'medium solid grey' }}>
            <img src={this.props.thumbnailURL} alt="" />
          </CardMedia>
          <CardActions style={styles.cardActions}>
            <FlatButton label="Present" onClick={this.handlClick} />
          </CardActions>
        </Card>
      </div>
    );
  }

  private handlClick() {
    this.setState({ isPresent: true });
  }

  private exitFullscreenHandler() {
    this.setState({ isPresent: false });
  }
}

export default PresentationCard;