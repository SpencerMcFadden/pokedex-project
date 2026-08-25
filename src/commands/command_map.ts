import { State } from "../state.js";

export async function commandMapForward(state: State) {
  const locations = await state.api.fetchLocations(state.nextLocationsURL);

  state.prevLocationsURL = locations.previous ?? "";
  state.nextLocationsURL = locations.next ?? "";

  for (const location of Object.values(locations.results)) {
    console.log(location.name);
  }
}

export async function commandMapBack(state: State) {
  if (!state.prevLocationsURL) {
    console.log('No previous map data found. Try using "map" instead.');
    return;
  }

  const locations = await state.api.fetchLocations(state.prevLocationsURL);

  state.prevLocationsURL = locations.previous ?? "";
  state.nextLocationsURL = locations.next ?? "";

  for (const location of Object.values(locations.results)) {
    console.log(location.name);
  }
}
