import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CircleComponent } from './components';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    CircleComponent,
  ],
  exports: [
    CircleComponent,
  ],
  providers: []
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [],
    };
  }
}
