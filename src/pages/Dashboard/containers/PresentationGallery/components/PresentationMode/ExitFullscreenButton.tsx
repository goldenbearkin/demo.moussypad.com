import * as React from 'react';

const exit = require('./exitFullscreen.png');

const style: React.CSSProperties = {
  width: 24,
  height: 24,
  backgroundColor: '#323232',
  position: 'fixed',
  left: 272,
  bottom: 5
};

class ExitFullscreenButton extends React.Component {
  render() {
    return <img style={style} src={exit} alt={'exit'} />;
  }
}

export default ExitFullscreenButton;