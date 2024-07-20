import IsometricObject from "~/components/IsometricObject";
import { getClassAsset } from "~/util";

type PriestProps = {
  x: number;
  y: number;
  z: number;
  unit: string;
}

function Priest({ x, y, z, unit }: PriestProps) {
  const unitStats = {
    movement: 4,
    attack: 1,
    damage: 10, // todo: random generator
    position: "N", // todo: add in constants
    location: { x, y },
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

export default Priest;
