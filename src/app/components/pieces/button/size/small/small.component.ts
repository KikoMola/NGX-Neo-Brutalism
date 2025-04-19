import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-small',
  imports: [],
  templateUrl: './small.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmallComponent implements OnInit {

  ngOnInit(): void { }

}
