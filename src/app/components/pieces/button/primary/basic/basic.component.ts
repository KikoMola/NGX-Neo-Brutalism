import { ChangeDetectionStrategy, Component, inject,  type OnInit } from '@angular/core';
import { ThemeService } from '../../../../../services/theme.service';
import { CommonModule } from '@angular/common';
import { ComponentPreviewComponent } from '../../../../component-preview/component-preview.component';
import { CodeSnippetPreviewComponent } from '../../../../code-snippet-preview/code-snippet-preview.component';

@Component({
  selector: 'app-basic',
  imports: [CommonModule, ComponentPreviewComponent, CodeSnippetPreviewComponent],
  templateUrl: './basic.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicComponent {
  public themeService = inject(ThemeService);
  // Estado para controlar la pestaña activa del primer ejemplo
  primaryButtonActiveTab: 'preview' | 'code' = 'preview';

  // Método para cambiar la pestaña activa
  setPrimaryButtonTab(tab: 'preview' | 'code'): void {
    this.primaryButtonActiveTab = tab;
  }

  // Helper para escapar HTML
  private escapeHtml(unsafe: string): string {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Getter para generar el código del botón primario dinámicamente
  get primaryButtonExampleCode(): string {
    const borderRadiusClass = this.themeService.getBorderRadiusClass();
    const shadowStyle = this.themeService.getShadowClassForElements();
    const primaryBgClass = this.themeService.getPrimaryBgClass();
    const hoverXClass = this.themeService.getHoverTranslateXClass();
    const hoverYClass = this.themeService.getHoverTranslateYClass();

    const rawHtml = `
<div class="relative inline-block">
  <div class="absolute inset-0 ${borderRadiusClass}" style="box-shadow: ${shadowStyle};"></div>
  <button class="relative flex px-4 py-2 border-neo-border border-black font-medium transition-transform text-white ${primaryBgClass} ${borderRadiusClass} ${hoverXClass} ${hoverYClass}">
    Botón Primario
  </button>
</div>`;

    return this.escapeHtml(rawHtml.trim());
  }

}
