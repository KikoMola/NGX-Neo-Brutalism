import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-disabled',
  imports: [],
  templateUrl: './disabled.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledComponent implements OnInit {

  ngOnInit(): void { }

}
