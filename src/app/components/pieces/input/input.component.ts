import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Needed for ngModel
import { ChangeDetectionStrategy, Component, type OnInit, inject } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { ComponentPreviewComponent } from '../../component-preview/component-preview.component';
import { CodeSnippetPreviewComponent } from '../../code-snippet-preview/code-snippet-preview.component';

@Component({
  selector: 'app-input',
  standalone: true, // Mark as standalone
  imports: [
    CommonModule,
    FormsModule, // Import FormsModule
    ComponentPreviewComponent,
    CodeSnippetPreviewComponent
  ],
  templateUrl: './input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements OnInit {
  public themeService = inject(ThemeService);

  // --- Tab State --- 
  normalInputActiveTab: 'preview' | 'code' = 'preview';
  iconInputActiveTab: 'preview' | 'code' = 'preview';
  correctInputActiveTab: 'preview' | 'code' = 'preview';
  incorrectInputActiveTab: 'preview' | 'code' = 'preview';
  fullWidthInputActiveTab: 'preview' | 'code' = 'preview';

  // --- Input Values for Preview ---
  normalInputValue: string = '';
  iconInputValue: string = '';
  correctInputValue: string = 'Correcto';
  incorrectInputValue: string = 'Incorrecto';
  fullWidthInputValue: string = '';


  ngOnInit(): void { }

  // --- Tab Control Methods ---
  setNormalInputTab(tab: 'preview' | 'code'): void {
    this.normalInputActiveTab = tab;
  }
  setIconInputTab(tab: 'preview' | 'code'): void {
    this.iconInputActiveTab = tab;
  }
  setCorrectInputTab(tab: 'preview' | 'code'): void {
    this.correctInputActiveTab = tab;
  }
  setIncorrectInputTab(tab: 'preview' | 'code'): void {
    this.incorrectInputActiveTab = tab;
  }
  setFullWidthInputTab(tab: 'preview' | 'code'): void {
    this.fullWidthInputActiveTab = tab;
  }

  // --- Code Snippet Getters ---
  private escapeHtml(unsafe: string): string {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  get normalInputExampleCode(): string {
    const borderRadiusClass = this.themeService.getBorderRadiusClass();
    const shadowStyle = this.themeService.getShadowClassForElements();
    const hoverXClass = this.themeService.getHoverTranslateXClass();
    const hoverYClass = this.themeService.getHoverTranslateYClass();

    const rawHtml = `
<div class="relative inline-block">
  <!-- Shadow Layer -->
  <div 
    class="absolute inset-0 ${borderRadiusClass}" 
    [ngStyle]="{'box-shadow': themeService.getShadowClassForElements()}"></div>
  <!-- Input Layer -->
  <input 
    type="text" 
    [(ngModel)]="inputValue" 
    placeholder="Escribe algo..."
    class="relative w-full px-3 py-2 border-neo-border border-black bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-transform ${borderRadiusClass} ${hoverXClass} ${hoverYClass}"
  >
</div>`;
    const tsLogicComment = `
// Component Logic:
// import { FormsModule } from '@angular/forms'; // Required for ngModel
// import { ThemeService } from './path/to/theme.service'; // Import ThemeService
// constructor(public themeService: ThemeService) {}
inputValue: string = '';`;

    return this.escapeHtml(`${tsLogicComment}\n${rawHtml.trim()}`);
  }

  get iconInputExampleCode(): string {
    const borderRadiusClass = this.themeService.getBorderRadiusClass();
    const shadowStyle = this.themeService.getShadowClassForElements();
    const hoverXClass = this.themeService.getHoverTranslateXClass();
    const hoverYClass = this.themeService.getHoverTranslateYClass();
    const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500 pointer-events-none"><path d="M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z"/><path d="m7 16.5-4.74-2.85"/><path d="m7 16.5 5-3"/><path d="M7 16.5v5.17"/><path d="M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z"/><path d="m17 16.5-5-3"/><path d="m17 16.5 4.74-2.85"/><path d="M17 16.5v5.17"/><path d="M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z"/><path d="M12 8 7.26 5.15"/><path d="m12 8 4.74-2.85"/><path d="M12 13.5V8"/></svg>`;

    const rawHtml = `
<div class="relative inline-block">
  <!-- Shadow Layer -->
  <div 
    class="absolute inset-0 ${borderRadiusClass}" 
    [ngStyle]="{'box-shadow': themeService.getShadowClassForElements()}"></div>
  <!-- Input Container -->
  <div class="relative">
    ${iconSvg}
    <input 
      type="text" 
      [(ngModel)]="inputValue" 
      placeholder="Buscar..."
      class="relative w-full pl-10 pr-3 py-2 border-neo-border border-black bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-transform ${borderRadiusClass} ${hoverXClass} ${hoverYClass}"
    >
  </div>
</div>`;
     const tsLogicComment = `
// Component Logic:
// import { FormsModule } from '@angular/forms'; // Required for ngModel
// import { ThemeService } from './path/to/theme.service'; // Import ThemeService
// constructor(public themeService: ThemeService) {}
inputValue: string = '';`;

    return this.escapeHtml(`${tsLogicComment}\n${rawHtml.trim()}`);
  }

  get correctInputExampleCode(): string {
    const borderRadiusClass = this.themeService.getBorderRadiusClass();
    const hoverXClass = this.themeService.getHoverTranslateXClass();
    const hoverYClass = this.themeService.getHoverTranslateYClass();
    // Use green shadow: Modify the shadow generation logic or hardcode for example
    const greenShadow = this.themeService.getShadowClass().replace('rgba(0,0,0,1)', 'rgba(34, 197, 94, 1)'); // Green-500
    const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500 pointer-events-none"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/></svg>`;
    
    const rawHtml = `
<div class="relative inline-block">
  <!-- Green Shadow Layer -->
  <div 
    class="absolute inset-0 ${borderRadiusClass}" 
    style="box-shadow: ${greenShadow};"></div>
  <!-- Input Container -->
  <div class="relative">
    <input 
      type="text" 
      [(ngModel)]="inputValue" 
      class="relative w-full px-3 py-2 border-neo-border border-green-500 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-transform ${borderRadiusClass} ${hoverXClass} ${hoverYClass}" 
      placeholder="Correcto"
    >
     ${iconSvg}
  </div>
</div>`;
     const tsLogicComment = `
// Component Logic:
// import { FormsModule } from '@angular/forms'; // Required for ngModel
// import { ThemeService } from './path/to/theme.service'; // Import ThemeService
// constructor(public themeService: ThemeService) {}
inputValue: string = 'Correcto';`;

    return this.escapeHtml(`${tsLogicComment}\n${rawHtml.trim()}`);
  }
  
  get incorrectInputExampleCode(): string {
    const borderRadiusClass = this.themeService.getBorderRadiusClass();
    const hoverXClass = this.themeService.getHoverTranslateXClass();
    const hoverYClass = this.themeService.getHoverTranslateYClass();
    // Use red shadow: Modify the shadow generation logic or hardcode for example
    const redShadow = this.themeService.getShadowClass().replace('rgba(0,0,0,1)', 'rgba(239, 68, 68, 1)'); // Red-500
    const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-red-500 pointer-events-none"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><line x1="15" x2="9" y1="9" y2="15"/><line x1="9" x2="15" y1="9" y2="15"/></svg>`;
    
    const rawHtml = `
<div class="relative inline-block">
  <!-- Red Shadow Layer -->
  <div 
    class="absolute inset-0 ${borderRadiusClass}" 
    style="box-shadow: ${redShadow};"></div>
  <!-- Input Container -->
  <div class="relative">
    <input 
      type="text" 
      [(ngModel)]="inputValue" 
      class="relative w-full px-3 py-2 border-neo-border border-red-500 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-transform ${borderRadiusClass} ${hoverXClass} ${hoverYClass}"
      placeholder="Incorrecto"
    >
    ${iconSvg}
  </div>
</div>`;
     const tsLogicComment = `
// Component Logic:
// import { FormsModule } from '@angular/forms'; // Required for ngModel
// import { ThemeService } from './path/to/theme.service'; // Import ThemeService
// constructor(public themeService: ThemeService) {}
inputValue: string = 'Incorrecto';`;

    return this.escapeHtml(`${tsLogicComment}\n${rawHtml.trim()}`);
  }
  
  get fullWidthInputExampleCode(): string {
    const borderRadiusClass = this.themeService.getBorderRadiusClass();
    const shadowStyle = this.themeService.getShadowClassForElements();
    const hoverXClass = this.themeService.getHoverTranslateXClass();
    const hoverYClass = this.themeService.getHoverTranslateYClass();

    const rawHtml = `
<div class="relative w-full"> <!-- Container needs w-full -->
  <!-- Shadow Layer -->
  <div 
    class="absolute inset-0 ${borderRadiusClass}" 
    [ngStyle]="{'box-shadow': themeService.getShadowClassForElements()}"></div>
  <!-- Input Layer -->
  <input 
    type="text" 
    [(ngModel)]="inputValue" 
    placeholder="Ancho completo..."
    class="relative w-full px-3 py-2 border-neo-border border-black bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-transform ${borderRadiusClass} ${hoverXClass} ${hoverYClass}"
  >
</div>`;
    const tsLogicComment = `
// Component Logic:
// import { FormsModule } from '@angular/forms'; // Required for ngModel
// import { ThemeService } from './path/to/theme.service'; // Import ThemeService
// constructor(public themeService: ThemeService) {}
inputValue: string = '';`;

    return this.escapeHtml(`${tsLogicComment}\n${rawHtml.trim()}`);
  }
}
