import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-big',
  imports: [],
  templateUrl: './big.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BigComponent implements OnInit {

  ngOnInit(): void { }

}
