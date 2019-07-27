
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MainServices } from '../../services/main.service';
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.sass'],
})
export class SliderComponent implements OnInit, AfterViewInit {
  images: HTMLAllCollection;
  DivWrapper: HTMLAllCollection;
  navBtn: NodeList;
  currentSlide: number;
  prevSlideImg: number;
  nextSlideImg: number;
  flagMoov: boolean;
  dragObject = {
    offsetX: 0
  };
  moobTo: number;
  moovX: number;
  shiftnext: number;
  shiftChildNext: number;
  shiftCurent: number;
  shiftPrev: number;
  shiftPrevCh: number;
  flagToBack: boolean;
  flagnewSlideMoov: boolean;
  InitPosition: number;
  flagBtnStart: boolean;
  private countSliders: number;
  private dretting: HTMLElement;
  private flagtoDo: boolean = false;

  @ViewChild('sliderSection', {static: true}) sliderSection: ElementRef;

  constructor(public el: ElementRef, private _mainSrv: MainServices) {
    this._mainSrv.subOnResize.subscribe(() => {
      this.InitPosition = this.getPosotionsElements(this.sliderSection.nativeElement);
      this.currentSlide = 1;
      this.nextSlideImg = 2;
      this.prevSlideImg = 0;
      this.initSliders();
    });
    // this._mainSrv.subOnload.subscribe(() => {

    // });
  }
  transotionendV() {
    this.dretting.addEventListener('transitionend', () => {
      if (this.flagToBack) {
        this.changeNumberSlideTo();
        this.flagBtnStart = true;
      } else {
        this.changeNumberSlideBack();
        this.flagBtnStart = true;
      }
    });
  }

  changeNumberSlideTo() {
    this.currentSlide >= this.images.length - 1 ? this.currentSlide = 0 : ++this.currentSlide;
    this.currentSlide === 0 ? this.prevSlideImg = this.images.length - 1 : this.prevSlideImg = this.currentSlide - 1;
    this.currentSlide === this.images.length - 1 ? this.nextSlideImg = 0 : this.nextSlideImg = this.currentSlide + 1;
  }
  changeNumberSlideBack() {
    this.currentSlide <= 0 ? this.currentSlide = this.images.length - 1 : --this.currentSlide;
    this.currentSlide === this.images.length - 1 ? this.nextSlideImg = 0 : this.nextSlideImg = this.currentSlide + 1;
    this.currentSlide === 0 ? this.prevSlideImg = this.images.length - 1 : this.prevSlideImg = this.currentSlide - 1;
  }
  nextSlide() {
    this.flagToBack = true;
    if (this.flagBtnStart) {
      this.flagBtnStart = false;
      this.setCurentStyle(this.nextSlideImg, 1, 1, '0s', -this.InitPosition / 2, this.InitPosition);
      this.setCurentStyle(this.prevSlideImg, 1, 1, '0s', this.InitPosition / 2, -this.InitPosition);
      this.flagtoDo = !this.flagtoDo;
      this.setGrettingDivStyle(this.flagtoDo ? '0' : '1');
      requestAnimationFrame(this.moovEndSetParamNext.bind(this));
    }
  }

  prevSlide() {
    this.flagToBack = false;
    if (this.flagBtnStart) {
      this.flagBtnStart = false;
      this.setCurentStyle(this.prevSlideImg, 1, 1, '0s', this.InitPosition / 2, -this.InitPosition);
      this.setCurentStyle(this.nextSlideImg, 1, 1, '0s', -this.InitPosition / 2, this.InitPosition);
      this.flagtoDo = !this.flagtoDo;
      this.setGrettingDivStyle(this.flagtoDo ? '0' : '1');
      requestAnimationFrame(this.moovEndSetParamPrev.bind(this));
    }
  }

  mouseDoun(event: MouseEvent): boolean {
    this.flagMoov = true;
    this.flagnewSlideMoov = true;
    if (event.which !== 1) {
      return false;
    }

    if (this.flagMoov) {
      this.shiftPrev = -this.InitPosition;
      this.shiftPrevCh = this.InitPosition / 2;
      this.shiftnext = this.InitPosition;
      this.shiftChildNext = -this.InitPosition / 2;
      this.shiftCurent = 0;
      this.dragObject.offsetX = event.pageX;
      document.onmousemove = this.movSlider.bind(this);
    }
    document.onmouseup = this.endSlide.bind(this);
    document['onmouseleave'] = this.leaveMouse.bind(this);
  }

