import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-column-selection',
  imports: [],
  templateUrl: './column-selection.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnSelectionComponent implements OnInit {

  ngOnInit(): void { }

}
