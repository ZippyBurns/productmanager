import { Component, OnInit } from '@angular/core';
import {HttpService} from '../http.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  allProducts: any;
  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.getAllProducts()
  }

  getAllProducts(){
    this._httpService.getProducts().subscribe( data =>{
      
      console.log(data, "Got All Products");
      this.allProducts = data['allProducts']
    })
  }

  deleteProduct(id){
    this._httpService.deleteOne(id).subscribe(data =>{
      console.log(data,"delete complete");
    })
    this.getAllProducts();
  }
}
