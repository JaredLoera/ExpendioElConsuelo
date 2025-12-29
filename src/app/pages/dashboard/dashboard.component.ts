import { Component, OnInit } from '@angular/core';
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { library, playCircle, radio, search } from 'ionicons/icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
    imports: [IonIcon,
    IonTabBar,
    IonTabButton,
    IonTabs,
    IonLabel
  ],
})
export class DashboardComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
