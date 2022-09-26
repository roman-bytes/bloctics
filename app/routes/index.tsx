// @ts-nocheck
import IsometricTile from "~/components/IsometricTile";
import IsometricObject from "~/components/IsometricObject";
import IsometricMap from "~/components/IsometricMap";

const mapWidth = 11;
const mapHeight = 11;
const mapLayout = [
  0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0
];

export default function Index() {

  console.log('render');
  return (
    <div className="flex justify-center">
      <IsometricMap
        mapWidth={mapWidth}
        mapHeight={mapHeight}
        tileSize={78}
        slabSize={12}
      >
        {mapLayout.map((z, index) => {
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
                "--background-floor": '#52754C',
                "--background-left-wall": '#815E4A',
                "--background-right-wall": '#815E4A'
              }}
              onEnter={(e) => {
                e.target.style.backgroundColor = "pink";
              }}
              onLeave={(e) => {
                console.log('e', e);
                const area = e.area;
                switch (area) {
                  case 'floor':
                    e.target.style.backgroundColor = "#52754C";
                    break;
                  case 'right-wall':
                    e.target.style.backgroundColor = '#815E4A';
                    break;
                  case 'left-wall':
                    e.target.style.backgroundColor = '#815E4A';
                    break;
                }
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
                width={64}
                height={64}
                frames={["./4.png"]}
                active={true}
                onEnter={(e) => {

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
