// @ts-nocheck
import Bloctics from '~/components/Bloctics';
import GameSetup from "~/components/GameSetup";
import { ClientOnly } from "remix-utils";
import type { LoaderArgs } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import { bloctics } from "~/machines/bloctics";
import { State } from "xstate";
import { useLoaderData } from "@remix-run/react";
import { blocticsMachineCookie } from "~/cookies";
import { readCookie } from "~/routes/index";
import { asyncInterpret } from "~/asynInterpret";

export async function loader({ request }: LoaderArgs) {
  const stateConfig = await readCookie(request);
  if (!stateConfig) {
    redirect('index');
  }

  // Turn cookie into state
  const currentState = await bloctics.resolveState(
    State.create(stateConfig),
  );
  console.log('currentState1', currentState);

  return json({
    state: currentState,
  }, {
    headers: {
      "Set-Cookie": await blocticsMachineCookie.serialize(currentState),
    }
  })
}

export const action = async ({ request, params: { state } }) => {
  console.log('thuuuuuuuuuuuuuuuuss');
  const stateConfig = await readCookie(request);
  if (!stateConfig) return redirect(".."); // No cookie, so start over

  const currentState = bloctics.resolveState(stateConfig);
  const event = Object.fromEntries(await request.formData());
  console.log('event------------------', event);

  const nextState = await asyncInterpret(
    bloctics,
    3_000,
    currentState,
    event,
  );

  switch (event.type) {
    case 'Exit':
      return redirect('..');
    case 'Create Room':
      return json({
        state: nextState,
      }, {
        headers: {
          "Set-Cookie": await blocticsMachineCookie.serialize(nextState),
        }
      });
    case 'Join Room':
      return json({
        state: nextState,
      }, {
        headers: {
          "Set-Cookie": await blocticsMachineCookie.serialize(nextState),
        }
      });
    default:
      return json({
        hello: 'world',
      });
  }
};

export default function Game() {
  const { state } = useLoaderData();
  const { context } = state;

  // Create util to deconstruct object
  console.log('state', state);
  const gameState = Object.keys(state.value);
  const gameChildState = Object.values(state.value);
  console.log('gameState', gameState);
  console.log('gameChildState', gameChildState);

  return (
    <ClientOnly>
      {() => (
        <>
          {gameState.includes('Game Setup') && (
            <GameSetup
              showCreate={gameChildState.includes('Create Confirm')}
              showJoin={gameChildState.includes('Enter Code')}
              context={context}
            />
          )}
          <Bloctics />
        </>
      )}
    </ClientOnly>
  );
}
