import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-component-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './component-preview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentPreviewComponent {
  public themeService = inject(ThemeService);
}
