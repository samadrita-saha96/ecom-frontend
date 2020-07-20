import { Component, OnInit,HostListener } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  innerWidth;
  c:number=1;
  c1:number=1;
  c2:number=1;
  c3:number=1;
  constructor() { }

  ngOnInit() {
    this.innerWidth=window.innerWidth;
    for(let i=1; i<10000;i++){
      setTimeout(() => {
        this.c++;
    }, 0.4*i);
    setTimeout(() => {
      if(this.c1<100){
        this.c1++;
      }
  }, 40*i);
  setTimeout(() => {
    if(this.c2<536){
      this.c2++;
    }
}, 7.46*i);
    
}
    
  }
  @HostListener('window:resize',['$event'])
  onResize(event) {
      this.innerWidth=window.innerWidth;      
  }

}
