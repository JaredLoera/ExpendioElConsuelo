import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonInput, IonButton } from "@ionic/angular/standalone";
import { environment } from 'src/environments/environment';
import { RouterLink } from '@angular/router';
import { User } from 'src/app/core/services/user/user';
import { Auth } from 'src/app/core/services/auth/auth';
import { token } from 'src/app/core/interfaces/token';
import {user} from 'src/app/core/interfaces/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [IonButton,
    IonInput,
    IonContent,
    CommonModule,
    ReactiveFormsModule    
  ]
})
export class LoginComponent implements OnInit {

  constructor(private authService: Auth, private router: Router, private userService: User) { }

  ngOnInit() { }
  userProfile: user | null = null;
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  async login() {
    if (this.loginForm.invalid) {
      return;
    }
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    this.authService.login(this.loginForm.value.email!, this.loginForm.value.password!).subscribe({
      next: (response: token) => {
        this.authService.setToken(response.token);
        this.userService.getUserProfile().subscribe({
          next: (userProfile: user) => {
            this.userProfile = userProfile;
            localStorage.setItem(environment.storageNames.user, JSON.stringify(userProfile));
            this.router.navigate(['']);
          },
          error: (error) => {
            console.error('Error fetching user profile:', error);
          }
        });
      },
      error: (error) => {
        console.error('Error during login:', error);
      }
    });
  }
}
