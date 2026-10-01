import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Credentials } from '../../models/credentials';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})

export class Register {

  private router = inject(Router)

  private auth = inject(AuthService);

  registerSuccessMsg = signal('');

  registerFailedMsg = signal('');

  regForm = new FormGroup({

    username: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.minLength(3), Validators.pattern(/\S/)]}),

    password: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.minLength(4), Validators.pattern(/\S/)]}),

  });

  onSubmit() {

    if(this.regForm.invalid) {
      this.registerFailedMsg.set('Please enter valid username (min: 3 char) and password (min: 4)');
      return;

    }

    const { username, password } = this.regForm.getRawValue();
    const credentials: Credentials = {

      username: username.trim(),

      password: password.trim(),

    }

    this.auth.register(credentials).subscribe({

      next: () => {

        this.registerSuccessMsg.set('User successfully registered!')
        setTimeout(() => this.router.navigate(['/login']), 1000);

      },

      error: (err) => {

        if(err.status == 409) {
          this.registerFailedMsg.set("Username already exists!")
        } else
          
        this.registerFailedMsg.set('Registration failed, please try again!');

      }

    })

  };

  cancel() {

    this.router.navigate(['/']);

  }

}
