import { GameObject, GameObjectType } from './game-object.model';

export class Circle extends GameObject {
  constructor(
    public sprite: string,
    x: number,
    y: number,
    public radius: number,
  ) {
    super(sprite, x, y);
    this.type = GameObjectType.Circle;
  }

  collide() {
    throw new Error('Method not implemented.');
  }
}
