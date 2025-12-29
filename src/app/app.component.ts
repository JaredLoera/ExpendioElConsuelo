import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { SwUpdate } from '@angular/service-worker';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
     constructor(private swUpdate: SwUpdate) {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.subscribe(event => {
        if (event.type === 'VERSION_READY') {
            // Notifica al usuario
            Swal.fire({
              title: 'Actualización disponible',
              text: 'Hay una nueva versión de la aplicación. ¿Desea actualizar ahora?',
              icon: 'info',
              showCancelButton: true,
              heightAuto: false,
              confirmButtonText: 'Actualizar',
              cancelButtonText: 'Más tarde'
            }).then((result) => {
              if (result.isConfirmed) {
                // Recarga la página para activar la nueva versión
                window.location.reload();
              }
            });
          }
      });
    }
  }
}