  movSlider(event: MouseEvent) {
    this.moovX = event.pageX - this.dragObject.offsetX;
    if (Math.abs(this.moovX) < 3) {
      return false;
    }
    if (this.moovX > this.moobTo) {
      this.flagToBack = false;
    } else {
      this.flagToBack = true;
    }
    const offPrev = -(Math.abs(this.shiftPrev) + (this.dragObject.offsetX - event.pageX));
    const offPrevCh = this.shiftPrevCh + ((this.dragObject.offsetX - event.pageX) / 2);
    const offsetCurrnt = ((this.dragObject.offsetX - event.pageX) / 2);
    const offsetX = this.shiftnext - (this.dragObject.offsetX - event.pageX);
    const offsetChild = this.shiftChildNext + ((this.dragObject.offsetX - event.pageX) / 2);
    if (this.flagBtnStart) {
      if (this.moovX > 0) {
        this.dragSlideShangeParams(-offsetCurrnt, offsetX, offsetChild, offPrev, offPrevCh, true);
      } else {
        this.dragSlideShangeParams(-offsetCurrnt, offsetX, offsetChild, offPrev, offPrevCh, false);
      }
    }
    this.moobTo = this.moovX;
    this.flagnewSlideMoov = false;
    return false;
  }
  endSlide(): void {
    this.flagBtnStart = false;
    if (this.flagToBack) {
      if (Math.abs(this.moovX) > this.InitPosition / 2) {
        this.setCurentStyle(this.currentSlide, 1, 1, '1s', this.InitPosition / 2, -this.InitPosition);
        this.setCurentStyle(this.nextSlideImg, 3, 1, '1s', 0, 0);
        this.setCurentStyle(this.prevSlideImg, 1, 1, '0s', -this.InitPosition / 2, this.InitPosition);
        setTimeout(() => {
          this.changeNumberSlideTo();
          this.setCurentStyle(this.nextSlideImg, 0, 1, '0s', -this.InitPosition / 2, this.InitPosition);
          this.flagBtnStart = true;
        });
      } else {
        this.setCurentStyle(this.currentSlide, 2, 1, '1s', 0, 0);
        this.setCurentStyle(this.nextSlideImg, 3, 1, '1s', -this.InitPosition / 2, this.InitPosition);
        this.setCurentStyle(this.prevSlideImg, 1, 1, '0s', this.InitPosition / 2, -this.InitPosition);
        this.flagBtnStart = true;
      }
    } else {
      if (Math.abs(this.moovX) > this.InitPosition / 2) {
        this.setCurentStyle(this.currentSlide, 1, 1, '1s', -this.InitPosition / 2, this.InitPosition);
        this.setCurentStyle(this.prevSlideImg, 3, 1, '1s', 0, 0);
        this.setCurentStyle(this.nextSlideImg, 1, 1, '0s', this.InitPosition / 2, -this.InitPosition);
        setTimeout(() => {
          this.changeNumberSlideBack();
          this.setCurentStyle(this.prevSlideImg, 0, 1, '0s', -this.InitPosition / 2, this.InitPosition);
          this.flagBtnStart = true;
        });
      } else {
        this.setCurentStyle(this.currentSlide, 2, 1, '1s', 0, 0);
        this.setCurentStyle(this.nextSlideImg, 1, 1, '0s', -this.InitPosition / 2, this.InitPosition);
        this.setCurentStyle(this.prevSlideImg, 3, 1, '1s', this.InitPosition / 2, -this.InitPosition);
        this.flagBtnStart = true;
      }
    }
    this.flagMoov = false;
    document.onmousemove = null;
    document.onmouseup = null;
  }
  leaveMouse(): boolean {
    // this.endSlide();
    this.flagMoov = false;
    this.moobTo = 0;
    this.moovX = 0;
    return false;
  }

