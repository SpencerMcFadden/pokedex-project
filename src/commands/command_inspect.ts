import { State } from "../state.js";

export async function commandInspect(state: State, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error("please provide a pokemon name");
  }
  const pokemonName = args[0];
  const dexEntry = state.pokedex[pokemonName];
  if (!dexEntry) {
    console.log("you have not caught that pokemon");
    return;
  }

  console.log(`Name: ${dexEntry.name}`);
  console.log(`Height: ${dexEntry.height}`);
  console.log(`Weight: ${dexEntry.weight}`);
  console.log("Stats:");
  for (const stat of dexEntry.stats) {
    console.log(`  -${stat.stat.name}: ${stat.base_stat}`);
  }
  console.log("Types:");
  for (const monType of dexEntry.types) {
    console.log(`  -${monType.type.name}`);
  }
}
