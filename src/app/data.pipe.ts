import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'data'
})
export class DataPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
  	value = value.toString();
  	let dataFormatada = `${value.substr(8, 2)}/${value.substr(5, 2)}/${value.substr(0, 4)}`; // DD/MM/YYYY
  	return dataFormatada;
  }

}
