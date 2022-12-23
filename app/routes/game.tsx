// @ts-nocheck
import Bloctics from '~/components/Bloctics';
import hoverSound from '../../public/sounds/hover_sound_2.wav';
import { ClientOnly } from "remix-utils";

export default function Game() {
  return (
    <ClientOnly>
      {() => <Bloctics />}
    </ClientOnly>
  );
}
