import {
  Injectable,
} from '@angular/core';

import { GameObject, Circle, GameObjectType } from '../models';

@Injectable()
export class CollisionHandler {

  constructor() { }

  checkCollision(a: GameObject, b: GameObject): boolean {
    if (a.type === GameObjectType.Circle && b.type === GameObjectType.Circle) {
      const collided = this.checkCollisionBetweenCircles(a as Circle, b as Circle);
      return collided;
    }
    return false;
  }

  checkCollisionBetweenCircles(a: Circle, b: Circle) {
    const distance = Math.sqrt(Math.pow(b.position.x - a.position.x, 2) + Math.pow(b.position.y - a.position.y, 2));
    return distance <= a.radius + b.radius;
  }
}
