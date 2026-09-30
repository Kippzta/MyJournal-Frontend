import { Component, inject, signal } from '@angular/core';
import { Auth } from '../../services/auth';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Credentials } from '../../models/credentials';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
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

    if (this.form.invalid) {

      this.loginFailedMsg.set("Please enter username and password.")
      this.resetForm();
      return

    }

      const credentials = this.form.value as Credentials;

      this.auth.login(credentials).subscribe({
        next: () => {
          this.auth.save(credentials);
          this.router.navigate(['/journal-feed']);
        
        },

        error: () => {

          this.loginFailedMsg.set('Wrong username or password.');
          this.resetForm();

        },
      });
    
  }

  resetForm() {

    this.form.reset();

  }

  cancel() {
    
    this.router.navigate(['/']);

  }
}
 


