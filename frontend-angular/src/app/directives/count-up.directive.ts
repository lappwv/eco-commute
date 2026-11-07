import { Directive, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges, inject } from '@angular/core';

@Directive({
  selector: '[appCountUp]',
  standalone: true,
})
export class CountUpDirective implements OnChanges, OnDestroy {
  @Input('appCountUp') value: number | null | undefined = 0;
  @Input() decimals = 0;
  @Input() duration = 1100;

  private readonly el: ElementRef<HTMLElement> = inject(ElementRef);
  private frame = 0;
  private current = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['value']) return;

    cancelAnimationFrame(this.frame);
    const target = Number(this.value) || 0;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      this.render(target);
      return;
    }

    const from = this.current;
    const start = performance.now();

    const step = (now: number): void => {
      const t = Math.min((now - start) / this.duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      this.render(from + (target - from) * eased);
      if (t < 1) {
        this.frame = requestAnimationFrame(step);
      }
    };

    this.frame = requestAnimationFrame(step);
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.frame);
  }

  private render(n: number): void {
    this.current = n;
    this.el.nativeElement.textContent = n.toLocaleString('en-US', {
      minimumFractionDigits: this.decimals,
      maximumFractionDigits: this.decimals,
    });
  }
}
