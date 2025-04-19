import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-incorrect',
  imports: [],
  templateUrl: './incorrect.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncorrectComponent implements OnInit {

  ngOnInit(): void { }

}
