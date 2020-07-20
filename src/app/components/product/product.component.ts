import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProductModel } from 'src/app/models/Product';
import * as jwt_decode from 'jwt-decode';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  sub_name:any;
  ProductBySub:ProductModel[]=[];
  Sub_list=['t-shirt','casual-shirt','formal-shirt']
  sub_id:any;
  currentUrl:string="";
  constructor(
    private route:ActivatedRoute,
    private productService:ProductService,
    ) { 
    this.route.params.subscribe(
      params =>  this.sub_name=params.sub_name
    ); 
    // for(var i=0; i<2;i++){
    //   if(this.Sub_list[i]==this.sub_name){
    //     this.sub_id={'subid':i+1}
    //   }
    // }    
  }

  ngOnInit() {
    this.currentUrl=window.location.href;
    console.log(this.currentUrl)
    if(this.currentUrl.includes("womens-clothing")){
      if(this.sub_name=="top"){        
        this.sub_id={'subid':4};
      }
    }
    else if(this.currentUrl.includes("mens-clothing")){
      if(this.sub_name=="t-shirt"){ 
        this.sub_id={'subid':1};
      }
      else if(this.sub_name=="casual-shirt"){ 
        this.sub_id={'subid':2};
      } 
      else if(this.sub_name=="formal-shirt"){ 
        this.sub_id={'subid':3};
      }
      else if(this.sub_name=="suits"){ 
        this.sub_id={'subid':8};
      }
      else if(this.sub_name=="blazer"){ 
        this.sub_id={'subid':9};
      }
      else if(this.sub_name=="waistcoat"){ 
        this.sub_id={'subid':10};
      }
      else if(this.sub_name=="casual-trouser"){ 
        this.sub_id={'subid':11};
      }
      else if(this.sub_name=="formal-trouser"){ 
        this.sub_id={'subid':12};
      }
      else if(this.sub_name=="jeans"){ 
        this.sub_id={'subid':13};
      }
      else if(this.sub_name=="track-pant"){ 
        this.sub_id={'subid':14};
      }
      else if(this.sub_name=="three-fourth"){ 
        this.sub_id={'subid':15};
      }
      else if(this.sub_name=="shorts"){ 
        this.sub_id={'subid':16};
      }
      else if(this.sub_name=="cargos"){ 
        this.sub_id={'subid':17};
      }
      else if(this.sub_name=="kurtas"){ 
        this.sub_id={'subid':18};
      }
      else if(this.sub_name=="sherwanis"){ 
        this.sub_id={'subid':19};
      }
      else if(this.sub_name=="dhoti"){ 
        this.sub_id={'subid':20};
      }
      else if(this.sub_name=="ethenic-sets"){ 
        this.sub_id={'subid':21};
      }
      else if(this.sub_name=="ethenic-pajamas"){ 
        this.sub_id={'subid':22};
      }
      else if(this.sub_name=="nehru-jackets"){ 
        this.sub_id={'subid':23};
      }
    }
    else if(this.currentUrl.includes("kids&babies-clothing")){

    }
    this.productService.getProductbysub(this.sub_id).subscribe(
      (result:ProductModel[]) => {
        for(let i=0;i<result.length;i++){
          var dt=JSON.stringify(result[i]).split("").reverse().join("");
          result[i]=jwt_decode(dt)
        }
        
        
        this.ProductBySub=result;
      },
      error => console.log(error)
    )
    
  }

  viewProduct(id){
    location.href = `/product/view/${id}`;
  }
  openprod(pname){
    pname = pname.replace(/ /g,'_')
    location.href = this.currentUrl+"/"+pname
  }
}
