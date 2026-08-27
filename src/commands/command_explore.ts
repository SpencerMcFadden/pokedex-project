import { State } from "../state.js";

export async function commandExplore(state: State, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error("please provide a location name");
  }

  console.log(`Exploring ${args[0]}...`);
  const location = await state.api.fetchLocation(args[0]);
  console.log("Found Pokemon:");
  for (const encounter of location.pokemon_encounters) {
    console.log(` - ${encounter.pokemon.name}`);
  }
}
