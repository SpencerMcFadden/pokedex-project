import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private cache: Cache;

  constructor(cacheInterval: number) {
    this.cache = new Cache(cacheInterval);
  }

  closeCache() {
    this.cache.stopReapLoop();
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL || `${PokeAPI.baseURL}/location-area/`;
    const cacheEntry = this.cache.get<ShallowLocations>(url);
    if (cacheEntry) {
      return cacheEntry;
    }
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const locations: ShallowLocations = await response.json();
      this.cache.add<ShallowLocations>(url, locations);
      return locations;
    } catch (error: unknown) {
      throw error;
    }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const fullURL = `${PokeAPI.baseURL}/location-area/${locationName}`;
    const cacheEntry = this.cache.get<Location>(fullURL);
    if (cacheEntry) {
      return cacheEntry;
    }
    try {
      const response = await fetch(fullURL);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const location: Location = await response.json();
      this.cache.add<Location>(fullURL, location);
      return location;
    } catch (error: unknown) {
      throw error;
    }
  }

  async fetchPokemon(pokemonName: string): Promise<Pokemon> {
    const fullURL = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;
    const cacheEntry = this.cache.get<Pokemon>(fullURL);
    if (cacheEntry) {
      return cacheEntry;
    }
    try {
      const response = await fetch(fullURL);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const pokemon: Pokemon = await response.json();
      this.cache.add<Pokemon>(fullURL, pokemon);
      return pokemon;
    } catch (error: unknown) {
      throw error;
    }
  }
}

export type ShallowLocations = {
  count: number;
  next: string;
  previous: string;
  results: {
    name: string;
    url: string;
  }[];
};

