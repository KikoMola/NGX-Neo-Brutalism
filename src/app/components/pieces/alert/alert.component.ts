import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  imports: [],
  templateUrl: './alert.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent implements OnInit {

  ngOnInit(): void { }

}
