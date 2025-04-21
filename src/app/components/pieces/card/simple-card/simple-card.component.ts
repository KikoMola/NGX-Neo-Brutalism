import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-simple-card',
  imports: [],
  templateUrl: './simple-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleCardComponent implements OnInit {

  ngOnInit(): void { }

}
