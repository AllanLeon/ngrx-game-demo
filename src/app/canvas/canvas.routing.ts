import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanvasComponent } from './canvas.component';

const routes: Routes = [
  {
    path: '',
    component: CanvasComponent,
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
