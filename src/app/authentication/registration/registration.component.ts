import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, public authService: AuthService) {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  public errorHandling = (control: string, error: string) => {
    return this.registrationForm.controls[control].hasError(error);
  }

  submit() {
    if (this.registrationForm.valid) {
      const payload = this.registrationForm.value;
      this.authService.SignUp(payload.email, payload.password, payload.name);
    }
  }
}
