import { Component, OnInit, Input } from '@angular/core';
import { Circle } from 'app/core/models/objects/circle.model';

@Component({
  selector: 'nge-circle',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.scss']
})
export class CircleComponent implements OnInit {

  @Input() circle: Circle;

  constructor() { }

  ngOnInit() { }

  toPixels(a: number): string {
    return `${a}px`;
  }

}
