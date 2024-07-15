import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestLibService {
  constructor() { 
    console.log(`constructing test lib service ${new Date()}`)
  }
}