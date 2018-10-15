import { Component, OnInit, Input } from '@angular/core';
import { Circle } from 'app/core/models/objects/circle.model';
import { Vector2 } from '../../../core/models/common';

@Component({
  selector: 'nge-circle',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.scss']
})
export class CircleComponent implements OnInit {

  @Input() circle: Circle;

  get diameter(): number {
    return this.circle.radius * 2;
  }

  get position(): Vector2 {
    const { radius, position } = this.circle;
    return {
      x: position.x - radius,
      y: position.y - radius,
    };
  }

  constructor() { }

  ngOnInit() { }

  toPixels(a: number): string {
    return `${a}px`;
  }

}
