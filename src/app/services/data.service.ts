import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private logged_user = new BehaviorSubject('default')
  user = this.logged_user.asObservable()
  constructor() { }

  setUser(user:string){
    this.logged_user.next(user);
  }
  
}
