import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-full-width',
  imports: [],
  templateUrl: './full-width.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullWidthComponent implements OnInit {

  ngOnInit(): void { }

}
