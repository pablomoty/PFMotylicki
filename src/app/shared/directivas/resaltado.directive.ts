import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
  


@Directive({

  selector: '[appResaltado]',
})

export class ResaltadoDirective implements OnChanges {

  @Input()
  appResaltado = 'yellow';

  constructor(private elementRef: ElementRef, private renderer2: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {

    this.colorFondo();
  }

  colorFondo(): void {
    
    this.renderer2.setStyle(
      this.elementRef.nativeElement,
      'background-color',
      this.appResaltado
    );
    
  }
}
