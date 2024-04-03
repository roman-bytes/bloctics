import React from "react";
import { Form } from "@remix-run/react";

// @ts-ignore
function GameSetup({ showCreate, showJoin, context }) {
  // @ts-ignore
  return (
    <div
      id="defaultModal"
      tabIndex={-1}
      aria-hidden="true"
      className="h-modal fixed top-0 left-0 right-0 z-50 flex w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-white/30 p-4 backdrop-blur-md md:inset-0 md:h-full"
    >
      <div className="relative h-full w-full max-w-2xl md:h-auto">
        <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
          <div className="flex items-start justify-between rounded-t border-b p-4 dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Create or Join a Room
            </h3>
            <Form method="post" className="inline">
              <input type="hidden" name="type" value="Exit" />
              <button
                type="submit"
                className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="defaultModal"
              >
                <svg
                  aria-hidden="true"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </Form>
          </div>
          <div className="space-y-6 p-6">
            <div className="flex w-full">
              <div className="card bg-base-300 rounded-box grid flex-grow place-items-center text-center text-white">
                <h4 className="mb-3 text-lg font-extrabold">Create room:</h4>
                <p>Share this code with your friend to start the game.</p>
                <Form method="post" className="inline">
                  <input type="hidden" name="type" value="Create Room" />
                  <button
                    type="submit"
                    className="mt-4 rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Create
                  </button>
                </Form>
              </div>
              <div className="divider divider-horizontal mr-2 border-r pl-2 dark:border-gray-600" />
              <div className="card bg-base-300 rounded-box grid flex-grow place-items-center text-center text-white">
                <h4 className="mb-3 text-lg font-extrabold">Join Room:</h4>
                <p>Already have a code? Enter it to join your friend.</p>
                <Form method="post" className="inline">
                  <input type="hidden" name="type" value="Join Room" />
                  <button
                    type="submit"
                    className="mt-4 rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Join
                  </button>
                </Form>
              </div>
            </div>
          </div>
          <Form method="post" className="inline">
            <input type="hidden" name="type" value="Pass Init" />
            {showCreate && (
              <div className="flex items-center space-x-2 rounded-b border-t border-gray-200 p-6 dark:border-gray-600">
                <label className="text-white">Room Code:</label>
                <input
                  type="text"
                  className="center rounded-md border border-white bg-transparent p-3 text-center text-xl text-white"
                  value={context.roomCode}
                />
                <button
                  type="submit"
                  className="mt-4 rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Join Lobby
                </button>
              </div>
            )}
            {showJoin && (
              <div className="flex items-center space-x-2 rounded-b border-t border-gray-200 p-6 dark:border-gray-600">
                <label className="text-white">Room Code:</label>
                <input
                  type="text"
                  className="center rounded-md border border-white bg-transparent p-3 text-center text-xl text-white"
                  value=""
                />
                <button
                  type="submit"
                  className="mt-4 rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Join Lobby
                </button>
              </div>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
}

export default GameSetup;
