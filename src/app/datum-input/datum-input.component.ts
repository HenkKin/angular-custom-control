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
  AfterViewInit,
} from '@angular/core';
import { FormControl, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseControl } from '../base-control';

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
  extends BaseControl<Date>
  implements OnInit, AfterViewInit
{
  @Output() blur = new EventEmitter<FocusEvent>();
  @Output() focus = new EventEmitter<FocusEvent>();
  private _tabindex = '0';
  @HostBinding('attr.tabindex')
  @Input()
  set tabindex(index: string | number) {
    // dit is nodig omdat de type wel number is, maar de inhoud door de input binding een string
    console.log('settabindex', this._tabindex, index);
    this._tabindex = index.toString();

    // this._tabindex = coerceNumberProperty(index, 0);
    // to support databinding to tabindex, the html attribute needs to be updated
    // if (this.nativeElement) {
    //   this.nativeElement.setAttribute('tabindex', this._tabindex);
    // }
  }
  get tabindex(): string {
    return this._tabindex;
  }

  // Make sure container can receive focus or else blur events won't be seen.
  // @HostBinding('attr.tabindex') tabindex = '0';
  // @HostListener('blur', ['$event.target']) onBlur2(target) {
  //   console.log(`onBlur(): ${new Date()} - ${JSON.stringify(target)}`);
  // }

  innerControl = new FormControl(null, { updateOn: 'blur' });

  // get tabindex(): number {
  //   return this._tabindex;
  // }
  constructor(
    // @Attribute('tabindex') private _tabindex: number,
    private outerElementRef: ElementRef<HTMLElement>
  ) {
    super();
    // this.outerElementRef.nativeElement.removeAttribute('tabindex');
  }

  ngAfterViewInit(): void {
    this.outerElementRef.nativeElement.setAttribute('tabindex', '-1');
  }

  getTabindex(innerTabindex: number): number {
    //return parseFloat(this.tabindex.toString() + '.' //+ innerTabindex/);
    //return (this.tabindex * 1) + (innerTabindex/1000)
    return parseInt(this.tabindex, 10);
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
