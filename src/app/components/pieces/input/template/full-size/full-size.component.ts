import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-full-size',
  imports: [],
  templateUrl: './full-size.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullSizeComponent implements OnInit {

  ngOnInit(): void { }

}
