// @ts-nocheck
import IsometricTile from "~/components/IsometricTile";
import IsometricObject from "~/components/IsometricObject";
import IsometricMap from "~/components/IsometricMap";
import { getClassAsset, highlightTile, unHighlightTile } from "~/util";

const mapWidth = 11;
const mapHeight = 11;
const mapLayout = [
  null,
  null,
  {},
  {},
  {},
  { starter: true, class: "priest" },
  {},
  {},
  {},
  null,
  null,
  null,
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  null,
  {},
  {},
  {},
  {},
  { starter: true, class: "knight" },
  { starter: true, class: "knight" },
  { starter: true, class: "knight" },
  {},
  {},
  {},
  {},
  {},
  {},
  { starter: true, class: "fire-mage" },
  { starter: true, class: "assassian" },
  {},
  {},
  {},
  { starter: true, class: "mage" },
  { starter: true, class: "ranger" },
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  null,
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  null,
  null,
  null,
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  null,
  null,
];

export default function Index() {
  console.log("render");
  return (
    <div className="flex justify-center">
      <IsometricMap
        mapWidth={mapWidth}
        mapHeight={mapHeight}
        tileSize={78}
        slabSize={12}
      >
        {mapLayout.map((z, index) => {
          if (z === null) {
            return null;
          }
          const x = index % mapWidth;
          const y = Math.floor(index / mapWidth);
          const result = [
            <IsometricTile
              key={`tile${index}`}
              x={x}
              y={y}
              z={1}
              style={{
                "--background-floor": "#52754C",
                "--background-left-wall": "#815E4A",
                "--background-right-wall": "#815E4A",
              }}
              onEnter={(e) => {
                e.target.style.backgroundColor = "pink";
              }}
              onLeave={(e) => {
                const area = e.area;
                switch (area) {
                  case "floor":
                    e.target.style.backgroundColor = "#52754C";
                    break;
                  case "right-wall":
                    e.target.style.backgroundColor = "#815E4A";
                    break;
                  case "left-wall":
                    e.target.style.backgroundColor = "#815E4A";
                    break;
                }
              }}
            />,
          ];

          if (z.starter) {
            result.push(
              <IsometricObject
                key={`object${index}`}
                x={x}
                y={y}
                z={1}
                width={64}
                height={64}
                frames={[getClassAsset(z.class)]}
                active={true}
                onEnter={(e) => {
                  highlightTile(e.target);
                }}
                onLeave={(e) => {
                  unHighlightTile(e.target);
                }}
                onClick={() => {
                  console.log("cclicked");
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
