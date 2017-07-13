import * as React from 'react';

const loading = require('./loading.gif');

const style: React.CSSProperties = {
  width: '100vw',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

class Loading extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div style={style}>
        <img style={{ width: '20vmax' }} src={loading} alt="loading" />
      </div>
    );
  }
}

export default Loading;