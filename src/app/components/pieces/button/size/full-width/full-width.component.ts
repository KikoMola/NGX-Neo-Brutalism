import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../../../services/theme.service';
import { ComponentPreviewComponent } from '../../../../component-preview/component-preview.component';
import { CodeSnippetPreviewComponent } from '../../../../code-snippet-preview/code-snippet-preview.component';

@Component({
  selector: 'app-full-width',
  standalone: true,
  imports: [
    CommonModule,
    ComponentPreviewComponent,
    CodeSnippetPreviewComponent,
  ],
  templateUrl: './full-width.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullWidthComponent {
  public themeService = inject(ThemeService);
  fullWidthButtonActiveTab: 'preview' | 'code' = 'preview';

  private escapeHtml(unsafe: string): string {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  get fullWidthButtonExampleCode(): string {
    const borderRadiusClass = this.themeService.getBorderRadiusClass();
    const shadowStyle = this.themeService.getShadowClassForElements();
    const primaryBgClass = this.themeService.getPrimaryBgClass();
    const hoverXClass = this.themeService.getHoverTranslateXClass();
    const hoverYClass = this.themeService.getHoverTranslateYClass();
    const rawHtml = `
<div class="relative w-full">
  <div class="absolute inset-0 ${borderRadiusClass}" style="box-shadow: ${shadowStyle};"></div>
  <button class="relative w-full justify-center flex px-4 py-2 border-neo-border border-black font-medium transition-transform text-white ${primaryBgClass} ${borderRadiusClass} ${hoverXClass} ${hoverYClass}">
    Ancho Completo
  </button>
</div>`;
    return this.escapeHtml(rawHtml.trim());
  }

  setFullWidthButtonTab(tab: 'preview' | 'code'): void {
    this.fullWidthButtonActiveTab = tab;
  }
}
