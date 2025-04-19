import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-with-icon',
  imports: [],
  templateUrl: './with-icon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithIconComponent implements OnInit {

  ngOnInit(): void { }

}
