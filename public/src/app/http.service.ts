import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  getProducts(){
    return this._http.get('/products')
  }

  newProduct(product){
    return this._http.post('/products', product)
  }
  getProduct(id){
    return this._http.get('/products/'+ id)
  }
  
  editProduct(product){
    return this._http.put('/products/' +product._id, product)
  }

  deleteOne(id){
    return this._http.delete('/products/' +id)
  }
}

