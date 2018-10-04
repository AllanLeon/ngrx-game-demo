export abstract class GameObject {
  constructor(
    public x: number,
    public y: number,
  ) { }

  abstract collide();
}
