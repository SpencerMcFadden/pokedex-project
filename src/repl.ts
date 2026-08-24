import { createInterface } from 'node:readline';
import { stdin, stdout } from 'node:process';

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
  readInterface.on('line', (input: string) => {
    const cleaned: string[] = cleanInput(input);
    if (!cleaned) {
      readInterface.prompt();
      return;
    }
    console.log(`Your command was: ${cleaned[0]}`);
    readInterface.prompt();
  });
}
