import {
    trigger,
    transition,
    style,
    query,
    group,
    animateChild,
    animate,
    keyframes,
} from '@angular/animations';
export const fader =
  trigger('routeAnimations', [
    transition('* => *', [
        query(
          ':enter',
          [style({ opacity: 0 })],
          { optional: true }
        ),
        query(
          ':leave',
          // here we apply a style and use the animate function to apply the style over 0.3 seconds
          [style({ opacity: 1 }), animate('0.3s', style({ opacity: 0 }))],
          { optional: true }
        ),
        query(
          ':enter',
          [style({ opacity: 0 }), animate('0.3s', style({ opacity: 1 }))],
          { optional: true }
        )
      ])
]);