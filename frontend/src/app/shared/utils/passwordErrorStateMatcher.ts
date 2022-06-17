import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class PasswordErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const invalidCtrl = !!(
      control?.invalid &&
      (control?.dirty || control?.touched)
    );
    const invalidParent = !!(
      control?.parent?.invalid &&
      (control?.dirty || control?.touched)
    );

    return invalidCtrl || invalidParent;
  }
}
