import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import * as jQuery from 'jquery';
import { SliderRange } from './range';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SliderComponent {

  @Input() min: number;
  @Input() max: number;
  @Input() type: string = 'single';
  @Input() values: string[];

  @Output() value = new EventEmitter<SliderRange>();
}
