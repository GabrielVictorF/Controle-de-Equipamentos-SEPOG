import { Injectable } from '@angular/core';[]
declare var init;
declare var toast;

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {
  constructor() { 
    init({
     position: 'bottom-right'
    });
  }

  public showToast(title: string, description: string, type: string) {
   toast({
      title: title, 
      description: description,
      timeout: '2000', 
      type: type, 
      close_color: '#3498db',
      border_color: '#3498db',
    }) 
  }
}
