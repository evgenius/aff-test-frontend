import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from './slider.component';
import { SliderDirective } from './slider.directive';
import 'ion-rangeslider/js/ion.rangeSlider';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    SliderComponent,
    SliderDirective,
  ],
  exports: [
    SliderComponent,
    SliderDirective,
  ],
})
export class SliderModule { }
