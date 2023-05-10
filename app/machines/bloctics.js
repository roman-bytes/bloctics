import { createMachine, assign } from "xstate";

export const bloctics = createMachine({
  id: "Bloctics",
  initial: "intro",
  states: {
    Settings: {
      initial: "Menu",
      states: {
        Menu: {
          on: {
            closeMenu: {
              target: "#Bloctics.intro",
            },
          },
        },
      },
    },
    Game: {
      initial: "Game Init",
      states: {
        "Player Turn": {
          initial: "Active",
          states: {
            IdleMove: {
              on: {
                endTurn: {
                  target: "EndTurn",
                },
                charAttack: {
                  target: "IdleAttack",
                },
                move: {
                  target: "IdleAttack",
                },
                charPosition: {
                  target: "IdlePosition",
                },
              },
            },
            IdleAttack: {
              on: {
                endTurn: {
                  target: "EndTurn",
                },
                charPosition: {
                  target: "IdlePosition",
                },
                attack: {
                  target: "IdlePosition",
                },
              },
            },
            IdlePosition: {
              on: {
                endTurn: {
                  target: "EndTurn",
                },
                position: {
                  target: "EndTurn",
                },
              },
            },
            EndTurn: {
              entry: ["endGame", "endTurn"],
              on: {
                endGame: {
                  target: "#Bloctics.Game.End Game",
                },
                passTurn: {
                  target: "Active",
                },
              },
              type: "final",
            },
            Active: {
              on: {
                endTurn: {
                  target: "EndTurn",
                },
                charMove: {
                  target: "IdleMove",
                },
                charAttack: {
                  target: "IdleAttack",
                },
                giveUp: {
                  target: "#Bloctics.Game.End Game",
                },
                charPosition: {
                  target: "IdlePosition",
                },
              },
            },
          },
        },
        "Game Init": {
          on: {
            "Ready Check": {
              target: "Player Turn",
              cond: "ready",
              actions: ["placeBlocs", "whoGoesFirst"],
            },
          },
        },
        "End Game": {},
      },
    },
    intro: {
      tags: 'pause',
      on: {
        "Play Game": {
          target: "Game Setup",
        },
        Settings: {
          target: "Settings",
        },
      },
    },
    "Game Setup": {
      initial: "Init",
      states: {
        Init: {
          tags: "pause",
          on: {
            "Create Room": {
              target: "Create Confirm",
              actions: ["generateRoomCode", "createRoom"],
            },
            "Join Room": {
              target: "Enter Code",
            },
          },
        },
        "Create Confirm": {
          tags: "pause",
          on: {
            "Pass Init": {
              target: "#Bloctics.Game.Game Init",
              actions: ["twoPlayerCheck", "readyCheck"],
            },
            "Join Room": {
              target: "Enter Code",
            }
          },
        },
        "Player Lobby": {
          tags: "pause",
          on: {
            "Pass Init": {
              target: "#Bloctics.Game.Game Init",
              actions: ["twoPlayerCheck", "readyCheck"],
            },
            "Join Room": {
              target: "Enter Code",
            }
          },
        },
        "Enter Code": {
          tags: "pause",
          on: {
            "Create Room": {
              target: "Create Confirm",
              actions: ["generateRoomCode", "createRoom"]
            },
            "Submit Code": {
              target: "Player Lobby",
            },
          },
        },
      },
    },
  },
  context: {
    roomCode: '',
  },
  predictableActionArguments: true,
  preserveActionOrder: true,
}, {
  actions: {
    generateRoomCode: assign({
      roomCode: () => (Math.random() + 1).toString(36).substring(7),
    }),
    createRoom: () => {}
  }
});
