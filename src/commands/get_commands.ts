import { commandCatch } from "./command_catch.js";
import { commandExit } from "./command_exit.js";
import { commandExplore } from "./command_explore.js";
import { commandHelp } from "./command_help.js";
import { commandInspect } from "./command_inspect.js";
import { commandMapForward, commandMapBack } from "./command_map.js";

import type { CLICommand } from "../state.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    catch: {
      name: "catch <pokemon_name>",
      description: "Attempts to catch a pokemon and add it to the pokedex if it's new",
      callback: commandCatch,
    },
    explore: {
      name: "explore <location_name>",
      description: "Explores one selected location",
      callback: commandExplore,
    },
    inspect: {
      name: "inspect <pokemon_name>",
      description: "Inspects pokedex entry for given pokemon",
      callback: commandInspect,
    },
    map: {
      name: "map",
      description: "Displays the next 20 location areas",
      callback: commandMapForward,
    },
    mapb: {
      name: "mapb",
      description: "Displays the previous 20 location areas",
      callback: commandMapBack,
    },
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    exit: {
      name: "exit",
      description: "Exit the Pokedex",
      callback: commandExit,
    },
  };
}
