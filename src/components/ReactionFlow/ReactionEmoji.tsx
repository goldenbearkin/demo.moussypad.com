import * as React from 'react';
import { TimelineLite, Circ, Bounce } from 'gsap';
import { RegionT } from './commonTypes';

const like = require('./like.svg');
const angry = require('./angry.svg');
const happy = require('./happy.svg');

type PropsT = {
  region: RegionT;
  type: string;
  onAnimationCompleteCb: Function;
};

const emojiMap = new Map();
emojiMap.set('like', like);
emojiMap.set('angry', angry);
emojiMap.set('happy', happy);

function randomRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

class ReactionEmoji extends React.Component<PropsT, {}> {
  private img: HTMLImageElement | null;

  componentDidMount() {
    if (this.img === null) {
      return;
    }

    const translateY = randomRange(this.props.region.y, this.props.region.y + this.props.region.height);
    // const translateX = randomRange(this.region.x + (this.region.width * 0.8), this.region.x + this.region.width);
    const translateX = 100;
    const endScale = randomRange(0, 1);

    const tl = new TimelineLite();
    tl
      .to(this.img, 0, { scale: 0 })
      .to(this.img, 0.3, { scale: 1.3 })
      .to(this.img, 0.35, { scale: 1 }, 'sin')
      .to(this.img, 5, { top: `${translateY}vh`, ease: Bounce.easeOut }, 'sin')
      .to(this.img, 5, { left: `${translateX}vw`, scale: endScale, ease: Circ.easeIn, onComplete: this.props.onAnimationCompleteCb }, 'sin');
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const style: React.CSSProperties = {
      position: 'absolute',
      top: `${randomRange(this.props.region.y, this.props.region.y + this.props.region.height)}vh`,
      left: `${randomRange(this.props.region.x, this.props.region.x + (this.props.region.width * 0.05))}vw`,
      width: '3vmax'
    };

    return (
      <img ref={img => this.img = img} src={emojiMap.get(this.props.type)} style={style} alt="emoji" />
    );
  }
}

export default ReactionEmoji;