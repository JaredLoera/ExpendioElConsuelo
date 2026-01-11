import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ViewWillEnter } from '@ionic/angular';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,

  IonButtons,
  IonBackButton, IonList, IonCard, IonBadge, IonListHeader, IonLabel, IonItem, IonAvatar, IonNote, IonCardContent
} from '@ionic/angular/standalone';

import { Resumenes } from 'src/app/core/services/resumenes/resumenes';
import { resumProducts } from 'src/app/core/interfaces/resumProducts';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-my-sales',
  templateUrl: './my-sales.component.html',
  styleUrls: ['./my-sales.component.css'],
  imports: [
    IonCardContent,
    IonNote, IonAvatar, IonItem, IonLabel, IonListHeader, IonBadge, IonCard, IonList,

    FormsModule,
    IonContent,

    HeaderComponent

  ]
})
export class MySalesComponent implements ViewWillEnter {

  constructor(private resumenesService: Resumenes) { }
  ventas: resumProducts[] = [];

  getResumenes() {
    this.resumenesService.getResumenForUser().subscribe({
      next: (data: resumProducts[]) => {
        this.ventas = data;
      },
      error: (error) => {
        console.error('Error fetching sales summary:', error);
      }
    });
  }
  ionViewWillEnter(): void {
    this.getResumenes();
  }


  calcularGranTotal(): number {
    return this.ventas.reduce((acc, curr) => acc + parseFloat(curr.total), 0);
  }
}
