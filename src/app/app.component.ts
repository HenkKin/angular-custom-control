import { Component, VERSION } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      firstName: new FormControl('', { updateOn: 'blur' }),
      lastName: new FormControl('', { updateOn: 'blur' }),
      birthDate: new FormControl(null, { updateOn: 'blur' }),
      startDate: new FormControl(null, { updateOn: 'blur' }),
      endDate: new FormControl(null, { updateOn: 'blur' }),
      city: new FormControl('', { updateOn: 'blur' }),
    });
  }

  
  onBlur(event: FocusEvent) {
    console.log('blur app');
    // this.blurChange.emit(event);
  }

  onFocus(event: FocusEvent): void {
    console.log('focus app');
  }

  onKeydown(event: KeyboardEvent) {
    console.log('keydown app');
  }

  onInput(event: Event): void {
    console.log('input app');
  }
}
