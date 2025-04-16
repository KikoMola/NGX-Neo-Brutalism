import { Injectable, signal } from '@angular/core';

export type ThemeColor = 'red' | 'blue' | 'green' | 'yellow' | 'purple' | 'pink' | 'indigo' | 'teal' | 'orange' | 'rose';
export type ColorShade = '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
export type BorderRadiusSize = '0' | '5' | '10' | '15';
export type ShadowSize = '-4' | '-2' | '0' | '2' | '4';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  // Color principal
  private color = signal<ThemeColor>('red');
  
  // Border radius personalizado
  private borderRadius = signal<BorderRadiusSize>('0');
  
  // Shadow horizontal personalizado
  private shadowHorizontal = signal<ShadowSize>('2');
  
  // Shadow vertical personalizado
  private shadowVertical = signal<ShadowSize>('2');
  
  // Sombras para cada uso
  private primaryShade = signal<ColorShade>('500');
  private secondaryShade = signal<ColorShade>('200');
  private lightShade = signal<ColorShade>('100');
  private darkShade = signal<ColorShade>('700');
  private textShade = signal<ColorShade>('900');
  
  constructor() {}
  
  // Cambiar el color primario
  setThemeColor(newColor: ThemeColor): void {
    this.color.set(newColor);
  }
  
  // Obtener el color actual
  getThemeColor(): ThemeColor {
    return this.color();
  }
  
  // Cambiar el border radius
  setBorderRadius(newRadius: BorderRadiusSize): void {
    this.borderRadius.set(newRadius);
  }
  
  // Obtener el border radius actual
  getBorderRadius(): BorderRadiusSize {
    return this.borderRadius();
  }
  
  // Obtener la clase de border radius
  getBorderRadiusClass(): string {
    return `rounded-[${this.borderRadius()}px]`;
  }
  
  // Cambiar el shadow horizontal
  setShadowHorizontal(newShadow: ShadowSize): void {
    this.shadowHorizontal.set(newShadow);
  }
  
  // Obtener el shadow horizontal actual
  getShadowHorizontal(): ShadowSize {
    return this.shadowHorizontal();
  }
  
  // Cambiar el shadow vertical
  setShadowVertical(newShadow: ShadowSize): void {
    this.shadowVertical.set(newShadow);
  }
  
  // Obtener el shadow vertical actual
  getShadowVertical(): ShadowSize {
    return this.shadowVertical();
  }
  
  // Obtener la clase de shadow personalizado
  getShadowClass(): string {
    const h = this.shadowHorizontal();
    const v = this.shadowVertical();
    return `${h}px ${v}px 0px 0px rgba(0,0,0,1)`;
  }
  
  // Clases para elementos
  getPrimaryBgClass(): string {
    return `bg-${this.color()}-${this.primaryShade()}`;
  }
  
  getSecondaryBgClass(): string {
    return `bg-${this.color()}-${this.secondaryShade()}`;
  }
  
  getLightBgClass(): string {
    return `bg-${this.color()}-${this.lightShade()}`;
  }
  
  getDarkBgClass(): string {
    return `bg-${this.color()}-${this.darkShade()}`;
  }
  
  getTextClass(): string {
    return `text-${this.color()}-${this.textShade()}`;
  }
  
  getTextLightClass(): string {
    return `text-${this.color()}-${this.lightShade()}`;
  }
  
  getBorderClass(): string {
    return `border-${this.color()}-${this.primaryShade()}`;
  }
  
  getHoverBgClass(): string {
    return `hover:bg-${this.color()}-${this.darkShade()}`;
  }
  
  getHoverTextClass(): string {
    return `hover:text-${this.color()}-${this.textShade()}`;
  }
  
  // Para botones primarios
  getPrimaryButtonClasses(): string {
    return `${this.getPrimaryBgClass()} ${this.getHoverBgClass()} text-white border-neo-border border-black shadow-neo rounded-neo`;
  }
  
  // Para elementos secundarios
  getSecondaryElementClasses(): string {
    return `${this.getSecondaryBgClass()} border-neo-border border-black shadow-neo rounded-neo`;
  }
  
  // Para elementos light (fondos claros)
  getLightElementClasses(): string {
    return `${this.getLightBgClass()} border-neo-border border-black shadow-neo rounded-neo`;
  }
} 