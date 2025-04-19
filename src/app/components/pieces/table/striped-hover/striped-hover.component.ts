import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-striped-hover',
  imports: [],
  templateUrl: './striped-hover.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StripedHoverComponent implements OnInit {

  ngOnInit(): void { }

}
