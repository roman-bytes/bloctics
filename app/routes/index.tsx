// @ts-nocheck
import IsometricTile from "~/components/IsometricTile";
import IsometricObject from "~/components/IsometricObject";
import IsometricMap from "~/components/IsometricMap";

const mapWidth = 11;
const mapHeight = 11;
const heights = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1,
];

export default function Index() {

  console.log('render');
  return (
    <div className="flex justify-center">
      <IsometricMap
        mapWidth={mapWidth}
        mapHeight={mapHeight}
        tileSize={48}
        slabSize={12}
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
              style={{
                "--background-floor": '#f3f3f3',
                "--background-left-wall": 'red',
                "--background-right-wall": 'blue'
              }}
              onEnter={(e) => {
                e.target.style.backgroundColor = "pink";
              }}
              onLeave={(e) => {
                e.target.style.backgroundColor = "#f3f3f3";
              }}
            />,
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
                active={true}
                onEnter={(e) => {
                  console.log('hoover', e.target);
                  const tile = e.target.closest('.react-isometric-tile');

                  console.log('tile', tile);
                }}
                onLeave={() => {
                  console.log('leave');
                }}
                onClick={() => {
                  console.log('cclicked');
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
