import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-image-card',
  imports: [],
  templateUrl: './image-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageCardComponent implements OnInit {

  ngOnInit(): void { }

}
