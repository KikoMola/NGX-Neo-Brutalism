import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-pieces',
  imports: [],
  templateUrl: './pieces.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PiecesComponent implements OnInit {

  ngOnInit(): void { }

}
