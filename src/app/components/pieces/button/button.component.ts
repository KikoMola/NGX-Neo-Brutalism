import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../services/theme.service';
import { ComponentPreviewComponent } from '../../component-preview/component-preview.component';
import { CodeSnippetPreviewComponent } from '../../code-snippet-preview/code-snippet-preview.component';
import { BasicComponent } from './primary/basic/basic.component';
import { WithIconComponent } from './primary/with-icon/with-icon.component';
import { DisabledComponent } from './primary/disabled/disabled.component';
import { SecondaryBasicComponent } from './secondary/basic/basic.component';
import { SecondaryWithIconComponent } from './secondary/with-icon/with-icon.component';
import { SecondaryDisabledComponent } from './secondary/disabled/disabled.component';
@Component({
  selector: 'app-button',
  standalone: true,
  imports: [
    CommonModule,
    ComponentPreviewComponent,
    CodeSnippetPreviewComponent,
    BasicComponent,
    WithIconComponent,
    DisabledComponent,
    SecondaryBasicComponent,
    SecondaryWithIconComponent,
    SecondaryDisabledComponent
  ],
  templateUrl: './button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  // Estado para controlar la pestaña activa del primer ejemplo
  smallButtonActiveTab: 'preview' | 'code' = 'preview';
  autoWidthButtonActiveTab: 'preview' | 'code' = 'preview'; // Renombrado para claridad
  largeButtonActiveTab: 'preview' | 'code' = 'preview';
  fullWidthButtonActiveTab: 'preview' | 'code' = 'preview';
  fixedWidthButtonActiveTab: 'preview' | 'code' = 'preview';

  constructor(public themeService: ThemeService) {}

  // Helper para escapar HTML
  private escapeHtml(unsafe: string): string {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }  

  get smallButtonExampleCode(): string {
    const borderRadiusClass = this.themeService.getBorderRadiusClass();
    const shadowStyle = this.themeService.getShadowClassForElements();
    const primaryBgClass = this.themeService.getPrimaryBgClass();
    const hoverXClass = this.themeService.getHoverTranslateXClass();
    const hoverYClass = this.themeService.getHoverTranslateYClass();
    const rawHtml = `
<div class="relative inline-block">
  <div class="absolute inset-0 ${borderRadiusClass}" style="box-shadow: ${shadowStyle};"></div>
  <button class="relative flex px-2 py-1 text-sm border-neo-border border-black font-medium transition-transform text-white ${primaryBgClass} ${borderRadiusClass} ${hoverXClass} ${hoverYClass}">
    Pequeño
  </button>
</div>`;
    return this.escapeHtml(rawHtml.trim());
  }

  get autoWidthButtonExampleCode(): string {
    // Identical to primaryButtonExampleCode, just change the text
    const borderRadiusClass = this.themeService.getBorderRadiusClass();
    const shadowStyle = this.themeService.getShadowClassForElements();
    const primaryBgClass = this.themeService.getPrimaryBgClass();
    const hoverXClass = this.themeService.getHoverTranslateXClass();
    const hoverYClass = this.themeService.getHoverTranslateYClass();
    const rawHtml = `
<div class="relative inline-block">
  <div class="absolute inset-0 ${borderRadiusClass}" style="box-shadow: ${shadowStyle};"></div>
  <button class="relative flex px-4 py-2 border-neo-border border-black font-medium transition-transform text-white ${primaryBgClass} ${borderRadiusClass} ${hoverXClass} ${hoverYClass}">
    Ancho Automático
  </button>
</div>`;
    return this.escapeHtml(rawHtml.trim());
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

  get fullWidthButtonExampleCode(): string {
    const borderRadiusClass = this.themeService.getBorderRadiusClass();
    const shadowStyle = this.themeService.getShadowClassForElements();
    const primaryBgClass = this.themeService.getPrimaryBgClass();
    const hoverXClass = this.themeService.getHoverTranslateXClass();
    const hoverYClass = this.themeService.getHoverTranslateYClass();
    const rawHtml = `
<div class="relative w-full"> <!-- w-full needed for container -->
  <div class="absolute inset-0 ${borderRadiusClass}" style="box-shadow: ${shadowStyle};"></div>
  <button class="relative w-full justify-center flex px-4 py-2 border-neo-border border-black font-medium transition-transform text-white ${primaryBgClass} ${borderRadiusClass} ${hoverXClass} ${hoverYClass}">
    Ancho Completo
  </button>
</div>`;
    return this.escapeHtml(rawHtml.trim());
  }

  get fixedWidthButtonExampleCode(): string {
    const borderRadiusClass = this.themeService.getBorderRadiusClass();
    const shadowStyle = this.themeService.getShadowClassForElements();
    const primaryBgClass = this.themeService.getPrimaryBgClass();
    const hoverXClass = this.themeService.getHoverTranslateXClass();
    const hoverYClass = this.themeService.getHoverTranslateYClass();
    const rawHtml = `
<div class="relative inline-block">
  <div class="absolute inset-0 ${borderRadiusClass}" style="box-shadow: ${shadowStyle};"></div>
  <button class="relative w-48 justify-center flex px-4 py-2 border-neo-border border-black font-medium transition-transform text-white ${primaryBgClass} ${borderRadiusClass} ${hoverXClass} ${hoverYClass}">
    Ancho Fijo (w-48)
  </button>
</div>`;
    return this.escapeHtml(rawHtml.trim());
  }

  // Método para cambiar la pestaña activa

  setSmallButtonTab(tab: 'preview' | 'code'): void {
    this.smallButtonActiveTab = tab;
  }

  setAutoWidthButtonTab(tab: 'preview' | 'code'): void {
    this.autoWidthButtonActiveTab = tab;
  }

  setLargeButtonTab(tab: 'preview' | 'code'): void {
    this.largeButtonActiveTab = tab;
  }

  setFullWidthButtonTab(tab: 'preview' | 'code'): void {
    this.fullWidthButtonActiveTab = tab;
  }

  setFixedWidthButtonTab(tab: 'preview' | 'code'): void {
    this.fixedWidthButtonActiveTab = tab;
  }
}
