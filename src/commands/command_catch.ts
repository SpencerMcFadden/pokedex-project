import { State } from "../state.js";

export async function commandCatch(state: State, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error("please provide a pokemon name");
  }

  const mon = args[0];

  console.log(`Throwing a Pokeball at ${mon}...`);
  const monInfo = await state.api.fetchPokemon(mon);

  const catchResult = Math.floor(Math.random() * monInfo.base_experience);
  if (catchResult > 40) {
    console.log(`${mon} escaped!`);
    return;
  }

  console.log(`${mon} was caught!`);
  state.pokedex[monInfo.name] = monInfo;
}
