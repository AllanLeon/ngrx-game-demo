import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, AfterContentInit } from '@angular/core';
import { CircleComponent } from 'app/shared/components';
import { Circle } from 'app/core/models/objects/circle.model';

@Component({
  selector: 'nge-canvas',
  templateUrl: './canvas.component.html',
})
export class CanvasComponent implements OnInit, AfterContentInit {

  @ViewChild('canvas', { read: ViewContainerRef }) canvas: ViewContainerRef;

  constructor(
    private resolver: ComponentFactoryResolver,
  ) { }

  ngOnInit() { }

  ngAfterContentInit() {
    const circleFactory = this.resolver.resolveComponentFactory(CircleComponent);
    const circle = this.canvas.createComponent(circleFactory);
    circle.instance.circle = new Circle(10, 10, 20);

    const circle2 = this.canvas.createComponent(circleFactory);
    circle2.instance.circle = new Circle(100, 10, 50);
  }

}
