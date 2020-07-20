import { Component, OnInit,HostListener,Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  public innerWidth;

  @Input() inhome:boolean;
  @Input() incontact:boolean;
  @Input() inabout:boolean;
  @Input() inblog:boolean;
  @Input() insblog:boolean;

  constructor() { }

  ngOnInit() {
    this.innerWidth=window.innerWidth;
  }

  @HostListener('window:resize',['$event'])
  onResize(event) {
      this.innerWidth=window.innerWidth;      
  }
}
