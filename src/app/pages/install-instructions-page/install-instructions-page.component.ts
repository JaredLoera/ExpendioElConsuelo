import { Component, OnInit } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonItem,
  IonButtons,
  IonBackButton,
  IonInput,
  IonModal, IonIcon, IonLabel, IonListHeader, IonRow, IonGrid, IonCol, IonBadge, IonList, IonNote, IonFooter, IonItemSliding, IonItemOptions, IonItemOption
} from '@ionic/angular/standalone';
import { PwaInstallService } from 'src/app/core/services/PwaInstallService/pwa-install-service';

@Component({
  selector: 'app-install-instructions-page',
  templateUrl: './install-instructions-page.component.html',
  styleUrls: ['./install-instructions-page.component.css'],
  imports: [
     IonNote,  
     IonBadge,  
     IonIcon,
    IonButton,
    IonContent,
   
  ]
})
export class InstallInstructionsPageComponent  implements OnInit {

 isIOS = false;

  constructor(public pwaService: PwaInstallService) {}

  ngOnInit() {
    // Detectamos si es iOS
    this.isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
  }

  async install() {
    await this.pwaService.promptPwaInstall();
  }

}
