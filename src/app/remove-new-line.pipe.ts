import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeNewLine'
})
export class RemoveNewLinePipe implements PipeTransform {

  transform(value: string, args?: any): any {

    return value ? value.replace(/↵/g, ' ') : null;
  }

}
