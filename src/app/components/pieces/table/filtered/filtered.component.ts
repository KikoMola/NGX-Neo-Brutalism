import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-filtered',
  imports: [],
  templateUrl: './filtered.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilteredComponent implements OnInit {

  ngOnInit(): void { }

}
