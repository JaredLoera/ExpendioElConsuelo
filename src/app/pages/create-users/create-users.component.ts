import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";
import { User } from 'src/app/core/services/user/user';
import { user } from 'src/app/core/interfaces/user';
import Swal from 'sweetalert2';
import { ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.css'],
  imports: [IonicModule, ReactiveFormsModule, CommonModule, HeaderComponent]
})
export class CreateUsersComponent implements OnInit, ViewWillEnter {

  ngOnInit() { }
  userForm: FormGroup;
  showPassword = false;
  usuarios: user[] = [];


  constructor(private fb: FormBuilder, private toastCtrl: ToastController, private userService: User) {
    this.userForm = this.fb.group({
      nickname: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  ionViewWillEnter(): void {
    this.userForm.reset();
    this.loadUsers();
  }
  loadUsers() {
    this.userService.getUsers().subscribe({
      next: (data: user[]) => {
        console.log('Usuarios cargados:', data);
        this.usuarios = data;
      },
      error: (error) => {
        console.error('Error al cargar usuarios:', error);
      }
    });
  }

  async onSubmit() {
    if (this.userForm.valid) {
      console.log('Datos del usuario:', this.userForm.value);
      const newUser: user = {
        fullName: this.userForm.value.nickname,
        email: this.userForm.value.email,
        password: this.userForm.value.password
      };

      this.userService.createUser(newUser).subscribe({
        next: async (response) => {
          await Swal.fire({
            icon: 'success',
            title: 'Usuario creado',
            text: 'El usuario ha sido creado exitosamente.',
            heightAuto: false,
          });
          this.userForm.reset();
          this.loadUsers();
        },
        error: async (error) => {
          await Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo crear el usuario. Inténtalo de nuevo.',
            heightAuto: false,
          });
        }
      });
      this.loadUsers();
    }

  }

  async toggleUserStatus(user: user) {
    // Cambiamos el estado localmente
    user.active = !user.active;

    // Aquí llamarías a tu servicio de AdonisJS
    // Ejemplo: this.userService.updateStatus(user.id, user.active).subscribe(...)

    const statusMsg = !user.active ? 'activado' : 'desactivado';
    await Swal.fire({
      icon: 'success',
      title: 'Estado actualizado',
      text: `El usuario ha sido ${statusMsg} exitosamente.`,
      heightAuto: false,
    });
    this.loadUsers();
    
  }
}
