import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OverlayEventDetail } from '@ionic/core/components';
import Swal from 'sweetalert2';
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

import { brand } from 'src/app/core/interfaces/brand';
import { Products } from 'src/app/core/services/products/products';
import { product } from 'src/app/core/interfaces/product';
import { Orders } from 'src/app/core/services/orders/orders';
import { responseMessage } from 'src/app/core/interfaces/responseMessage';
@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css'],
  imports: [IonItemOption, IonItemOptions, IonItemSliding, IonFooter, IonNote, IonList, IonBadge, IonCol, IonGrid, IonRow, IonListHeader, IonLabel, IonIcon,
    IonHeader,
    IonButtons,
    IonBackButton,
    FormsModule,
    IonButton,
    IonContent,
    IonInput,
    IonItem,
    IonModal,
    IonTitle,
    IonToolbar,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonIcon
  ]
})
export class CreateOrderComponent implements OnInit {

  constructor(private productsService: Products, private ordersService: Orders) { }

  paso: number = 1;
  cantidad: number = 1;
  listBrands: brand[] = [];
  listProducts: product[] = [];
  // El arreglo final que enviarás a la API
  ventaFinal = {
    orderDetails: [] as any[]
  };

  // Variable para mostrar en la pantalla principal (opcional, para ver nombres y precios)
  carritoVisual: any[] = [];

  totalVenta: number = 0;


  @ViewChild(IonModal) modal!: IonModal;

  message = 'De clic en el boton para añadir una venta.';
  name!: string;

  ngOnInit() {
    this.productsService.getBrands().subscribe({
      next: (brands: brand[]) => {
        this.listBrands = brands;
        console.log('Marcas obtenidas:', this.listBrands);
      },
      error: (error) => {
        console.error('Error fetching brands:', error);
      }
    });
  }
  seleccionarMarca(nombre: string, id: number) {
    this.seleccion.marca = nombre;
    this.seleccion.brandId = id;
    this.cantidad = 1; // Reinicia la cantidad al seleccionar una nueva marca
    this.productsService.getProductsByBrand(id).subscribe({
      next: (products: product[]) => {
        this.listProducts = products;
        console.log('Productos obtenidos:', this.listProducts);
      }
      ,
      error: (error) => {
        console.error('Error fetching products:', error);
      }
    });
    this.paso = 2; // Avanza al siguiente paso
  }
  cambiarCantidad(valor: number) {
    const nuevaCantidad = this.seleccion.cantidad + valor;
    if (nuevaCantidad >= 1) {
      this.seleccion.cantidad = nuevaCantidad;
    }
  }

  onWillDismiss(event: CustomEvent<OverlayEventDetail>) {
    if (event.detail.role === 'Agregar') {
      this.message = `Hola, ${event.detail.data}!`;
    }
  }

  seleccion = {
    marca: '',
    presentacion: '',
    brandId: 0,
    cantidad: 1,
    productId: 0,
    precioUnitario: 0
  };

  seleccionarPresentacion(producto: any) {
    this.seleccion.presentacion = producto.name;
    this.seleccion.productId = producto.id;
    this.seleccion.precioUnitario = parseFloat(producto.price);
    this.seleccion.cantidad = 1;
    this.paso = 3;
  }

  // Asegúrate de reiniciar el paso a 1 cuando se cierre el modal
  cancel() {
    this.paso = 1;
    this.modal.dismiss(null, 'Cancelar');
  }
  eliminarProducto(index: number) {
    // 1. Eliminar del arreglo visual
    this.carritoVisual.splice(index, 1);

    // 2. Eliminar del arreglo que va a la API
    this.ventaFinal.orderDetails.splice(index, 1);

    // 3. Recalcular el total
    this.calcularTotal();

    // Opcional: Si el carrito queda vacío, puedes reiniciar variables
    if (this.carritoVisual.length === 0) {
      this.totalVenta = 0;
    }
  }

  confirm() {
    // 1. Creamos el objeto para la API
    const nuevoDetalle = {
      productId: this.seleccion.productId,
      quantity: this.seleccion.cantidad
    };
    // 2. Creamos un objeto para la vista (para mostrar nombre y subtotal en la lista)
    const itemVisual = {
      nombre: `${this.seleccion.marca} - ${this.seleccion.presentacion}`,
      cantidad: this.seleccion.cantidad,
      subtotal: this.seleccion.cantidad * this.seleccion.precioUnitario
    };
    // 3. Agregamos a los arreglos
    this.ventaFinal.orderDetails.push(nuevoDetalle);
    this.carritoVisual.push(itemVisual);
    // 4. Actualizamos el total general
    this.calcularTotal();
    // 5. Cerramos y reiniciamos
    this.modal.dismiss(this.ventaFinal, 'agregar');
    this.resetFormulario();
  }
  calcularTotal() {
    this.totalVenta = this.carritoVisual.reduce((acc, item) => acc + item.subtotal, 0);
  }

  resetFormulario() {
    this.paso = 1;
    this.seleccion = { marca: '', presentacion: '', brandId: 0, productId: 0, cantidad: 1, precioUnitario: 0 };
  }

  createOrderPost() {
    console.log('Orden a enviar:', this.ventaFinal);
    this.ordersService.createOrder(this.ventaFinal).subscribe({
      next: (response: responseMessage) => {
        console.log('Orden creada exitosamente:', response);
        this.resetFormulario();
        this.carritoVisual = [];
        this.totalVenta = 0;
        this.ventaFinal = { orderDetails: [] };
        Swal.fire({
          title: '¡Venta Registrada!',
          text: 'El pedido se ha enviado correctamente',
          icon: 'success',
          heightAuto: false,
          confirmButtonColor: '#3880ff',
          confirmButtonText: 'Excelente'
        });
      },
      error: (error) => {
        console.error('Error al crear la orden:', error);
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al enviar el pedido. Por favor, inténtalo de nuevo.',
          icon: 'error',
          heightAuto: false,
          confirmButtonColor: '#3880ff',
          confirmButtonText: 'Cerrar'
        });
      }
    });
  }

}
