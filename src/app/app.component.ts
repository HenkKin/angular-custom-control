import { Component, VERSION } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group(
      {
        firstName: [''],
        lastName: [''],
        birthDate: [null],
        startDate: [null],
        endDate: [null],
        city: [null],
      },
      { updateOn: 'blur' }
    );
  }
}
