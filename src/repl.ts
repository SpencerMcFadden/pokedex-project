import { createInterface } from 'node:readline';
import { stdin, stdout } from 'node:process';

import { getCommands } from "./commands/get_commands.js";


export function cleanInput(input:string): string[]{
  return input
    .toLowerCase()
    .trim()
    .split(" ")
    .filter((word) => word !== "");
}

export function startREPL() {
  const readInterface = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Pokedex > ',
  });

  readInterface.prompt();
  readInterface.on('line', async (input: string) => {
    const cleaned: string[] = cleanInput(input);
    if (!cleaned) {
      readInterface.prompt();
      return;
    }

    const commandName = cleaned[0];

    const commands = getCommands();
    const userCommand = commands[commandName];
    if (!userCommand) {
      console.log(
        `Unknown command: "${commandName}". Type "help" for a list of commands.`,
      );
      readInterface.prompt();
      return
    }

    try {
      userCommand.callback(commands);
    } catch (e) {
      console.log(e);
    }

    readInterface.prompt();
  });
}
