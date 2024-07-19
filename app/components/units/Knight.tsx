import IsometricObject from "~/components/IsometricObject";
import { getClassAsset } from "~/util";

type KnightProps = {
  x: number;
  y: number;
  z: number;
  unit: string;
}

function Knight({ x, y, z, unit }: KnightProps) {
  const unitStats = {
    movement: 4,
    attack: 1,
    damage: 10, // todo: random generator
    position: "N", // todo: add in constants
  };

  return (
      <IsometricObject
        x={x}
        width={64}
        y={y}
        z={z}
        height={64}
        frames={[getClassAsset(unit)]}
        active={true}
        onEnter={() => {
          console.log('ENTERED')
        }}
        onLeave={() => {
          console.log('LEAVE')
        }}
        onClick={() => {
          console.log('CLICKED22', unitStats)
        }}
      />
  )
}

export default Knight;