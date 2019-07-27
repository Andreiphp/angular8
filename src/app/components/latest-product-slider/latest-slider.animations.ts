import { trigger, state, group, style, animate, transition } from '@angular/animations';
export const sliderState = trigger('productNew', [
  transition('all => active', [
    style({
      opacity: 0
    }),
    group([
      animate('0s 0.1s ease-in', style({
        transform: 'scale3d(0.3, 0.3, 0.3)'
      })),
      animate('0.9s 0.4s ease', style({
        opacity: 1,
        transform: 'scale3d(1, 1, 1)'
      }))
    ])
  ])
]);