  dragSlideShangeParams(offsetCurrnt, offsetX, offsetChild, offPrev, offPrevCh, flagDoTO?: boolean) {
    (this.images[this.currentSlide] as any).style.transition = '0s';
    (this.images[this.currentSlide] as any).style.transform = 'translate3d(' + (0) + 'px,' + 0 + 'px,' + 0 + 'px' + ')';
    (this.DivWrapper[this.currentSlide] as any).style.zIndex = '0';
    (this.DivWrapper[this.currentSlide] as any).style.transition = '0s';
    (this.DivWrapper[this.currentSlide] as any).style.transform = 'translate3d(' + (offsetCurrnt) + 'px,' + 0 + 'px,' + 0 + 'px' + ')';
    (this.images[this.nextSlideImg] as any).style.transition = '0s';
    (this.images[this.nextSlideImg] as any).style.transform = 'translate3d(' + (offsetChild) + 'px,' + 0 + 'px,' + 0 + 'px' + ')';
    (this.DivWrapper[this.nextSlideImg] as any).style.transition = '0s';
    (this.DivWrapper[this.nextSlideImg] as any).style.zIndex = '3';
    (this.DivWrapper[this.nextSlideImg] as any).style.transform = 'translate3d(' + (offsetX) + 'px,' + 0 + 'px,' + 0 + 'px' + ')';
    (this.images[this.prevSlideImg] as any).style.transition = '0s';
    (this.images[this.prevSlideImg] as any).style.transform = 'translate3d(' + (offPrevCh) + 'px,' + 0 + 'px,' + 0 + 'px' + ')';
    (this.DivWrapper[this.prevSlideImg] as any).style.transition = '0s';
    (this.DivWrapper[this.prevSlideImg] as any).style.zIndex = '1';
    (this.DivWrapper[this.prevSlideImg] as any).style.transform = 'translate3d(' + (offPrev) + 'px,' + 0 + 'px,' + 0 + 'px' + ')';
  }
  moovEndSetParamNext(): void {
    this.setCurentStyle(this.currentSlide, 2, 1, '1s', this.InitPosition / 2, -this.InitPosition);
    this.setCurentStyle(this.nextSlideImg, 3, 1, '1s', 0, 0);
  }
  moovEndSetParamPrev(): void {
    this.setCurentStyle(this.currentSlide, 2, 1, '1s', -this.InitPosition / 2, this.InitPosition);
    this.setCurentStyle(this.prevSlideImg, 3, 1, '1s', 0, 0);
  }
  setGrettingDivStyle(Translate: string): void {
    this.dretting.style.opacity = Translate;
  }
  setCurentStyle(index, zIndex: number, opacity: number, tr: string, imgTranslate: number, divTranslate: number) {
    (this.images[index] as any).style.transition = tr;
    (this.images[index] as any).style.zIndex = zIndex;
    (this.images[index] as any).style.opacity = opacity;
    (this.images[index] as any).style.transform = 'translate3d(' + (imgTranslate) + 'px,' + 0 + 'px,' + 0 + 'px' + ')';
    (this.DivWrapper[index] as any).style.transition = tr;
    (this.DivWrapper[index] as any).style.transform = 'translate3d(' + (divTranslate) + 'px,' + 0 + 'px,' + 0 + 'px' + ')';
    (this.DivWrapper[index] as any).style.zIndex = zIndex;
  }
  resetStyle(index, zIndex, opacity, tr) {
    (this.images[index] as any).style.transition = tr;
    (this.images[index] as any).style.zIndex = zIndex;
    (this.images[index] as any).style.opacity = opacity;
    (this.DivWrapper[index] as any).style.transition = tr;
    (this.DivWrapper[index] as any).style.zIndex = zIndex;
  }

  getPosotionsElements(element: Element): number {
    return element.getBoundingClientRect().width - 10;
    //return element.getBoundingClientRect().width;
  }

  ngAfterViewInit(): void {
    this.currentSlide = 1;
    this.nextSlideImg = 2;
    this.prevSlideImg = 0;
    this.images = this.sliderSection.nativeElement.querySelectorAll('.slider_link');
    this.DivWrapper = this.sliderSection.nativeElement.querySelectorAll('.slider-div');
    this.dretting = this.sliderSection.nativeElement.querySelector('#gretting');
    this.navBtn = this.sliderSection.nativeElement.querySelectorAll('.nav-slide');
    this.InitPosition = this.getPosotionsElements(this.sliderSection.nativeElement);
    this.initSliders();
    this.transotionendV();
  }


  ngOnInit() {
    this.flagMoov = false;
    this.flagBtnStart = true;
    this.moovX = 0;
    window.ondragstart = () => false;
  }
  upsliders() {
    for (let i = 0; i <= this.countSliders; i += 1) {
      if (i !== this.currentSlide) {
        this.resetStyle(i, 1, 0, '0s');
      }
    }
    // this.resetStyle(this.currentSlide, 3, 1, '1s');
  }
  initSliders() {
    this.countSliders = this.DivWrapper.length - 1;
    if (this.countSliders > 2) {
      for (let i = 0; i <= this.countSliders; i += 1) {
        if (i === 0) {
          this.setCurentStyle(i, 1, 1, '0s', this.InitPosition / 2, -this.InitPosition);
        } else if (i === 1) {
          this.setCurentStyle(i, 3, 1, '0s', 0, 0);
        } else if (i === 2) {
          this.setCurentStyle(i, 1, 1, '0s', -this.InitPosition / 2, this.InitPosition);
        } else {
          this.setCurentStyle(i, 0, 0, '0s', 0, 0);
        }
      }
    } else {
      this.setCurentStyle(0, 3, 1, '0s', 0, 0);
      this.setCurentStyle(1, 1, 1, '0s', -this.InitPosition / 2, this.InitPosition);
    }
  }
}
