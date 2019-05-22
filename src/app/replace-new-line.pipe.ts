import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceNewLine'
})
export class ReplaceNewLinePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value ? value.replace(/(↵|\/n)/g, '<br/>') : null;
  }

}
