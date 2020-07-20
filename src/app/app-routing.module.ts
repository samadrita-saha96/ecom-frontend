import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { HomeComponent } from './components/home/home.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ContactComponent } from './components/contact/contact.component';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AboutComponent } from './components/about/about.component';
import { BlogComponent } from './components/blog/blog.component';
import { SingleBlogComponent } from './components/single-blog/single-blog.component';
import { ProductComponent } from './components/product/product.component';

const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'home'},
  {path:'home',component: HomeComponent},
  {path:'catalogs',component: CategoriesComponent},
  {path:'contact',component: ContactComponent},
  {path:'cart',component:CartComponent },
  {path:'check-out-items',component:CheckOutComponent },
  {path:'account/sign-in',component:LoginComponent },
  {path:'account/register',component:RegisterComponent },
  {path:'about',component:AboutComponent},
  {path:'blog',component:BlogComponent},
  {path: 'blog/single-blog', component: SingleBlogComponent},
  {path: 'p/mens-clothing/:sub_name', component: ProductComponent},
  {path: 'p/womens-clothing/:sub_name', component: ProductComponent},
  {path:'p/:cat/:sub/:prod_name',component:ProductPageComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
