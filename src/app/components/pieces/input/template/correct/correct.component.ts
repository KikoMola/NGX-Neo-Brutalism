import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-correct',
  imports: [],
  templateUrl: './correct.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CorrectComponent implements OnInit {

  ngOnInit(): void { }

}
