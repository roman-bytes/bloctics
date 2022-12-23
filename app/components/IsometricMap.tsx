// @ts-nocheck
import React, { Component } from "react";
import MiniSignal from "mini-signals";
import raf from "raf";

// import "./IsometricMap.scss";
import IsometricMapEvent from "../events/IsometricMapEvent";

interface IsometricMapProps {
  /** The width of the map, in tiles */
  mapWidth: number;
  /** The height of the map, in tiles */
  mapHeight: number;
  /**
   * The size of the tile. It represents the width of the horizontal diagonal
   * and double the size of the vertical diagonal */
  tileSize: number;
  /** The size of a tile lifting per it's z height */
  slabSize: number;
  /** A CSS unit for dimensions, usually 1px */
  sizeUnit?: string;
  /**
   * The margin of the tile, this margins are extra space drawed by the tiles than you
   * can use to apply some details into the tile, and make maps look less squared
   */
  margin?: {
    /** The top margin, used by the floor */
    top: number,
    /** The bottom margin, used by the floor and the bottom part of the wall  */
    bottom: number,
    /** The left margin, used by everything */
    left: number,
    /** The right margin, used by everything */
    right: number
  };
  /** An offset to move the map down, usefull to show the height properly */
  offsetY?: number;
  /** Callback for users interacting with the map */
  onMouseAction?(...args: unknown[]): unknown;
  /** Callback called when you press the mouse down */
  onMouseDown?(...args: unknown[]): unknown;
  /** Callback called when you press the mouse up */
  onMouseUp?(...args: unknown[]): unknown;
  /** Callback called when the mouse enters the map */
  onMouseEnter?(...args: unknown[]): unknown;
  /** Callback called when the mouse exists the map */
  onMouseLeave?(...args: unknown[]): unknown;
}

/**
 * An isometric map is a container for isometric objects and isometric tiles.
 * It provides basic functionallity
 *
 * @version 1.0.0
 * @since 1.0.0
 * @author [Ramiro Rojo](https://github.com/holywyvern)
 */
class IsometricMap extends Component<IsometricMapProps> {
  static defaultProps = {
    sizeUnit: "1px",
    offsetY: 0,
    margin: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    }
  };

  static childContextTypes = {
    /** The ticker is an object than can handle events on frame update.
     * It calls when a new frame is triggered with request animation frame
     */
    ticker: { }
  };

  constructor(props) {
    super(props);
    this.ticker = new MiniSignal();
  }

  componentDidMount() {
    this.__isMounted = true;
    this.__lastUpdate = Date.now();
    raf(this.onFrameUpdate);
  }

  componentWillUnmount() {
    this.__isMounted = false;
  }

  getChildContext() {
    return {
      ticker: this.ticker
    };
  }

  onFrameUpdate = delta => {
    if (!this.__isMounted) return;
    raf(this.onFrameUpdate);
    const now = Date.now();
    this.ticker.dispatch(now - this.__lastUpdate);
    this.__lastUpdate = now;
  };

  onMouseDown = e => {
    if (e.button === 0) {
      const { onMouseDown, onMouseAction } = this.props;
      const event = new IsometricMapEvent(this, -1, -1, "down", "map");
      if (typeof onMouseAction === "function") {
        onMouseAction(event);
      }
      if (typeof onMouseDown === "function") {
        onMouseDown(event);
      }
    }
  };

  onMouseUp = e => {
    if (e.button === 0) {
      const { onMouseUp, onMouseAction } = this.props;
      const event = new IsometricMapEvent(this, -1, -1, "up", "map");
      if (typeof onMouseAction === "function") {
        onMouseAction(event);
      }
      if (typeof onMouseUp === "function") {
        onMouseUp(event);
      }
    }
  };

  onMouseEnter = e => {
    if (e.button === 0) {
      const { onMouseEnter, onMouseAction } = this.props;
      const event = new IsometricMapEvent(this, -1, -1, "enter", "map");
      if (typeof onMouseAction === "function") {
        onMouseAction(event);
      }
      if (typeof onMouseEnter === "function") {
        onMouseEnter(event);
      }
    }
  };

  onMouseLeave = e => {
    if (e.button === 0) {
      const { onMouseLeave, onMouseAction } = this.props;
      const event = new IsometricMapEvent(this, -1, -1, "leave", "map");
      if (typeof onMouseAction === "function") {
        onMouseAction(event);
      }
      if (typeof onMouseLeave === "function") {
        onMouseLeave(event);
      }
    }
  };

  render() {
    console.log('THIS IS LOCCAL');
    const {
      children,
      mapWidth,
      mapHeight,
      tileSize,
      slabSize,
      sizeUnit,
      margin,
      offsetY
    } = this.props;
    const vars = {
      "--map-width": mapWidth,
      "--map-height": mapHeight,
      "--tile-size": tileSize,
      "--slab-size": slabSize,
      "--size-unit": sizeUnit,
      "--margin-top": margin.top,
      "--margin-bottom": margin.bottom,
      "--margin-left": margin.left,
      "--margin-right": margin.right,
      "--map-max-dimension": Math.max(mapWidth, mapHeight),
      "--map-offset-y": offsetY
    };
    return (
      <div
        className="react-isometric-map-wrapper"
        style={vars}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        <div className="react-isometric-map">{children}</div>
      </div>
    );
  }
}

export default IsometricMap;
