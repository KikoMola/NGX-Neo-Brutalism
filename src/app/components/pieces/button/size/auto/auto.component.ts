import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-auto',
  imports: [],
  templateUrl: './auto.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutoComponent implements OnInit {

  ngOnInit(): void { }

}
