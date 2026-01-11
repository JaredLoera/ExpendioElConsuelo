import { Component, OnInit } from '@angular/core';
import { IonHeader, IonContent, IonTitle, IonCard, IonToolbar, IonCardContent, IonProgressBar, IonIcon, IonBadge, IonNote, IonModal, IonButtons, IonButton, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonListHeader, IonInput } from "@ionic/angular/standalone";
import { Stock } from 'src/app/core/interfaces/stock';
import { Stockservice } from 'src/app/core/services/stock/stockservice';
import { ViewWillEnter } from '@ionic/angular';
import { product } from 'src/app/core/interfaces/product';
import { HeaderComponent } from "../header/header.component";
import { ViewChild } from '@angular/core';
import { OverlayEventDetail } from '@ionic/core/components';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Products } from 'src/app/core/services/products/products';
import { brand } from 'src/app/core/interfaces/brand';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css'],
  imports: [IonCol, IonRow, IonGrid, IonButton, IonButtons, IonModal,
    IonContent, IonCard, IonCardContent, IonProgressBar, IonIcon, IonBadge,
    HeaderComponent, IonHeader, IonTitle, IonToolbar,
    FormsModule,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonNote,
  
    IonModal,
    IonTitle,
    IonToolbar,
   
    IonListHeader
  ]
})

export class StockComponent implements OnInit, ViewWillEnter {
  stocks = [] as Stock[];
  constructor(private stockService: Stockservice, private productsService: Products) { }

  ngOnInit() { }
  ionViewWillEnter() {
    this.loadStock();
    this.loadBrands();
  }
  loadBrands() {
    this.productsService.getBrands().subscribe((data) => {
      this.Brands = data;
    });
  }
  loadStock() {
    this.stockService.getStock().subscribe((data) => {
      this.stocks = data;
    });
  }
  getProgreso(actual: number, minimo: number): number {
    if (actual >= minimo) return 1;
    return actual / minimo;
  }

  // Función para determinar el color
  getColor(actual: number, minimo: number): string {
    if (actual <= minimo * 0.25) return 'danger';  // Menos del 25% del mínimo (Crítico)
    if (actual <= minimo) return 'warning';        // Por debajo del mínimo (Reordenar)
    return 'success';                              // Por encima del mínimo (Seguro)
  }

  obtenerStockDesglosado(totalUnits: number, product: product) {
    const unidadesPorCaja = product.contentUnits; // Usar contentUnits del producto
    const cajas = Math.floor(totalUnits / unidadesPorCaja);  //six sueltos


    let restante = totalUnits % unidadesPorCaja;
    const sixSueltos = Math.floor(restante / 6);


    let six = 0;
    let unidadesSueltas = restante;
    if (unidadesPorCaja === 24) {
      six = Math.floor(restante / 6);
      unidadesSueltas = restante % 6;
    }



    return {
      cajas: cajas,
      six: sixSueltos,
      unidades: unidadesSueltas,
      esCaguama: unidadesPorCaja === 12 || product.name.toLowerCase().includes('mega') || product.name.toLowerCase().includes('familia')
    };
  }

  // Supongamos que 50 charolas es tu stock ideal (para la barra visual)
  getPercentage(units: number): number {
    const maxUnits = 50;
    return units / maxUnits;
  }
  seleccion = {
    marca: '',
    presentacion: '',
    brandId: 0,
    cantidad: 1,
    productId: 0,
    stockId: 0, // Importante para tu API
    unidadesPorPaquete: 0,
    precioUnitario: 0
  };
  seleccionadaImagen: string = '';

  Brands: brand[] = [];
  listProducts: product[] = [];
  products: product[] = [];
  paso: number = 1

  @ViewChild(IonModal) modal!: IonModal;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name!: string;

  cancel() {
    this.modal.dismiss(null, 'cancel');
    this.paso = 1;
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: CustomEvent<OverlayEventDetail>) {
    if (event.detail.role === 'confirm') {
      this.message = `Hello, ${event.detail.data}!`;
    }
  }
  seleccionarMarca(nombre: string, id: number) {
    this.seleccion.marca = nombre;
    this.seleccion.brandId = id;
    this.stockService.getStockByBrand(id).subscribe({
      next: (stocks: product[]) => {
        console.log('Stock obtenidos:', stocks);
        this.products = stocks;
      }
    });
    this.paso = 2; // Avanza al siguiente paso
  }
  seleccionarPresentacion(producto: any) {
    this.seleccion.presentacion = producto.name;
    this.seleccion.productId = producto.id;
    this.seleccion.unidadesPorPaquete = producto.contentUnits;

    // Buscamos el stockId correspondiente en tu lista de stocks original
    const stockEncontrado = this.stocks.find(s => s.productId === producto.id);
    this.seleccion.stockId = stockEncontrado ? stockEncontrado.id : 0;

    this.seleccionadaImagen = producto.imagen;
    this.seleccion.cantidad = 1;
    this.paso = 3;
  }

  cambiarCantidad(valor: number) {
    // Aseguramos que si el input está vacío o es NaN, lo trate como 0 antes de sumar
    const actual = Number(this.seleccion.cantidad) || 0;
    const nuevoValor = actual + valor;

    // Evitar números negativos
    if (nuevoValor >= 0) {
      this.seleccion.cantidad = nuevoValor;
    }
  }

  validarInputManual() {
  if (this.seleccion.cantidad === null || this.seleccion.cantidad < 0) {
    this.seleccion.cantidad = 0;
  }
}

  async confirmarSurtido() {

    this.stockService.updateStockProduct(this.seleccion.stockId, this.seleccion.cantidad).subscribe({
      next: () => {
        Swal.fire('¡Éxito!', 'El inventario ha sido actualizado.', 'success');
        this.loadStock(); // Recarga la lista de afuera
        this.modal.dismiss();
        this.paso = 1;
      },
      error: (err) => {
        Swal.fire('Error', 'No se pudo actualizar el stock.', 'error');
      }
    });
  }
}

