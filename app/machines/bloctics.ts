import { createMachine } from "xstate";

export const bloctics = createMachine({
  "id": "Bloctics",
  "initial": "intro",
  "states": {
    "Settings": {
      "initial": "Menu",
      "states": {
        "Menu": {
          "on": {
            "closeMenu": {
              "target": "#Bloctics.intro"
            }
          }
        }
      }
    },
    "Game": {
      "initial": "Game Init",
      "states": {
        "Player Turn": {
          "initial": "Active",
          "states": {
            "Active": {
              "on": {
                "endTurn": {
                  "target": "EndTurn"
                },
                "charMove": {
                  "target": "IdleMove"
                },
                "charAttack": {
                  "target": "IdleAttack"
                },
                "giveUp": {
                  "target": "#Bloctics.Game.End Game"
                },
                "charPosition": {
                  "target": "IdlePosition"
                }
              }
            },
            "IdleMove": {
              "on": {
                "endTurn": {
                  "target": "EndTurn"
                },
                "charAttack": {
                  "target": "IdleAttack"
                },
                "move": {
                  "target": "IdleAttack"
                },
                "charPosition": {
                  "target": "IdlePosition"
                }
              }
            },
            "IdleAttack": {
              "on": {
                "endTurn": {
                  "target": "EndTurn"
                },
                "charPosition": {
                  "target": "IdlePosition"
                },
                "attack": {
                  "target": "IdlePosition"
                }
              }
            },
            "IdlePosition": {
              "on": {
                "endTurn": {
                  "target": "EndTurn"
                },
                "position": {
                  "target": "EndTurn"
                }
              }
            },
            "EndTurn": {
              "type": "final",
              "entry": [
                "endGame",
                "endTurn"
              ],
              "on": {
                "passTurn": {
                  "target": "Active"
                },
                "endGame": {
                  "target": "#Bloctics.Game.End Game"
                }
              }
            }
          }
        },
        "Game Init": {
          "on": {
            "Ready Check": {
              "target": "Player Turn",
              "cond": "ready",
              "actions": [
                "placeBlocs",
                "whoGoesFirst"
              ]
            }
          }
        },
        "End Game": {}
      }
    },
    "intro": {
      "on": {
        "Game Start": {
          "target": "Game"
        },
        "Settings": {
          "target": "Settings"
        }
      }
    }
  }
  ,
  schema: {
    context: {} as {

    },
    events: {} as {"type": "Game Start"}| {"type": "closeMenu"}| {"type": "endTurn"}| {"type": "passTurn"}| {"type": "endGame"}| {"type": "position"}| {"type": "charPosition"}| {"type": "attack"}| {"type": "charAttack"}| {"type": "move"}| {"type": "charMove"}| {"type": "Ready Check"}| {"type": "giveUp"}| {"type": "Settings"}
  },
  context: {},
  predictableActionArguments: true,
  preserveActionOrder: true,
});
