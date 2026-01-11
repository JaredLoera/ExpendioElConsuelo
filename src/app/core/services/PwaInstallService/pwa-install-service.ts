import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PwaInstallService {
  private promptEvent: any;
  constructor() {
    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();
      this.promptEvent = event;
    });
  }
  public promptPwaInstall(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      if (this.promptEvent) {
        this.promptEvent.prompt();
        this.promptEvent.userChoice.then((choiceResult: any) => {
          if (choiceResult.outcome === 'accepted') {
            resolve(true);
          } else {
            resolve(false);
          } 
        });
      } else {
        resolve(false);
      }
    });
  }
  //o esta en escritorio o esta instalada
  public isPWA(): boolean {
    return window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;
  }
  // Verifica si la app ya está instalada o si el evento está listo
  public get canInstall() {
    return !!this.promptEvent;
  }
}
