import { Injectable } from '@angular/core';[]
declare var init;
declare var toast;

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {
  constructor() { 
    init({
     position: 'bottom-right',
     fade_out: 400,
     fade_in: 400
    });
  }

  public showToast(title: string, description: string, type: string) {
   toast({
      title: title, 
      description: description,
      timeout: '2000', 
      type: type, 
      radius: 5,    
      close_color: '#3498db',
      border_color: '#3498db'
    }) 
  }
}
