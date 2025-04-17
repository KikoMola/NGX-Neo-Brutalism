import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-accordion',
  imports: [],
  templateUrl: './accordion.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionComponent implements OnInit {

  ngOnInit(): void { }

}
