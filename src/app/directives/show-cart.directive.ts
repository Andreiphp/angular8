import {
    Directive,
    ElementRef,
    HostListener,
    SimpleChanges,
    Input,
    Output,
    EventEmitter,
    OnChanges
} from '@angular/core';
import {MainServices} from '../services/main.service';


@Directive({
    selector: '[appShowCart]'
})
export class ShowCartDirective implements OnChanges {
    cart: Node;
    main: HTMLElement;
    event: CustomEvent;

    constructor(private element: ElementRef, ) {

    }

    @Input('appShowCart')
    bgClass: string;

    @Output("pa-add")
    click = new EventEmitter<string>();


    @HostListener('click') onclick() {


    }


    ngOnChanges(changes: SimpleChanges) {

        let change = changes['bgClass'];
        let classList = this.element.nativeElement.classList;
        if (!change.isFirstChange() && classList.contains(change.previousValue)) {
            classList.remove(change.previousValue);
        }
        if (!classList.contains(change.currentValue)) {
            classList.add(change.currentValue);
        }
    }

}
