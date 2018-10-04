import { Injectable } from '@angular/core';
import { Circle } from '../models/objects/circle.model';

@Injectable()
export class GameObjectManager {

  constructor(
  ) { }

  createCircle(x, y, radius): Circle {
    return new Circle(x, y, radius);
  }
}
