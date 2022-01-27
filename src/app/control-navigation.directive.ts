import { Directive, ElementRef, OnDestroy, Optional } from '@angular/core';

@Directive({
  selector: '[tabindex],[[tabindex]]',
})
export class ControlNavigationDirective implements OnDestroy {
  constructor(
    public outerElementRef: ElementRef // , @Optional() public control: NgControl
  ) {
    console.log(
      'Directive for ',
      outerElementRef.nativeElement.getAttribute('tabindex'),
      outerElementRef.nativeElement
    );
  }

  ngOnDestroy(): void {
    // console.log('Directive removed ');
  }
}
