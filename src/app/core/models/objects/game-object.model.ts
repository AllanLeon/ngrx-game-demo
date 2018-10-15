import { Vector2 } from '../common';

export enum GameObjectType {
  Circle = 'Circle',
}

export abstract class GameObject {
  public id: string;
  public type: GameObjectType;

  public position: Vector2;
  public speed: Vector2;
  public collided?: boolean;

  public width?: number;
  public height?: number;

  public previousState: GameObject;

  constructor(
    public sprite: string,
    x: number,
    y: number,
  ) {
    this.id = generateId();
    this.position = { x, y };

    this.speed = { x: 0, y: 0 };
  }
}

function generateId() {
  const S4 = function() {
    // tslint:disable-next-line:no-bitwise
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4());
}
