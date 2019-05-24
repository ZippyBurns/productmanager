import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  titleError: any;
  priceError: any;

  newProduct = {
    title: "",
    price: "",
    imgUrl: ""
  }
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router) {
    console.log("Constructor in new comp. *******");
  }

  ngOnInit() {
  }

  createNewProduct() {
    this._httpService.newProduct(this.newProduct).subscribe(data => {

      if (data['error'] != undefined) {
        if (data['error']['errors']['title']) {
          this.titleError = data['error']['errors']['title']['message'];
          console.log(data['error']);
        }
        if (data['error']['errors']['price']) {
          this.priceError = data['error']['errors']['price']['message'];
        }
      }
      else {
        console.log("new product component in service", data);
        this.newProduct = {
          title: "",
          price: "",
          imgUrl: ""
        }
        this._router.navigate(['/inventory'])
      }
    })
  }

}
