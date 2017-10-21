import { Directive, ElementRef, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as jQuery from 'jquery';

import { SliderRange } from './range';

@Directive({
  selector: '[app-slider]'
})
export class SliderDirective implements OnInit {

  @Input() min: number;
  @Input() max: number;
  @Input() type: string;
  @Input() values: string[];

  @Output() value = new EventEmitter<SliderRange>();

  constructor(private el: ElementRef) { }

  ngOnInit() {
    jQuery(($: any) => {
      $(this.el.nativeElement).ionRangeSlider({
        type: this.type,
        min: this.min,
        max: this.max,
        values: this.values,
        onFinish: (event) => {
          this.value.emit(new SliderRange(event.from_value, event.to_value));
        },
      });
    });
  }
}
