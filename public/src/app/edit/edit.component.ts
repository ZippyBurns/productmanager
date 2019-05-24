import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  titleError: any;
  priceError: any;
  productId: any;
  editProduct = {
    title: "",
    price: "",
    imgUrl: ""
  }
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      console.log(params['id'])
      this.productId = params['id'];
      this.getOneProduct()  
    });
  }

  postEdit() {
    this._httpService.editProduct(this.editProduct).subscribe(data => {
      if (data['error'] != undefined) {
        if (data['error']['title']) {
          this.titleError = data['error']['title'];
          console.log(data['error']);
        }
        if (data['error']['price']) {
          this.priceError = data['error']['price'];
        }
      } 
      else {
        console.log("edit Product component in server", data);
        this._router.navigate(['/inventory'])
      }
    })
  }
  getOneProduct() {
    this._httpService.getProduct(this.productId).subscribe(data => {
      console.log("got one author", data)
      this.editProduct = data['product']
    })
  }

}
