
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import {ProduitServiceService} from '../service/produit-service.service';
import {CategorieServiceService} from '../service/categorie-service.service';
import { jsPDF } from 'jspdf';
// @ts-ignore
import pdfMake from 'pdfmake/build/pdfmake';
// @ts-ignore
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
// @ts-ignore
import htmlToPdfmake from 'html-to-pdfmake';
import * as XLSX from 'xlsx';

interface Categorie {
  id: number;
  nom: string;
  qt: number;
  datecreation: Date;
  datemmodif: Date;
  produits: Produit;

}

interface Produit {
  id: number;
  nom: string;
  qt: number;
  datecreation: Date;
  datemodif: Date;
  disponible: boolean;
  categories: Categorie;
}
@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {
  id: any ;
  prod: any ;
  prodList: any ;
  title = 'export-to-excel';
  fileName = 'ExcelSheet.xlsx';
  @ViewChild('pdfTable') pdfTable: ElementRef | undefined;
  @ViewChild('f') feedbackFormDirective: any;
  constructor(private produitService: ProduitServiceService ,
              private categorieService: CategorieServiceService,
              private act: ActivatedRoute) { }
  ngOnInit(): void {
    this.id = this.act.snapshot.params.id ;
    this.onLoaddata();
    this.initfields();
    console.log(this.id);

  }
  onLoaddata() {
    console.log('Connexion...');
    this.produitService.getProductsByCategory(this.id).subscribe((data) => {
      console.log(data);
      this.prodList = data;
    });
  }

  initfields(){
    this.prod = {
      'nom': '',
      'qt':'',
      'disponible': '',

    };
  }

  save() {
    this.produitService.post(this.prod, this.id).subscribe(() => {
      console.log('IdCategory: ---- ' + this.id);
      console.log('ok');
      this.onLoaddata();
    });
    this.onLoaddata();
    this.initfields();
  }


  onEdit(localcat: any){
    this.prod = localcat;
    this.onLoaddata();
  }

  edit (id: any, entity: any) {
    this.produitService.update(entity, id).subscribe((data) => {
      this.onLoaddata();
      console.log(data);
    });
    this.onLoaddata();
    this.initfields();
  }

  delete( id: any){
    this.produitService.delete(id).subscribe(data => {
      alert('Voulez vous suprimer le produit');
      console.log(data);
      this.onLoaddata();
    }),
      this.onLoaddata();
  }
  annuler(){
    this.initfields();
    this.onLoaddata();
  }

  public SavePDF() {
    const doc = new jsPDF();

    // @ts-ignore
    const pdfTable = this.pdfTable.nativeElement;

    // tslint:disable-next-line:prefer-const
    var html = htmlToPdfmake(pdfTable.innerHTML);

    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open();
    this.onLoaddata();
  }
  exportexcel(): void {
    const colSup = document.getElementById('coloneSupp');
    // @ts-ignore
    colSup.remove();
    const colSup1 = document.getElementById('coloneSupp1');
    // @ts-ignore
    colSup1.remove();
    const elements = document.getElementById('pdfTable');
    const wc: XLSX.WorkSheet = XLSX.utils.table_to_sheet(elements);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet( wb, wc, 'Sheet1');
    XLSX.writeFile(wb, this.fileName);
    this.onLoaddata();
  }


}
