export enum GameObjectType {
  Circle = 'Circle',
}

export abstract class GameObject {
  public type: GameObjectType;

  constructor(
    public x: number,
    public y: number,
  ) { }

  // abstract collide();
}
