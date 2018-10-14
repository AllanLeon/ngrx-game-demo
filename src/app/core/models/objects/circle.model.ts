import { GameObject, GameObjectType } from './game-object.model';

export class Circle extends GameObject {
  constructor(
    x: number,
    y: number,
    public radius: number,
  ) {
    super(x, y);
    this.type = GameObjectType.Circle;
  }

  collide() {
    throw new Error('Method not implemented.');
  }
}
