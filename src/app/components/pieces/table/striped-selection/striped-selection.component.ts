import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-striped-selection',
  imports: [],
  templateUrl: './striped-selection.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StripedSelectionComponent implements OnInit {

  ngOnInit(): void { }

}
