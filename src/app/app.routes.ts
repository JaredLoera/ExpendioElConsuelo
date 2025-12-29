import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CreateOrderComponent } from './pages/create-order/create-order.component';
import { LoginComponent } from './pages/login/login.component';
import { MySalesComponent } from './pages/my-sales/my-sales.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { authGuard } from './core/guards/auth/auth-guard';
export const routes: Routes = [
  

  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'home',
        component: CreateOrderComponent
      },
      {
        path: 'my-sales',
        component: MySalesComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [authGuard]
  }
  ,
    {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
];




/*
    {
      "src": "assets/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png"
    },
    {
      "src": "assets/icons/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png"
    },
    {
      "src": "assets/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png"
    },
    {
      "src": "assets/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png"
    },
    {
      "src": "assets/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png"
    },
    {
      "src": "assets/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "assets/icons/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png"
    },
    {
      "src": "assets/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
      */