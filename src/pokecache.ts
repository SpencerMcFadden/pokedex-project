export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;

  constructor(interval: number) {
    this.#interval = interval;

    this.#startReapLoop();
  }

  #reap() {
    const now = Date.now();
    for (const [key, entry] of this.#cache) {
      if (now - entry.createdAt > this.#interval) {
        this.#cache.delete(key);
      }
    }
  }

  #startReapLoop() {
    this.#reapIntervalId = setInterval(() => {
      this.#reap();
    }, this.#interval);
  }

  stopReapLoop() {
    if (this.#reapIntervalId) {
      clearInterval(this.#reapIntervalId);
      this.#reapIntervalId = undefined;
    }
  }

  add<T>(key: string, val: T) {
    this.#cache.set(key, { createdAt: Date.now(), val: val });
  }

  get<T>(key: string): T | undefined {
    const item = this.#cache.get(key);
    return item?.val ?? undefined;
  }
}

export type CacheEntry<T> = {
  createdAt: number;
  val: T;
};
