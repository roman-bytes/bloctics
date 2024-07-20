// @ts-nocheck
import React, { Component } from "react";

import AnimatedTexture from "./AnimatedTexture";

import IsometricMapEvent from "../events/IsometricMapEvent";

import hoverSound from "../../public/sounds/hover_sound_2.wav";


// import "./IsometricObject.scss";

function getTileBelowObject(el) {
  let parent = el.parentElement;
  let tile = parent.previousElementSibling;
  return tile.querySelector('.floor');
}


interface IsometricObjectProps {
  /** The x position of the map (from 0 to map width - 1) */
  x: number;
  /** The y position of the map (from 0 to map height - 1) */
  y: number;
  /** The width of the object */
  width: number;
  /** The height of the object */
  height: number;
  /** The height of the object it will be lifted off the ground as z * map slab size */
  z?: number;
  /** If the object is active, it will catch events, also have less transparency */
  active?: boolean;
  /** Extra css classes you want to add into the object */
  className?: string;
  /** extra style you wish to apply into te object */
  style?: object;
  /** A list of strings, each string having an uri of each frame */
  frames?: string[];
  /** An interval between each frame */
  delay?: number;
  /** Name of current unit */
  unit: string;
  /** An even triggered when the user clicks on the object */
  onClick?(...args: unknown[]): unknown;
  /** An event triggered when the user moves the mouse over the object */
  onEnter?(...args: unknown[]): unknown;
  /** An event triggered when the user moves the mouse out of the object */
  onLeave?(...args: unknown[]): unknown;
  /** Callback for any mouse event */
  onMouseAction?(...args: unknown[]): unknown;
}

/**
 * An isometric object is everything than is not  a tile or a character.
 * They can be animated and over any tile.
 * They are used for decorations than don't look like a floor piece, like trees, rocks
 * or buildings.
 *
 * @version 1.0.0
 * @since 1.0.0
 * @author [Ramiro Rojo](https://github.com/holywyvern)
 */
export default class IsometricObject extends Component<IsometricObjectProps> {
  static defaultProps = {
    z: 0,
    delay: 0,
    active: false
  };

  onClick = (e: { stopPropagation: () => void; }) => {
    const { unit, x, y, onClick, onMouseAction, active } = this.props;
    if (!active) return;
    console.log('position', {x, y});
    console.log('from object comp', e.target);

    switch (unit) {
      case('knight'): {

      }
      break;
    }

    const event = new IsometricMapEvent(this, x, y, "click", "object");
    e.stopPropagation();
    if (typeof onMouseAction === "function") {
      onMouseAction(event);
    }
    if (typeof onClick === "function") {
      console.log('TARGET IME', event);
      onClick(event);
    }
  };

  onMouseEnter = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { x, y, onEnter, onMouseAction, active } = this.props;
    if (!active) return;
    const event = new IsometricMapEvent(e.target, x, y, "enter", "object");
    e.stopPropagation();
    if (typeof onMouseAction === "function") {
      onMouseAction(event);
    }
    if (typeof onEnter === "function") {
      onEnter(event);
    }

    let floor = getTileBelowObject(e.target);
    floor.style.background = '#82A67C';
  };

  onMouseLeave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { x, y, onLeave, onMouseAction, active } = this.props;
    if (!active) return;
    const event = new IsometricMapEvent(e.target, x, y, "leave", "object");
    e.stopPropagation();
    if (typeof onMouseAction === "function") {
      onMouseAction(event);
    }
    if (typeof onLeave === "function") {
      onLeave(event);
    }
    let floor = getTileBelowObject(e.target);
    floor.style.background = '#52754C';
  };

  render() {
    const {
      x,
      y,
      z,
      width,
      height,
      active,
      className,
      style,
      frames,
      delay,
    } = this.props;
    const vars = {
      ...(style || {}),
      "--x": x,
      "--y": y,
      "--z": z,
      "--object-width": width,
      "--object-height": height
    };
    const classes = ["react-isometric-object-wrapper"];
    if (className) classes.push(className);
    if (active) {
      classes.push("active");
    }

    const hover = new Audio(hoverSound);
    hover.volume = 0.1;
    return (
      <div className={classes.join(" ")} style={vars}>
        <div
          className="react-isometric-object"
          onClick={this.onClick}
          onMouseLeave={(e) => this.onMouseLeave(e)}
          onMouseEnter={(e) => {
            this.onMouseEnter(e);
            hover.play();
          }}
          onEnter={this.onMouseEnter}
          onLeave={this.onMouseLeave}
        >
          {frames ? <AnimatedTexture frames={frames} delay={delay} /> : null}
        </div>
      </div>
    );
  }
}
