// @ts-ignore
import IsometricMap, { IsometricTile, IsometricObject } from 'react-isometric-tilemap';

const mapWidth = 11;
const mapHeight = 11;
const heights = [
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
];

export default function Index() {
  return (
    <div className="flex justify-center">
      <IsometricMap
        mapWidth={mapWidth}
        mapHeight={mapHeight}
        tileSize={48}
        slabSize={12}
        offsetY={100}
      >
        {heights.map((z, index) => {
          if (z === 0) {
            return null;
          }
          const x = index % mapWidth;
          const y = Math.floor(index / mapWidth);
          const result = [
            <IsometricTile
              key={`tile${index}`}
              x={x}
              y={y}
              z={z}
            />
          ];
          if (Math.random() < 0.1) {
            result.push(
              <IsometricObject
                key={`object${index}`}
                x={x}
                y={y}
                z={z}
                width={32}
                height={32}
                frames={["./4.png"]}
                active
                onEnter={() => {
                  console.log('event');
                }}
                onClick={() => {
                  console.log('cclicked');
                }}
                onMouseAction={() => {
                  console.log('action');
                }}
              />
            );
          }
          return result;
        })}
      </IsometricMap>
    </div>
  );
}
