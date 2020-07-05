export class ObserverPattern {
  private readonly events: Map<string, Set<() => void>>

  constructor () {
    this.events = new Map()
  }

  public subscribe (name: string, fn: () => void): void {
    if (this.events.has(name)) {
      this.events.get(name).add(fn)
    } else {
      this.events.set(name, new Set([fn]))
    }
  }

  public unSubscribe (name: string, fn: () => void): void {
    if (this.events.has(name)) {
      this.events.get(name).delete(fn)
    }
  }

  public fire (name: string): void {
    const events = this.events.get(name)

    if (!events) {
      throw Error(`${name} does not exist`)
    }
    
    events.forEach((event) => event())
  }
}
