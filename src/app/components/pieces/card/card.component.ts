import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SimpleCardComponent } from './simple-card/simple-card.component';
import { ImageCardComponent } from './image-card/image-card.component';
import { ButtonsCardComponent } from './buttons-card/buttons-card.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    CommonModule,
    SimpleCardComponent,
    ImageCardComponent,
    ButtonsCardComponent
  ],
  templateUrl: './card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {}
