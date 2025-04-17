import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../services/theme.service';
import { ComponentPreviewComponent } from '../../component-preview/component-preview.component';
import { CodeSnippetPreviewComponent } from '../../code-snippet-preview/code-snippet-preview.component';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, ComponentPreviewComponent, CodeSnippetPreviewComponent],
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

  // Código de ejemplo para cada botón (ya escapado)
  primaryButtonExample = `&lt;button 
  [ngClass]="[themeService.getPrimaryBgClass(), themeService.getBorderRadiusClass(), themeService.getHoverTranslateXClass(), themeService.getHoverTranslateYClass()]"
  [ngStyle]="&#123;'box-shadow': themeService.getShadowClassForElements()&#125;" 
  class="relative px-4 py-2 border-neo-border border-black font-medium transition-transform text-white"&gt;
  Botón Primario
&lt;/button&gt;`;

  primaryIconExample = `&lt;button 
  [ngClass]="[themeService.getPrimaryBgClass(), themeService.getBorderRadiusClass(), themeService.getHoverTranslateXClass(), themeService.getHoverTranslateYClass()]"
  [ngStyle]="&#123;'box-shadow': themeService.getShadowClassForElements()&#125;" 
  class="relative px-4 py-2 border-neo-border border-black font-medium transition-transform text-white flex items-center"&gt;
  &lt;svg&gt;...&lt;/svg&gt;
  Con Icono
&lt;/button&gt;`;

  primaryDisabledExample = `&lt;button 
  [ngClass]="[themeService.getPrimaryBgClass(), themeService.getBorderRadiusClass()]" 
  [ngStyle]="&#123;'box-shadow': themeService.getShadowClassForElements()&#125;" 
  disabled 
  class="relative px-4 py-2 border-neo-border border-black font-medium text-white opacity-50 cursor-not-allowed"&gt;
  Deshabilitado
&lt;/button&gt;`; // Nota: No aplicamos hover a deshabilitados

  secondaryButtonExample = `&lt;button 
  [ngClass]="[themeService.getBorderRadiusClass(), themeService.getHoverTranslateXClass(), themeService.getHoverTranslateYClass()]"
  [ngStyle]="&#123;'box-shadow': themeService.getShadowClassForElements()&#125;" 
  class="relative px-4 py-2 bg-white border-neo-border border-black font-medium transition-transform"&gt;
  Botón Secundario
&lt;/button&gt;`;

  secondaryIconExample = `&lt;button 
  [ngClass]="[themeService.getBorderRadiusClass(), themeService.getHoverTranslateXClass(), themeService.getHoverTranslateYClass()]"
  [ngStyle]="&#123;'box-shadow': themeService.getShadowClassForElements()&#125;" 
  class="relative px-4 py-2 bg-white border-neo-border border-black font-medium transition-transform flex items-center"&gt;
  &lt;svg&gt;...&lt;/svg&gt;
  Cancelar
&lt;/button&gt;`;
  
  secondaryDisabledExample = `&lt;button 
  [ngClass]="themeService.getBorderRadiusClass()" 
  [ngStyle]="&#123;'box-shadow': themeService.getShadowClassForElements()&#125;" 
  disabled 
  class="relative px-4 py-2 bg-white border-neo-border border-black font-medium opacity-50 cursor-not-allowed"&gt;
  Deshabilitado
&lt;/button&gt;`; // Nota: No aplicamos hover a deshabilitados

  smallButtonExample = `&lt;button 
  [ngClass]="[themeService.getPrimaryBgClass(), themeService.getBorderRadiusClass(), themeService.getHoverTranslateXClass(), themeService.getHoverTranslateYClass()]"
  [ngStyle]="&#123;'box-shadow': themeService.getShadowClassForElements()&#125;" 
  class="relative px-2 py-1 text-sm border-neo-border border-black font-medium transition-transform text-white"&gt;
  Pequeño
&lt;/button&gt;`;

  // Botón normal (ya definido como primaryButtonExample, lo reutilizaremos o ajustaremos si es necesario)
  // largeButtonExample similar a small pero con clases px-6 py-3 text-lg
  largeButtonExample = `&lt;button 
  [ngClass]="[themeService.getPrimaryBgClass(), themeService.getBorderRadiusClass(), themeService.getHoverTranslateXClass(), themeService.getHoverTranslateYClass()]"
  [ngStyle]="&#123;'box-shadow': themeService.getShadowClassForElements()&#125;" 
  class="relative px-6 py-3 text-lg border-neo-border border-black font-medium transition-transform text-white"&gt;
  Grande
&lt;/button&gt;`;

  // --- Nuevos códigos de ejemplo para anchos --- 

  // Reutilizamos primaryButtonExample para "Ancho Automático", ya que no lleva clase de ancho explícita.

  fullWidthButtonExample = `&lt;button 
  [ngClass]="[themeService.getPrimaryBgClass(), themeService.getBorderRadiusClass(), themeService.getHoverTranslateXClass(), themeService.getHoverTranslateYClass()]"
  [ngStyle]="&#123;'box-shadow': themeService.getShadowClassForElements()&#125;" 
  class="relative w-full justify-center flex px-4 py-2 border-neo-border border-black font-medium transition-transform text-white"&gt;
  Ancho Completo
&lt;/button&gt;`; // Añadimos w-full, justify-center, flex

  fixedWidthButtonExample = `&lt;button 
  [ngClass]="[themeService.getPrimaryBgClass(), themeService.getBorderRadiusClass(), themeService.getHoverTranslateXClass(), themeService.getHoverTranslateYClass()]"
  [ngStyle]="&#123;'box-shadow': themeService.getShadowClassForElements()&#125;" 
  class="relative w-48 justify-center flex px-4 py-2 border-neo-border border-black font-medium transition-transform text-white"&gt;
  Ancho Fijo (w-48)
&lt;/button&gt;`; // Añadimos w-48, justify-center, flex

  constructor(public themeService: ThemeService) {}

  ngOnInit(): void { }

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
