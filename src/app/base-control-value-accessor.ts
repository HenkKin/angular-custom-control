import { ControlValueAccessor } from '@angular/forms';

export abstract class BaseControlValueAccessor<T>
  implements ControlValueAccessor
{
  private _disabled = false;
  public get disabled() {
    return this._disabled;
  }
  public set disabled(value) {
    this._disabled = value;
  }
  protected _value: T;
  public get value(): T {
    return this._value;
  }
  public set value(value: T) {
    this._value = value;
  }
  /**
   * Call when value has changed programmatically
   */
  public onChange(_: T) {}
  public onTouched(_?: any) {}
  /**
   * Model -> View changes
   */
  public writeValue(obj: T): void {
    this.value = obj;
  }
  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  public setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}

// https://medium.com/@narthur157/custom-angular-reactive-forms-what-i-wish-i-knew-v5-6-5b1c2f8e1974
// https://stackblitz.com/edit/angular-custom-reactive-forms?embed=1&file=src/app/app.component.ts
