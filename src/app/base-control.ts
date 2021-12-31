import { ElementRef, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';
import { BaseControlValueAccessor } from './base-control-value-accessor';

export class BaseControl<T> extends BaseControlValueAccessor<T> {
  constructor() {
    super();
  }
  // constructor(
  //   protected _outerElementRef: ElementRef<HTMLElement>,
  //   public ngControl: NgControl,
  //   private _renderer2: Renderer2
  // ) {
  //   super();
  // }
  // }
}
