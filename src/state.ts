import { createInterface, type Interface } from "readline";

import { getCommands } from "./commands/get_commands.js";
import { PokeAPI } from "./pokeapi.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
  rl: Interface;
  commands: Record<string, CLICommand>;
  api: PokeAPI;
  nextLocationsURL: string;
  prevLocationsURL: string;
};

export function initState(cacheInterval: number): State {
  return {
    rl: createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: "Pokedex > ",
    }),
    commands: getCommands(),
    api: new PokeAPI(cacheInterval),
    nextLocationsURL: "",
    prevLocationsURL: "",
  };
}
