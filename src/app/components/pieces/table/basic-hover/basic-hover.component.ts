import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-basic-hover',
  imports: [],
  templateUrl: './basic-hover.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicHoverComponent implements OnInit {

  ngOnInit(): void { }

}
