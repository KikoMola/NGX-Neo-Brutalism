import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-row-options',
  imports: [],
  templateUrl: './row-options.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RowOptionsComponent implements OnInit {

  ngOnInit(): void { }

}
