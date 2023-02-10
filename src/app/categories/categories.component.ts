import { Component, OnInit } from '@angular/core';
import {CategorieServiceService} from '../service/categorie-service.service';

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
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  catList: any ;
  cat: any;
  constructor( private categoryService: CategorieServiceService){ }
  ngOnInit(): void {
    this.onLoaddata();
    this.initfields();
  }
  onLoaddata() {
    console.log('Connexion...');
    this.categoryService.get().subscribe((data) => {

      console.log(data);
      this.catList = data;
    });
  }
  initfields(){
    this.cat = {
      nom:  '',
      qt: '',
      datemmodif: ''
    };
  }
  save(){
    this.categoryService.post(this.cat).subscribe((data) => {
      console.log(data);
      this.catList.push(data);
      this.onLoaddata();
    });
    this.initfields();
    this.onLoaddata();
  }

  onEdit(localcat: any){
    this.cat = localcat;
    this.onLoaddata();
  }

  edit (id: any, entity: any) {
    this.categoryService.update(entity, id).subscribe((data) => {
      console.log(data);
      this.onLoaddata();
      this.initfields();
    });
  }

  delete( id: any){
    this.categoryService.delete(id).subscribe(data => {

      console.log(data);
      this.onLoaddata();
      
    })
  }
  annuler(){
    this.initfields();
    this.onLoaddata();
  }

}
