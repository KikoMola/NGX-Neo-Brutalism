import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../../../services/theme.service';
import { ComponentPreviewComponent } from '../../../../component-preview/component-preview.component';
import { CodeSnippetPreviewComponent } from '../../../../code-snippet-preview/code-snippet-preview.component';

@Component({
  selector: 'app-big',
  standalone: true,
  imports: [
    CommonModule,
    ComponentPreviewComponent,
    CodeSnippetPreviewComponent,
  ],
  templateUrl: './big.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BigComponent {
  public themeService = inject(ThemeService);
  largeButtonActiveTab: 'preview' | 'code' = 'preview';

  private escapeHtml(unsafe: string): string {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  get largeButtonExampleCode(): string {
    const borderRadiusClass = this.themeService.getBorderRadiusClass();
    const shadowStyle = this.themeService.getShadowClassForElements();
    const primaryBgClass = this.themeService.getPrimaryBgClass();
    const hoverXClass = this.themeService.getHoverTranslateXClass();
    const hoverYClass = this.themeService.getHoverTranslateYClass();
    const rawHtml = `
<div class="relative inline-block">
  <div class="absolute inset-0 ${borderRadiusClass}" style="box-shadow: ${shadowStyle};"></div>
  <button class="relative flex px-6 py-3 text-lg border-neo-border border-black font-medium transition-transform text-white ${primaryBgClass} ${borderRadiusClass} ${hoverXClass} ${hoverYClass}">
    Grande
  </button>
</div>`;
    return this.escapeHtml(rawHtml.trim());
  }

  setLargeButtonTab(tab: 'preview' | 'code'): void {
    this.largeButtonActiveTab = tab;
  }
}
