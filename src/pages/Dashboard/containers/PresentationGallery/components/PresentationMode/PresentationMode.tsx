import * as React from 'react';
import ExitFullscreenButton from './ExitFullscreenButton';

type PropsT = {
  presentationId: string;
  exitFullscreenHandler: () => void;
};

type StateT = {
  width: number | string;
  height: number | string;
};

class PresentationMode extends React.Component<PropsT, StateT> {
  private divRef: HTMLDivElement | null;
  private iframeRef: HTMLIFrameElement | null;

  constructor() {
    super();
    this.handleExitFullscreen = this.handleExitFullscreen.bind(this);
  }

  componentDidMount() {
    document.addEventListener('webkitfullscreenchange', event => {
      if (!document.webkitFullscreenElement) {
        this.props.exitFullscreenHandler();
      }
    });

    if (this.divRef && this.iframeRef) {
      this.divRef.webkitRequestFullScreen();
      this.iframeRef.focus();
    }
  }

  render() {
    return (
      <div ref={ref => this.divRef = ref}>
        <iframe
          ref={ref => this.iframeRef = ref}
          // src={`https://docs.google.com/presentation/d/${this.props.presentationId}/embed?start=false&loop=false&delayms=3000`}
          src={`https://docs.google.com/presentation/d/${this.props.presentationId}/embed`}
          frameBorder={0}
          style={{ width: '100vw', height: '100vh' }}
        />
        <div onClick={this.handleExitFullscreen}>
          <ExitFullscreenButton />
        </div>
      </div>
    );
  }

  private handleExitFullscreen() {
    document.webkitExitFullscreen();
  }
}

export default PresentationMode;