import {  trigger,
    state,
    style,
    animate,
    transition,} from '@angular/animations';

export const openBascket = trigger ('openBascket', [
    // state('open', style({
    //     maxHeight: '500px',
    //     height: 100,
    //     opacity: 1
    // })),
    transition('void => *', [
        style({ opacity: 0, height: '0' }),
        animate(400, style({ opacity: 1, height: '*'}))
    ]),
    transition('* => void', [
        animate(400, style({ opacity: 0, height: '0' }))
      ])
]);