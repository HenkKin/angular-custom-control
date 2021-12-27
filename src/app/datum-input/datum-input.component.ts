import { Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { BaseControlValueAccessor } from '../base-control-value-accessor';

@Component({
  selector: 'app-datum-input',
  templateUrl: './datum-input.component.html',
  styleUrls: ['./datum-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => DatumInputComponent),
    },
  ],
})
export class DatumInputComponent
  extends BaseControlValueAccessor<Date>
  implements OnInit
{
  innerControl = new FormControl(null, { updateOn: 'blur' });

  constructor() {
    super();
  }

  ngOnInit() {
    this.innerControl.valueChanges.subscribe((innerValue: string) => {
      this._value = this.mapToOuter(innerValue);
      this.onChange(this._value);
    });
  }

  onBlur() {
    this.onTouched(this._value);
  }

  public get value(): Date {
    return this.mapToOuter(this.innerControl.value);
  }
  @Input()
  public set value(value: Date) {
    this.innerControl.setValue(this.mapToInner(value));
  }

  private mapToInner(outerValue: Date): string {
    if (outerValue) {
      return (
        outerValue.getDate().toString() +
        (outerValue.getMonth() + 1).toString() +
        outerValue.getFullYear()
      );
    }

    return null;
  }

  private mapToOuter(innerValue: string): Date {
    if (innerValue && innerValue.length === 8) {
      return new Date(
        parseInt(innerValue.substring(4, 8), 10),
        parseInt(innerValue.substring(2, 3), 10),
        parseInt(innerValue.substring(0, 1), 10)
      );
    }

    return null;
  }
}
