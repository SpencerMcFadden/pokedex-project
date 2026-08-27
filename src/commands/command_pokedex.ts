import { State } from "../state.js";

export async function commandPokedex(state: State) {
  const dexEntries = state.pokedex;
  console.log("Your Pokedex:");
  for (const [key] of Object.entries(dexEntries)) {
    console.log(` - ${key}`);
  }
}
