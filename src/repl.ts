import { State } from "./state.js";

export function cleanInput(input: string): string[] {
  return input
    .toLowerCase()
    .trim()
    .split(" ")
    .filter((word: string) => word !== "");
}

export async function startREPL(state: State) {
  state.rl.prompt();
  state.rl.on("line", async (input: string) => {
    const cleaned: string[] = cleanInput(input);
    if (!cleaned) {
      state.rl.prompt();
      return;
    }

    const commandName = cleaned[0];

    const userCommand = state.commands[commandName];
    if (!userCommand) {
      console.log(`Unknown command: "${commandName}". Type "help" for a list of commands.`);
      state.rl.prompt();
      return;
    }

    try {
      await userCommand.callback(state);
    } catch (e) {
      console.log((e as Error).message);
    }

    state.rl.prompt();
  });
}
