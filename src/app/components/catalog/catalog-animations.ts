import { trigger, state, style, transition, animate } from '@angular/animations';
export const divTrigger = trigger('divTrigger', [

  state('show', style({
    opacity: 1
  })),
  transition('void => show', [
    style({
      opacity: 0
    }),
    animate(1000, style({
      opacity: 1
    })),
    animate(1000)
  ])
]);
