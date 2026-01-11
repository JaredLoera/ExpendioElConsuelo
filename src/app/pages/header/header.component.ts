import { Component, Input, OnInit } from '@angular/core';
import {IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonTabButton, IonIcon, IonLabel, IonButton } from '@ionic/angular/standalone';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports:[
    IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonTabButton, IonIcon, IonLabel
  ]
})
export class HeaderComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

  @Input() title: string = '';

}
