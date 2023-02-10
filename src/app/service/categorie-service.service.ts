import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
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
@Injectable({
  providedIn: 'root'
})
export class CategorieServiceService {
  url = 'http://172.29.50.92:8082/SpringMVC/servlet/';
  constructor(private http: HttpClient) { }

  get(): Observable <any>{
    return this.http.get<Categorie>(this.url + 'listofcategory');
  }
  post(category: any): Observable <any>{
    return this.http.post<any>(this.url + 'addCategories', category);
  }

  update(category: any, id: any): Observable <any>{
    return this.http.put<any>(this.url + 'updatecategory/' + id, category);
  }
  delete(id: any): Observable <any>{
    return this.http.delete<any>(this.url + 'deleteCategorieById/' + id);
  }
  getById(id: any): Observable <any>{
    return this.http.get<any>(this.url + 'getCategoryById/' + id);
  }


}
