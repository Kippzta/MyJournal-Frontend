import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth';
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

  private auth = inject(AuthService);

  private router = inject(Router);

  loginFailedMsg = signal('');

  loginForm = new FormGroup({

    username: new FormControl('',{nonNullable: true, validators: [Validators.required, Validators.pattern(/\S/)]}),

    password: new FormControl('', {nonNullable:true, validators: [Validators.required, Validators.pattern(/\S/)]}),
  });

  onSubmit() {

    if (this.loginForm.invalid) {

      this.loginFailedMsg.set("Please enter username and password.")
      this.resetForm();
      return

    }

      const { username, password } = this.loginForm.getRawValue();
      const credentials: Credentials = {

        username: username.trim(),

        password: password.trim(),      

      };

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

    this.loginForm.reset();

  }

  cancel() {
    
    this.router.navigate(['/register']);

  }
}
 


