import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  Input,
  OnInit,
  Optional,
  Output,
  Renderer2,
  Self,
  Attribute,
} from '@angular/core';
import { FormControl, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseControl } from '../base-control';
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
export class DatumInputComponent extends BaseControl<Date> implements OnInit {
  @Output() blur = new EventEmitter<FocusEvent>();
  @Output() focus = new EventEmitter<FocusEvent>();
  // @HostBinding('attr.tabindex') tabindex: number;

  // Make sure container can receive focus or else blur events won't be seen.
  // @HostBinding('attr.tabindex') tabindex = '0';
  // @HostListener('blur', ['$event.target']) onBlur2(target) {
  //   console.log(`onBlur(): ${new Date()} - ${JSON.stringify(target)}`);
  // }

  innerControl = new FormControl(null, { updateOn: 'blur' });

  get tabindex(): number {
    return this._tabindex;
  }
  constructor(
    @Attribute('tabindex') private _tabindex: number,
    private outerElementRef: ElementRef<HTMLElement>
  ) {
    super();
    // this.outerElementRef.nativeElement.removeAttribute('tabindex');
    this.outerElementRef.nativeElement.setAttribute('tabindex', '-1');
  }

  getTabindex(innerTabindex: number): number {
    //return parseFloat(this.tabindex.toString() + '.' //+ innerTabindex/);
    //return (this.tabindex * 1) + (innerTabindex/1000)
    return this.tabindex;
  }

  ngOnInit() {
    this.innerControl.valueChanges.subscribe((innerValue: string) => {
      this._value = this.mapToOuter(innerValue);
      this.onChange(this._value);
      // updateon 'change': this.onTouched(this._value);
    });

    console.log('tabindex', this.tabindex);
  }

  onBlur(event: FocusEvent) {
    console.log('blur datum');
    // updateon 'blur': this.onTouched(this._value);
    this.onTouched(this._value);
    this.blur.emit(event);
  }

  onFocus(event: FocusEvent): void {
    console.log('focus datum');
    this.focus.emit(event);
  }

  onKeydown(event: KeyboardEvent) {
    console.log('keydown datum');
  }

  onInput(event: Event): void {
    console.log('input datum');
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

function coerceNumberProperty(tabindex: any) {
  throw new Error('Function not implemented.');
}
