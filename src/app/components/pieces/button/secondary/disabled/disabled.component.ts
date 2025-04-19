import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-secondary-disabled',
  imports: [],
  templateUrl: './disabled.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SecondaryDisabledComponent implements OnInit {

  ngOnInit(): void { }

}
