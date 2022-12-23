// @ts-nocheck
import React, { Component } from "react";

interface AnimatedTextureProps {
  /** Array of images the animated texture uses */
  frames: string[];
  /** The interval on which each frame is changed, in milliseconds */
  delay: number;
  /** A set of extra classes added into the component */
  className?: string;
  /** CSS style, same as any component */
  style?: object;
  /** Callback for action when clicked */
  onClick?(...args: unknown[]): unknown;
}

/**
 * An animated texture is an image than changes frames on a regular interval
 * It's similar to a gif, but it's using a set of frames as different images.
 *
 * @version 1.0.0
 * @since 1.0.0
 * @author [Ramiro Rojo](https://github.com/holywyvern)
 */
export default class AnimatedTexture extends Component<AnimatedTextureProps> {
  static contextTypes = {
    ticker: object
  };

  constructor(props: AnimatedTextureProps, context = null) {
    super(props, context);
    const { delay } = this.props;
    this.state = {
      currentFrame: 0,
      currentDelay: delay
    };
  }

  componentWillReceiveProps(nextProps: { delay: any; frames: any; }) {
    if (nextProps.delay === this.props.delay) {
      return;
    }
    if (nextProps.frames.length !== this.props.frames) {
      return this.setupAnimation(nextProps);
    }
    for (let i = 0; i < nextProps.frames.length; ++i) {
      if (nextProps.frames[i] !== this.props.frames[i]) {
        return this.setupAnimation(nextProps);
      }
    }
  }

  componentDidMount() {
    this.__ticker = null;
    // @ts-ignore
    this.setupTicker(this.props);
  }

  componentWillUnmount() {
    this.removeTicker();
  }

  setupAnimation({ delay, frames }) {
    this.setupTicker({ delay, frames });
    this.setState({
      currentFrame: 0,
      currentDelay: delay
    });
  }

  removeTicker() {
    if (this.__ticker !== null) {
      this.__ticker.detach();
      this.__ticker = null;
    }
  }

  setupTicker({ delay, frames }) {
    this.removeTicker();
    if (delay > 0 && frames.length > 1) {
      const { ticker } = this.context;
      this.__ticker = ticker.add(this.onFrameUpdate);
    }
  }

  onFrameUpdate = (delta: number) => {
    const { delay, frames } = this.props;
    let { currentFrame, currentDelay } = this.state;
    currentDelay -= delta;
    while (currentDelay <= 0) {
      currentDelay += delay;
      currentFrame += 1;
    }
    currentFrame = currentFrame % frames.length;
    this.setState({ currentFrame, currentDelay });
  };

  onClick = () => {
    const { onClick } = this.props;
    if (typeof onClick === "function") {
      onClick();
    }
  };

  render() {
    const { frames, ...props } = this.props;
    const { currentFrame } = this.state;
    return (
      <img
        key="img"
        onClick={this.onClick}
        src={frames[currentFrame]}
        alt=""
      />
    );
  }
}
