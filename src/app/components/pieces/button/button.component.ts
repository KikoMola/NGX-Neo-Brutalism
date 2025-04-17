import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../services/theme.service';
import { ComponentPreviewComponent } from '../../component-preview/component-preview.component';
import { CodeSnippetPreviewComponent } from '../../code-snippet-preview/code-snippet-preview.component';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [
    CommonModule,
    ComponentPreviewComponent,
    CodeSnippetPreviewComponent,
  ],
  templateUrl: './button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements OnInit {
  // Estado para controlar la pestaña activa del primer ejemplo
  primaryButtonActiveTab: 'preview' | 'code' = 'preview';
  primaryIconActiveTab: 'preview' | 'code' = 'preview';
  primaryDisabledActiveTab: 'preview' | 'code' = 'preview';
  secondaryButtonActiveTab: 'preview' | 'code' = 'preview';
  secondaryIconActiveTab: 'preview' | 'code' = 'preview';
  secondaryDisabledActiveTab: 'preview' | 'code' = 'preview';
  smallButtonActiveTab: 'preview' | 'code' = 'preview';
  autoWidthButtonActiveTab: 'preview' | 'code' = 'preview'; // Renombrado para claridad
  largeButtonActiveTab: 'preview' | 'code' = 'preview';
  fullWidthButtonActiveTab: 'preview' | 'code' = 'preview';
  fixedWidthButtonActiveTab: 'preview' | 'code' = 'preview';

  constructor(public themeService: ThemeService) {}

  ngOnInit(): void {}

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

  get primaryIconExampleCode(): string {
    const borderRadiusClass = this.themeService.getBorderRadiusClass();
    const shadowStyle = this.themeService.getShadowClassForElements();
    const primaryBgClass = this.themeService.getPrimaryBgClass();
    const hoverXClass = this.themeService.getHoverTranslateXClass();
    const hoverYClass = this.themeService.getHoverTranslateYClass();
    const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>`;
    const rawHtml = `
<div class="relative inline-block">
  <div class="absolute inset-0 ${borderRadiusClass}" style="box-shadow: ${shadowStyle};"></div>
  <button class="relative flex items-center px-4 py-2 border-neo-border border-black font-medium transition-transform text-white ${primaryBgClass} ${borderRadiusClass} ${hoverXClass} ${hoverYClass}">
    ${svgIcon}
    Con Icono
  </button>
</div>`;
    return this.escapeHtml(rawHtml.trim());
  }

  get primaryDisabledExampleCode(): string {
    const borderRadiusClass = this.themeService.getBorderRadiusClass();
    const shadowStyle = this.themeService.getShadowClassForElements();
    const primaryBgClass = this.themeService.getPrimaryBgClass();
    // No hover classes for disabled
    const rawHtml = `
<div class="relative inline-block">
  <div class="absolute inset-0 ${borderRadiusClass}" style="box-shadow: ${shadowStyle};"></div>
  <button disabled class="relative flex px-4 py-2 border-neo-border border-black font-medium text-white opacity-50 cursor-not-allowed ${primaryBgClass} ${borderRadiusClass}">
    Deshabilitado
  </button>
</div>`;
    return this.escapeHtml(rawHtml.trim());
  }

  get secondaryButtonExampleCode(): string {
    const borderRadiusClass = this.themeService.getBorderRadiusClass();
    const shadowStyle = this.themeService.getShadowClassForElements();
    const hoverXClass = this.themeService.getHoverTranslateXClass();
    const hoverYClass = this.themeService.getHoverTranslateYClass();
    const rawHtml = `
<div class="relative inline-block">
  <div class="absolute inset-0 ${borderRadiusClass}" style="box-shadow: ${shadowStyle};"></div>
  <button class="relative flex px-4 py-2 bg-white border-neo-border border-black font-medium transition-transform ${borderRadiusClass} ${hoverXClass} ${hoverYClass}">
    Botón Secundario
  </button>
</div>`;
    return this.escapeHtml(rawHtml.trim());
  }

  get secondaryIconExampleCode(): string {
    const borderRadiusClass = this.themeService.getBorderRadiusClass();
    const shadowStyle = this.themeService.getShadowClassForElements();
    const hoverXClass = this.themeService.getHoverTranslateXClass();
    const hoverYClass = this.themeService.getHoverTranslateYClass();
    const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
    </svg>`;
    const rawHtml = `
<div class="relative inline-block">
  <div class="absolute inset-0 ${borderRadiusClass}" style="box-shadow: ${shadowStyle};"></div>
  <button class="relative flex items-center px-4 py-2 bg-white border-neo-border border-black font-medium transition-transform ${borderRadiusClass} ${hoverXClass} ${hoverYClass}">
    ${svgIcon}
    Cancelar
  </button>
</div>`;
    return this.escapeHtml(rawHtml.trim());
  }

  get secondaryDisabledExampleCode(): string {
    const borderRadiusClass = this.themeService.getBorderRadiusClass();
    const shadowStyle = this.themeService.getShadowClassForElements();
    // No hover classes for disabled
    const rawHtml = `
<div class="relative inline-block">
  <div class="absolute inset-0 ${borderRadiusClass}" style="box-shadow: ${shadowStyle};"></div>
  <button disabled class="relative flex px-4 py-2 bg-white border-neo-border border-black font-medium opacity-50 cursor-not-allowed ${borderRadiusClass}">
    Deshabilitado
  </button>
</div>`;
    return this.escapeHtml(rawHtml.trim());
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
  setPrimaryButtonTab(tab: 'preview' | 'code'): void {
    this.primaryButtonActiveTab = tab;
  }

  setPrimaryIconTab(tab: 'preview' | 'code'): void {
    this.primaryIconActiveTab = tab;
  }

  setPrimaryDisabledTab(tab: 'preview' | 'code'): void {
    this.primaryDisabledActiveTab = tab;
  }

  setSecondaryButtonTab(tab: 'preview' | 'code'): void {
    this.secondaryButtonActiveTab = tab;
  }

  setSecondaryIconTab(tab: 'preview' | 'code'): void {
    this.secondaryIconActiveTab = tab;
  }

  setSecondaryDisabledTab(tab: 'preview' | 'code'): void {
    this.secondaryDisabledActiveTab = tab;
  }

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
