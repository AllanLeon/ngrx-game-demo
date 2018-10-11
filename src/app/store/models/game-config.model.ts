import { ViewContainerRef } from '@angular/core';
import { PhysicsConfig } from './physics-config.model';

export interface CanvasConfig {
    ref: ViewContainerRef;
}

export interface GameConfig {
    physics: PhysicsConfig;
    // canvas: CanvasConfig;
}
