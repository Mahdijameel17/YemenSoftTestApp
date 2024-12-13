import { NgFor } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PDFGenerator } from '@awesome-cordova-plugins/pdf-generator/ngx';

import { IonHeader, IonButton, IonContent, ModalController,IonButtons, IonToolbar, IonTitle, IonIcon, IonFooter,IonInput ,IonTextarea,IonDatetime} from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import {  arrowBackOutline} from 'ionicons/icons';
@Component({
  selector: 'app-invoice-countrie',
  templateUrl: './invoice-countrie.component.html',
  styleUrls: ['./invoice-countrie.component.scss'],
  standalone: true,
  imports: [IonFooter, IonIcon, IonTitle, IonToolbar, IonButtons, IonContent, IonButton, IonHeader,NgFor,IonInput,IonTextarea,IonDatetime,FormsModule],
})
export class InvoiceCountrieComponent implements OnInit {
  invoiceNumber: string = '';
  invoiceDate: string = '';
  customerName: string = '';
  address: string = '';
  transactionNumber: string = '';
  total: number = 0;
  items: { name: string, price: number }[] = [];

  constructor(private modalContrller: ModalController, private pdfGenerator: PDFGenerator) {}

  ngOnInit() {}

  addItem() {
    this.items.push({ name: '', price: 0 });
  }

  calculateTotal(event: any): void {
    const price = event.detail.value || 0;
    this.total = Number(this.total) + Number(price);
  }

  downloadInvoice() {
    const element = document.getElementById('PrintInvoice');
    if (element) {
      const options = {
        documentSize: 'A4',
        type: 'share',
        fileName: 'My-Invoice.pdf'
      };
      
      // طباعة الفاتورة باستخدام PDF Generator
      this.pdfGenerator.fromData(element.innerHTML, options)
        .then((base64) => {
          console.log('تم إنشاء الفاتورة بنجاح', base64);
        })
        .catch((error) => {
          console.log('حدث خطأ أثناء إنشاء الفاتورة', error);
        });
    }
  }

  closeModal() {
    this.modalContrller.dismiss();
  }
}
