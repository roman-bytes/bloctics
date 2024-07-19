import IsometricObject from "~/components/IsometricObject";
import { getClassAsset } from "~/util";

type UnitProps = {
  x: number;
  y: number;
  z: number;
  unit: string;
}

function FireMage({ x, y, z, unit }: UnitProps) {
  const unitStats = {
    movement: 0,
    attack: 0,
    damage: 0,
    position: 'N'
  }

  return (
    <IsometricObject
      x={x}
      width={64}
      y={y}
      z={1}
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
        console.log('CLICKED', unitStats)
      }}
    />
  )
}

export default FireMage;