import React from "react";
import { Form } from "@remix-run/react";

// @ts-ignore
function GameSetup({ showCreate, showJoin, context }) {
  // @ts-ignore
  return (
    <div id="defaultModal" tabIndex={-1} aria-hidden="true" className="flex items-center justify-center backdrop-blur-md bg-white/30 fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
      <div className="relative w-full h-full max-w-2xl md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Create or Join a Room
            </h3>
            <Form method="post" className="inline">
              <input type="hidden" name="type" value="Exit" />
              <button type="submit" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                <span className="sr-only">Close modal</span>
              </button>
            </Form>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex w-full">
              <div className="grid flex-grow card bg-base-300 rounded-box place-items-center text-center text-white">
                <h4 className="font-extrabold text-lg mb-3">Create room:</h4>
                <p>Share this code with your friend to start the game.</p>
                <Form method="post" className="inline">
                  <input type="hidden" name="type" value='Create Room' />
                  <button
                    type="submit"
                    className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Create
                  </button>
                </Form>
              </div>
              <div className="divider divider-horizontal mr-2 pl-2 border-r dark:border-gray-600" />
              <div className="grid flex-grow card bg-base-300 rounded-box place-items-center text-center text-white">
                <h4 className="font-extrabold text-lg mb-3">Join Room:</h4>
                <p>Already have a code? Enter it to join your friend.</p>
                <Form method="post" className="inline">
                  <input type="hidden" name="type" value='Join Room' />
                  <button
                    type="submit"
                    className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Join
                  </button>
                </Form>
              </div>
            </div>
          </div>
          {showCreate && (
            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <label className="text-white">Room Code:</label>
              <input type="text" className="center text-xl text-center text-white bg-transparent border border-white p-3 rounded-md" value={context.roomCode} />
              <button
                type="submit"
                className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Join Lobby
              </button>
            </div>
            )
          }
          {showJoin && (
            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <label className="text-white">Room Code:</label>
              <input type="text" className="center text-xl text-center text-white bg-transparent border border-white p-3 rounded-md" value="" />
              <button
                type="submit"
                className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Join Lobby
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default GameSetup;
