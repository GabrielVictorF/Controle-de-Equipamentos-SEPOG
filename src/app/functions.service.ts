import { Injectable } from '@angular/core';
import nativeToast from 'native-toast';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {
  constructor() {}

  public showToast(message: string, type: string) {
    nativeToast({
      message: message,
      position: 'north-east',
      // Self destroy in 5 seconds
      timeout: 5000,
      type: type, //success warning info error
      closeOnClick: true
    });
  }
}
