import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-secondary-with-icon',
  imports: [],
  templateUrl: './with-icon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SecondaryWithIconComponent implements OnInit {

  ngOnInit(): void { }

}
