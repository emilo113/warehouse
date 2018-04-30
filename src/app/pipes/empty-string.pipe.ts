import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'empty'
})

export class EmptyPipe implements PipeTransform {

    transform(value: string, custom: string): string {
        if (null === value || '' === value) {
            return custom;
        }

        return value;
    }

}
