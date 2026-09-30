import { Component, inject, signal } from '@angular/core';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Credentials } from '../../models/credentials';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  private auth = inject(Auth);

  private router = inject(Router);

  loginFailedMsg = signal('');

  form = new FormGroup({

    username: new FormControl('', [Validators.required, Validators.pattern(/\S/)]),

    password: new FormControl('', [Validators.required, Validators.pattern(/\S/)]),
  });

  onSubmit() {

    if(this.form.invalid) {

      this.loginFailedMsg.set("Please enter username and password")
    }

    this.auth.login(this.form.value as Credentials).subscribe({

      next: () => {
        this.router.navigate(['/']);
      },

      error: () => {

        this.loginFailedMsg.set('Wrong username or password.');
      }

    });

  }

  cancel() {
    this.router.navigate(['/']);
  }

}
