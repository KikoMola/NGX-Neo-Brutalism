import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-buttons-card',
  imports: [],
  templateUrl: './buttons-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonsCardComponent implements OnInit {

  ngOnInit(): void { }

}
