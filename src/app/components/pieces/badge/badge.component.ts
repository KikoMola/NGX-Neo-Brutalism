import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-badge',
  imports: [],
  templateUrl: './badge.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeComponent implements OnInit {

  ngOnInit(): void { }

}
