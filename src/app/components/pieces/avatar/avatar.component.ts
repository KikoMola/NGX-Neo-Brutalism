import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-avatar',
  imports: [],
  templateUrl: './avatar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent implements OnInit {

  ngOnInit(): void { }

}
