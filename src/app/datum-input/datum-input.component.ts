import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from '@angular/core';
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
  // @Output('blur') blurChange = new EventEmitter<FocusEvent>();

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

  onBlur(event: FocusEvent) {
    this.onTouched(this._value);
    // this.blurChange.emit(event);
  }

  public get value(): Date {
    return this._value;
  }
  @Input()
  public set value(value: Date) {
    if (value !== this._value) {
      this.innerControl.setValue(this.mapToInner(value));
    }
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
        parseInt(innerValue.substring(2, 4), 10) - 1,
        parseInt(innerValue.substring(0, 2), 10)
      );
    }

    return null;
  }
}
