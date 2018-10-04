import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'nge-circle',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.scss']
})
export class CircleComponent implements OnInit {

  @Input() x: number;
  @Input() y: number;
  @Input() radius: number;

  constructor() { }

  ngOnInit() { }

  toPixels(a: number): string {
    return `${a}px`;
  }

}
