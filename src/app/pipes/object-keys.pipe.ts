import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'keys'
})

export class ObjectKeysPipe implements PipeTransform {

    transform(value, args: string[]): any {
        const keys = [];

        for (const key in value) {
            keys.push(key);
        }

        return keys;
    }

}
