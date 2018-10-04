import { GameObject } from './game-object.model';

export class Circle extends GameObject {
  constructor(
    public x: number,
    public y: number,
    public radius: number,
  ) {
    super(x, y);
  }

  collide() {
    throw new Error('Method not implemented.');
  }
}
