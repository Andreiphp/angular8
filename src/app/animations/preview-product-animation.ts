import {
    trigger,
    transition,
    style,
    query,
    group,
    animateChild,
    animate,
    keyframes,
    state,
} from '@angular/animations';
export const animatePreview =
    trigger('animPreview', [
        state('initial', style({ opacity: 1 })),
        state('hide', style({ opacity: 0 })),
        state('void', style({ opacity: 0 })),
        transition('void <=> initial', animate('0.5s')),
        transition('initial <=> hide', animate('0.5s')),
    ]);

export const animateOverlay =
    trigger('animOverlay', [
        state('initial', style({ opacity: 0.5 })),
        state('hide', style({ opacity: 0 })),
        transition('initial <=> hide', animate('0.5s'))
    ]);