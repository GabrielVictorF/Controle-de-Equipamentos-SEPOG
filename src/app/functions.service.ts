import { Injectable } from '@angular/core';
import nativeToast from 'native-toast';


//declare var init;
//declare var toast;

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {
  constructor() { 
    /*init({
     position: 'bottom-right',
     fade_out: 400,
     fade_in: 400
    }); */
  }

  public showToast(message: string, type: string) {
    nativeToast({
      message: message,
      position: 'north-east',
      // Self destroy in 5 seconds
      timeout: 5000,
      type: type,
      closeOnClick: true
    })
    console.log('ook')
   /*toast({
      title: title, 
      description: description,
      timeout: '2000', 
      type: type,   
      close_color: '#3498db',
      border_color: '#3498db'
    }) */
  }
}
