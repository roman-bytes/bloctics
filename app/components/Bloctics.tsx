// @ts-nocheck
import React, { useState } from "react";
import IsometricMap from "~/components/IsometricMap";
import IsometricTile from "~/components/IsometricTile";

// Units
import Knight from "~/components/units/Knight";
import FireMage from "~/components/units/FireMage";
import Assassin from "~/components/units/Assassin";
import Priest from "~/components/units/Priest";
import Ranger from "~/components/units/Ranger";
import Mage from "~/components/units/Mage";

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
  { starter: true, class: "assassin" },
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

function Bloctics(props) {
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
                if(e.area === 'right-wall' || e.area === 'left-wall') return;
                e.target.style.backgroundColor = "#82A67C";
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
            switch (z.class) {
              case('knight'): {
                result.push(
                  <Knight
                    key={z.class + x + y}
                    x={x}
                    y={y}
                    z={1}
                    unit={z.class}
                  />
                );
              }
              break;

              case('fire-mage'): {
                result.push(
                  <FireMage
                    key={z.class + x + y}
                    x={x}
                    y={y}
                    z={1}
                    unit={z.class}
                  />
                )
              }
              break;

              case('assassin'): {
                result.push(
                  <Assassin
                    key={z.class + x + y}
                    x={x}
                    y={y}
                    z={1}
                    unit={z.class}
                  />
                )
              }
              break;

              case('priest'): {
                result.push(
                  <Priest
                    key={z.class + x + y}
                    x={x}
                    y={y}
                    z={1}
                    unit={z.class}
                  />
                )
              }
              break;

              case('ranger'): {
                result.push(
                  <Ranger
                    key={z.class + x + y}
                    x={x}
                    y={y}
                    z={1}
                    unit={z.class}
                  />
                )
              }
              break;

              case('mage'): {
                result.push(
                  <Mage
                    key={z.class + x + y}
                    x={x}
                    y={y}
                    z={1}
                    unit={z.class}
                  />
                )
              }
            }
          }

          return result;
        })}
      </IsometricMap>
    </div>
  );
}

export default Bloctics;