export type Location = {
  encounter_method_rates: {
    encounter_method: {
      name: string;
      url: string;
    };
    version_details: {
      rate: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
  game_index: number;
  id: number;
  location: {
    name: string;
    url: string;
  };
  name: string;
  names: {
    language: {
      name: string;
      url: string;
    };
    name: string;
  }[];
  pokemon_encounters: {
    pokemon: {
      name: string;
      url: string;
    };
    version_details: {
      encounter_details: {
        chance: number;
        condition_values: any[];
        max_level: number;
        method: {
          name: string;
          url: string;
        };
        min_level: number;
      }[];
      max_chance: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
};

export type Pokemon = {
  abilities: Array<{
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }>;
  base_experience: number;
  cries: {
    latest: string;
    legacy: string;
  };
  forms: Array<{
    name: string;
    url: string;
  }>;
  game_indices: Array<{
    game_index: number;
    version: {
      name: string;
      url: string;
    };
  }>;
  height: number;
  held_items: Array<{
    item: {
      name: string;
      url: string;
    };
    version_details: Array<{
      rarity: number;
      version: {
        name: string;
        url: string;
      };
    }>;
  }>;
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Array<{
    move: {
      name: string;
      url: string;
    };
    version_group_details: Array<{
      level_learned_at: number;
      move_learn_method: {
        name: string;
        url: string;
      };
      order?: number;
      version_group: {
        name: string;
        url: string;
      };
    }>;
  }>;
  name: string;
  order: number;
  past_abilities: Array<{
    abilities: Array<{
      ability: any;
      is_hidden: boolean;
      slot: number;
    }>;
    generation: {
      name: string;
      url: string;
    };
  }>;
  past_stats: Array<{
    generation: {
      name: string;
      url: string;
    };
    stats: Array<{
      base_stat: number;
      effort: number;
      stat: {
        name: string;
        url: string;
      };
    }>;
  }>;
  past_types: Array<{
    generation: {
      name: string;
      url: string;
    };
    types: Array<{
      slot: number;
      type: {
        name: string;
        url: string;
      };
    }>;
  }>;
  species: {
    name: string;
    url: string;
  };
  sprites: {
    back_default: string;
    back_female: any;
    back_shiny: string;
    back_shiny_female: any;
    front_default: string;
    front_female: any;
    front_shiny: string;
    front_shiny_female: any;
    other: {
      dream_world: {
        front_default: string;
        front_female: any;
      };
      home: {
        front_default: string;
        front_female: any;
        front_shiny: string;
        front_shiny_female: any;
      };
      "official-artwork": {
        front_default: string;
        front_shiny: string;
      };
      showdown: {
        back_default: string;
        back_female: any;
        back_shiny: string;
        back_shiny_female: any;
        front_default: string;
        front_female: any;
        front_shiny: string;
        front_shiny_female: any;
      };
    };
    versions: {
      "generation-i": {
        "red-blue": {
          back_default: string;
          back_gray: string;
          back_transparent: string;
          front_default: string;
          front_gray: string;
          front_transparent: string;
        };
        yellow: {
          back_default: string;
          back_gray: string;
          back_transparent: string;
          front_default: string;
          front_gray: string;
          front_transparent: string;
        };
      };
      "generation-ii": {
        crystal: {
          back_default: string;
          back_shiny: string;
          back_shiny_transparent: string;
          back_transparent: string;
          front_default: string;
          front_shiny: string;
          front_shiny_transparent: string;
          front_transparent: string;
        };
        gold: {
          back_default: string;
          back_shiny: string;
          front_default: string;
          front_shiny: string;
          front_transparent: string;
        };
        silver: {
          back_default: string;
          back_shiny: string;
          front_default: string;
          front_shiny: string;
          front_transparent: string;
        };
      };
      "generation-iii": {
        emerald: {
          front_default: string;
          front_shiny: string;
        };
        "firered-leafgreen": {
          back_default: string;
          back_shiny: string;
          front_default: string;
          front_shiny: string;
        };
        "ruby-sapphire": {
          back_default: string;
          back_shiny: string;
          front_default: string;
          front_shiny: string;
        };
      };
      "generation-iv": {
        "diamond-pearl": {
          back_default: string;
          back_female: any;
          back_shiny: string;
          back_shiny_female: any;
          front_default: string;
          front_female: any;
          front_shiny: string;
          front_shiny_female: any;
        };
        "heartgold-soulsilver": {
          back_default: string;
          back_female: any;
          back_shiny: string;
          back_shiny_female: any;
          front_default: string;
          front_female: any;
          front_shiny: string;
          front_shiny_female: any;
        };
        platinum: {
          back_default: string;
          back_female: any;
          back_shiny: string;
          back_shiny_female: any;
          front_default: string;
          front_female: any;
          front_shiny: string;
          front_shiny_female: any;
        };
      };
      "generation-ix": {
        "scarlet-violet": {
          front_default: string;
          front_female: any;
        };
      };
      "generation-v": {
        "black-white": {
          animated: {
            back_default: string;
            back_female: any;
            back_shiny: string;
            back_shiny_female: any;
            front_default: string;
            front_female: any;
            front_shiny: string;
            front_shiny_female: any;
          };
          back_default: string;
          back_female: any;
          back_shiny: string;
          back_shiny_female: any;
          front_default: string;
          front_female: any;
          front_shiny: string;
          front_shiny_female: any;
        };
      };
      "generation-vi": {
        "omegaruby-alphasapphire": {
          front_default: string;
          front_female: any;
          front_shiny: string;
          front_shiny_female: any;
        };
        "x-y": {
          front_default: string;
          front_female: any;
          front_shiny: string;
          front_shiny_female: any;
        };
      };
      "generation-vii": {
        icons: {
          front_default: string;
          front_female: any;
        };
        "ultra-sun-ultra-moon": {
          front_default: string;
          front_female: any;
          front_shiny: string;
          front_shiny_female: any;
        };
      };
      "generation-viii": {
        "brilliant-diamond-shining-pearl": {
          front_default: string;
          front_female: any;
        };
        icons: {
          front_default: string;
          front_female: any;
        };
      };
    };
  };
  stats: Array<{
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }>;
  types: Array<{
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }>;
  weight: number;
};
