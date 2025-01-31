import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() {
   }

   isDarkMode:boolean = false;

   toggleMode(){
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark', this.isDarkMode);
    document.body.classList.toggle('light', !this.isDarkMode);
   }
}
