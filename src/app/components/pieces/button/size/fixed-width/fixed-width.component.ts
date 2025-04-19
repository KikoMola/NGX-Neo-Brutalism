import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-fixed-width',
  imports: [],
  templateUrl: './fixed-width.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FixedWidthComponent implements OnInit {

  ngOnInit(): void { }

}
