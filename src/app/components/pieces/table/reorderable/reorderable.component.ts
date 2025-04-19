import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-reorderable',
  imports: [],
  templateUrl: './reorderable.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReorderableComponent implements OnInit {

  ngOnInit(): void { }

}
