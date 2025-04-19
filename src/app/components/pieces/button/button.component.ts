import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BasicComponent } from './primary/basic/basic.component';
import { DisabledComponent } from './primary/disabled/disabled.component';
import { WithIconComponent } from './primary/with-icon/with-icon.component';
import { SecondaryBasicComponent } from './secondary/basic/basic.component';
import { SecondaryDisabledComponent } from './secondary/disabled/disabled.component';
import { SecondaryWithIconComponent } from './secondary/with-icon/with-icon.component';
import { AutoComponent } from './size/auto/auto.component';
import { BigComponent } from './size/big/big.component';
import { FixedWidthComponent } from './size/fixed-width/fixed-width.component';
import { FullWidthComponent } from './size/full-width/full-width.component';
import { SmallComponent } from './size/small/small.component';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [
    CommonModule,
    BasicComponent,
    WithIconComponent,
    DisabledComponent,
    SecondaryBasicComponent,
    SecondaryWithIconComponent,
    SecondaryDisabledComponent,
    SmallComponent,
    AutoComponent,
    BigComponent,
    FullWidthComponent,
    FixedWidthComponent,
  ],
  templateUrl: './button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {}
