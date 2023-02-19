import { Pipe, PipeTransform } from '@angular/core';
import { Copyright } from '../models/Music/album';
@Pipe({
    name: 'copyrightPipe'
})
export class CopyrightPipe implements PipeTransform {

    transform(value: Copyright) {
        var text = value.text;
        if (text.includes("(P)") || text.includes("(C)")){
            var start = value.text.indexOf("(")
            var end = value.text.indexOf(")") + 1;
            var copyrightText = value.text.substring(start, end);
            text = text.replace(copyrightText, "");
        }
        text = text.replace("℗", "").replace("©", "");
        var type = value.type == "C" ? "©":"℗"
        return  `${type} ${text}`;
    }
}
