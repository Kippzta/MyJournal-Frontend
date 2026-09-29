import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Credentials } from '../../models/credentials';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})

export class Register {

  private router = inject(Router)

  private auth = inject(Auth);

  registerSuccessMsg = signal('');

  registerFailedMsg = signal('');

  form = new FormGroup({

    username: new FormControl(''),

    password: new FormControl(''),

  });

  onSubmit() {

    this.auth.register(this.form.value as Credentials).subscribe({

      next: () => {
        this.registerSuccessMsg.set('User successfully registered!')
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },

      error: () => {
        this.registerFailedMsg.set('Registration failed, please try again!');
      }

    })

  };

  cancel() {
    this.router.navigate(['/']);
  }

}
