import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-full',
  imports: [],
  templateUrl: './full.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullComponent implements OnInit {

  ngOnInit(): void { }

}
