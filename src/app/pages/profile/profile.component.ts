import { Component, OnInit, } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { environment } from "src/environments/environment";
import { user } from "src/app/core/interfaces/user";
import {
  IonLabel,
  IonContent,
  IonButton,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
  IonItem, 
  IonButtons,
  IonBackButton } from "@ionic/angular/standalone";
import { Router } from "@angular/router";
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports: [

    IonContent,
    IonButton,
    CommonModule,
    IonLabel,
    
    IonIcon,
    IonItem,
    HeaderComponent
]
})
export class ProfileComponent implements OnInit {
  user: user | null = null;

  constructor(private router: Router) { }

  ngOnInit() { 
    const storedUser = localStorage.getItem(environment.storageNames.user);
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }
  }
logout(): void {
    // 1. Eliminar el token
    localStorage.removeItem(environment.storageNames.token);
    
    // 2. Eliminar la información del usuario
    localStorage.removeItem(environment.storageNames.user);
    
    // 3. Redirigir al login
    this.router.navigate(['/login']);
  }
}
