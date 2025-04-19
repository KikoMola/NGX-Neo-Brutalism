import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Needed for ngModel
import {
  ChangeDetectionStrategy,
  Component,
  type OnInit,
  inject,
} from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { ComponentPreviewComponent } from '../../component-preview/component-preview.component';
import { CodeSnippetPreviewComponent } from '../../code-snippet-preview/code-snippet-preview.component';
import { BasicComponent } from './template/basic/basic.component';
import { CorrectComponent } from './template/correct/correct.component';
import { IncorrectComponent } from './template/incorrect/incorrect.component';
import { FullWidthComponent } from '../button/size/full-width/full-width.component';
import { FullSizeComponent } from './template/full-size/full-size.component';

@Component({
  selector: 'app-input',
  standalone: true, // Mark as standalone
  imports: [
    CommonModule,
    FormsModule, // Import FormsModule
    BasicComponent,
    CorrectComponent,
    IncorrectComponent,
    FullSizeComponent,
  ],
  templateUrl: './input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements OnInit {
  ngOnInit(): void {}
}
