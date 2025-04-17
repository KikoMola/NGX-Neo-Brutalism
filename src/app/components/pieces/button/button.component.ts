import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements OnInit {

  ngOnInit(): void { }

}
