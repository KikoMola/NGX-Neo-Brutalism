import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService, ThemeColor, BorderRadiusSize, ShadowSize } from '../../services/theme.service';

interface ColorOption {
  name: ThemeColor;
  displayName: string;
  shade: string;
  value: string;
}

@Component({
  selector: 'app-customization-demo',
  templateUrl: './customization-demo.component.html',
  styles: [],
  standalone: true,
  imports: [CommonModule]
})
export class CustomizationDemoComponent implements OnInit {
  // Hacer themeService público para poder accederlo desde la plantilla
  public themeService = inject(ThemeService);
  
  // Color actual seleccionado
  currentColor: ThemeColor = 'red';
  
  // Border radius actual seleccionado
  currentBorderRadius: BorderRadiusSize = '0';
  
  // Shadow horizontal actual seleccionado
  currentShadowHorizontal: ShadowSize = '2';
  
  // Shadow vertical actual seleccionado
  currentShadowVertical: ShadowSize = '2';
  
  // Opciones de colores organizadas por grupos
  colorGroups: { name: string, colors: ColorOption[] }[] = [
    {
      name: 'Rojo y Rosa',
      colors: [
        { name: 'red', displayName: 'Rojo', shade: '500', value: '#EF4444' },
        { name: 'rose', displayName: 'Rosa', shade: '500', value: '#F43F5E' }
      ]
    },
    {
      name: 'Azules',
      colors: [
        { name: 'blue', displayName: 'Azul', shade: '500', value: '#3B82F6' },
        { name: 'indigo', displayName: 'Índigo', shade: '500', value: '#6366F1' },
        { name: 'teal', displayName: 'Turquesa', shade: '500', value: '#14B8A6' }
      ]
    },
    {
      name: 'Verdes',
      colors: [
        { name: 'green', displayName: 'Verde', shade: '500', value: '#22C55E' }
      ]
    },
    {
      name: 'Cálidos',
      colors: [
        { name: 'yellow', displayName: 'Amarillo', shade: '500', value: '#EAB308' },
        { name: 'orange', displayName: 'Naranja', shade: '500', value: '#F97316' }
      ]
    },
    {
      name: 'Morados',
      colors: [
        { name: 'purple', displayName: 'Morado', shade: '500', value: '#A855F7' },
        { name: 'pink', displayName: 'Rosa claro', shade: '500', value: '#EC4899' }
      ]
    }
  ];

  ngOnInit(): void {
    // Inicializar con el color actual del servicio
    this.currentColor = this.themeService.getThemeColor();
    // Inicializar con el border radius actual del servicio
    this.currentBorderRadius = this.themeService.getBorderRadius();
    // Inicializar con el shadow horizontal actual del servicio
    this.currentShadowHorizontal = this.themeService.getShadowHorizontal();
    // Inicializar con el shadow vertical actual del servicio
    this.currentShadowVertical = this.themeService.getShadowVertical();
  }

  setColor(color: ThemeColor): void {
    this.currentColor = color;
    // Actualizar el tema en todo el sitio
    this.themeService.setThemeColor(color);
  }
  
  setBorderRadius(radius: BorderRadiusSize): void {
    this.currentBorderRadius = radius;
    // Actualizar el border radius en todo el sitio
    this.themeService.setBorderRadius(radius);
  }
  
  setShadowHorizontal(shadow: ShadowSize): void {
    this.currentShadowHorizontal = shadow;
    // Actualizar el shadow horizontal en todo el sitio
    this.themeService.setShadowHorizontal(shadow);
  }
  
  setShadowVertical(shadow: ShadowSize): void {
    this.currentShadowVertical = shadow;
    // Actualizar el shadow vertical en todo el sitio
    this.themeService.setShadowVertical(shadow);
  }
  
  getButtonClasses(): string {
    return this.themeService.getPrimaryButtonClasses();
  }
  
  getCardClasses(): string {
    return this.themeService.getLightElementClasses();
  }
}
