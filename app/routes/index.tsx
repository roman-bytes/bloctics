import React from "react";
import { State } from 'xstate';
// import { Link } from '@remix-run/react';
import { Form, useLoaderData } from '@remix-run/react';
import type { LoaderArgs} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { bloctics } from '~/machines/bloctics';
import { blocticsMachineCookie } from "~/cookies";
import { asyncInterpret } from "~/asynInterpret";
import { getUser } from "~/session.server";

export const readCookie = async (request: Request) => {
  const oldCookie = request.headers.get("Cookie");
  return await blocticsMachineCookie.parse(oldCookie);
};

export async function loader({ request }: LoaderArgs) {
  const blocticsState = await asyncInterpret(bloctics, 3_000);

  return json({
    state: blocticsState,
  }, {
    headers: {
      "Set-Cookie": await blocticsMachineCookie.serialize(blocticsState),
    },
  });
}

// @ts-ignore
export const action = async ({ request, params: { state } }) => {
  const stateConfig = await readCookie(request);
  if (!stateConfig) return redirect(".."); // No cookie, so start over

  const currentState = bloctics.resolveState(stateConfig);
  const event = Object.fromEntries(await request.formData());

  const nextState = await asyncInterpret(
    bloctics,
    3_000,
    currentState,
    event,
  );

  console.log('event', event);

  if (event.type === 'Play Game') {
    return redirect('game', {
      headers: {
        "Set-Cookie": await blocticsMachineCookie.serialize(nextState),
      },
    });
  }
  return json({
    hello: 'World'
  });
}

function Index() {
  const { state } = useLoaderData();
  console.log('state', state);

  return (
    <main className="flex w-full h-full justify-center items-center flex-col">
      <img className="mb-6" src="./bloctics-logo.png" alt="Bloctics logo" />
      <Form method="post" className="inline">
        <input type="hidden" name="type" value='Play Game' />
        <button type="submit">
          <img src="./play-button.png" alt="Play Game" />
        </button>
      </Form>
    </main>
  );
}

export default Index;
