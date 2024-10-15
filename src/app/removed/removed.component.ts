/**
 * Swiper Part
 */
import { SwiperContainer } from 'swiper/element/bundle';
import {
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  Input,
  effect} from '@angular/core';
@Component({
  selector: 'app-removed',
  standalone: true,
  imports: [],
  templateUrl: './removed.component.html',
  styleUrl: './removed.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RemovedComponent {
  @Input() swiperContainerId = '';
  index = 0;
  slidePerView = 1;
  @ContentChild('swiper') swiperRef!: ElementRef<SwiperContainer>;
  initialized = false;
  ngAfterViewInit(): void {
    setTimeout(() => {
      const shadowRoot = document
        .getElementById(this.swiperContainerId)
        ?.getElementsByClassName('swiper')[0]?.shadowRoot
        ?.firstChild as HTMLElement;
      shadowRoot.style.paddingBottom = '35px';
    }, 300);
  }

  changeSlide(prevOrNext: number): void {
    if (prevOrNext === -1) {
      this.swiperRef.nativeElement.swiper.slidePrev();
    } else {
      this.swiperRef.nativeElement.swiper.slideNext();
    }
  }
}
