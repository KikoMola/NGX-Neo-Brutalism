import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-striped',
  imports: [],
  templateUrl: './striped.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StripedComponent implements OnInit {

  ngOnInit(): void { }

}
