import * as React from 'react';
import { ManifestT, EmojisT } from './commonTypes';
import ReactionEmoji from './ReactionEmoji';

type PropsT = {
  manifest: ManifestT,
  onFlowCompleteCb: Function
};

class ReactionFlow extends React.Component<PropsT> {
  private emojiTypes: string[];
  private numInProgress: number;

  constructor(props: PropsT) {
    super(props);
    this.emojiTypes = emojiObjToArray(this.props.manifest.emojis);
    this.numInProgress = this.emojiTypes.length;
    this.checkProgress = this.checkProgress.bind(this);
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const ReactionEmjis = this.emojiTypes.map((emojiType, i) => {
      const region = this.props.manifest.region;
      return <ReactionEmoji key={i} type={emojiType} region={region} onAnimationCompleteCb={this.checkProgress} />;
    });
    return (
      <div>
        {ReactionEmjis}
      </div>
    ); 
  }

  checkProgress() {
    this.numInProgress--;
    if (this.numInProgress === 0) {
      this.props.onFlowCompleteCb();
    }
  }

}

function emojiObjToArray(obj: EmojisT) {
  const arry: string[] = [];
  const keys = Object.keys(obj);
  keys.forEach(key => {
    let freq = obj[key];
    for (let i = 0; i < freq; i++) {
      arry.push(key);
    }
  });
  return arry; 
}

export {ManifestT};
export default ReactionFlow;