import * as React from 'react';
import ReactionFlow, { ManifestT } from '../ReactionFlow/ReactionFlow';

const like = require('./like.svg');
const happy = require('./happy.svg');
const angry = require('./angry.svg');

type PropsT = {
  style?: React.CSSProperties;
};

type StateT = {
  manifests: ManifestT[];
};

class ReactionPanel extends React.Component<PropsT, StateT> {
  private incrKey = 0;
  
  constructor() {
    super();
    this.state = {
      manifests: []
    };
  }

  render() {
    const ReactionFlows = this.state.manifests.map((manifest, i) => (
      <ReactionFlow key={manifest.id} manifest={manifest} onFlowCompleteCb={this.handleFlowComplete(i)} />
    ));
    return (
      <div>
        {ReactionFlows}
        <img src={like} style={{ width: 50, padding: 10 }} onClick={this.handleClick('like')} alt="like"/>
        <img src={happy} style={{ width: 50, padding: 10 }} onClick={this.handleClick('happy')} alt="happy"/>
        <img src={angry} style={{ width: 50, padding: 10 }} onClick={this.handleClick('angry')} alt="angry"/>
      </div>
    );
  }

  private handleClick(emojiType: string) {
    const manifest: ManifestT = {
      id: this.incrKey++,
      region: {
        x: 0,
        y: 0,
        width: 100,
        height: 20
      },
      emojis: {
        [emojiType]: 1
      }
    };
    return () => (
      this.setState({ manifests: [...this.state.manifests, manifest] })
    );
  }

  private handleFlowComplete = (index: number) => {
    return () => {
      this.state.manifests.splice(index, 1);
      this.setState({ manifests: this.state.manifests });
    };
  }
}

export default ReactionPanel;