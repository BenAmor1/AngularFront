import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
interface Categorie {
  Id: number;
  Nom: string;
  Qt: number;
  Datecreation: Date;
  Datemmodif: Date;
  produits: Produit;
}

interface Produit {
  Id: number;
  Nom: string;
  Qt: number;
  Datecreation: Date;
  Datemodif: Date;
  Disponible: boolean;
  categories: Categorie;
}
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root'
})
export class ProduitServiceService {
  url = 'http://localhost:8082/SpringMVC/servlet/';
  constructor(private http: HttpClient) { }

  get(): Observable<any> {
    return this.http.get<Produit>(this.url + 'listofproduct');
  }

  post(produit: any, id: string | number | undefined): Observable<any> {
    return this.http.post<any>(`${this.url + 'addprod'}/${id}`,
      produit,
      httpOptions);
  }
  update(produit: any, id: any): Observable<any> {
    return this.http.put<any>(this.url + 'updateProduit/' + id, produit);
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(this.url + 'deleteproduitById/' + id);
  }

  getProductsByCategory(idCategorie: string | number | undefined): Observable<any> {
    return this.http.get<Produit>(this.url + 'listProdByCategory/' + idCategorie);
  }



}
