import { Component } from '@angular/core';

@Component({
    selector: 'app-review-placeholder',
    templateUrl: './review-placeholder.component.html',
    styleUrls: ['./review-placeholder.component.css']
})
export class ReviewPlaceholderComponent {

    createRange(number: number) {
        return new Array(number).fill(0)
            .map((n, index) => index + 1);
    }

}
