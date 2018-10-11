import {
  Injectable,
  ComponentFactoryResolver,
  ComponentFactory,
  ViewContainerRef,
  ComponentRef,
} from '@angular/core';

import { Circle } from '../models/objects/circle.model';
import { CircleComponent } from 'app/shared/components';
import { GameObject } from '../models';
import { Store } from '@ngrx/store';
import { selectAllGameObjects } from '../../store/selectors';
import { GameObjectEntity,  GameState } from '../../store/models';
import { combineLatest } from 'rxjs';

@Injectable()
export class GameObjectManager {

  private circleFactory: ComponentFactory<CircleComponent>;
  private canvas: ViewContainerRef;
  private gameObjectRefs: ComponentRef<CircleComponent>[] = [];
  private gameObjectsEntities: GameObjectEntity[];

  constructor(
    private resolver: ComponentFactoryResolver,
    private store: Store<GameState>,
  ) {
    this.circleFactory = this.resolver.resolveComponentFactory(CircleComponent);
    this.store.select(selectAllGameObjects)
    .subscribe((gameObjects) => {
      this.gameObjectsEntities = gameObjects;
    });
  }

  setCanvas(canvas: ViewContainerRef) {
    this.canvas = canvas;
  }

  createCircle(circle: Circle): ComponentRef<CircleComponent> {
    if (!this.canvas) {
      throw new Error('Canvas is not defined');
    }
    const circleRef = this.canvas.createComponent(this.circleFactory);
    circleRef.instance.circle = circle;
    return circleRef;
  }

  createObject(object: GameObject) {
    switch (object.type || object.constructor.name) {
      case Circle.name:
        this.gameObjectRefs.push(this.createCircle(object as Circle));
        break;
      default:
    }
  }

  clearAll() {
    for (let i = 0; i < this.gameObjectRefs.length; i++) {
      this.gameObjectRefs[i].destroy();
      this.gameObjectRefs[i] = null;
    }
    this.gameObjectRefs = [];
  }

  redrawAll() {
    this.clearAll();
    this.gameObjectsEntities.forEach((gameObjectEntity) => {
      this.createObject(gameObjectEntity.gameObject);
    });
  }
}
