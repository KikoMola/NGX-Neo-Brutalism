import { ChangeDetectionStrategy, Component, inject, type OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../../services/theme.service';
import { ComponentPreviewComponent } from '../../component-preview/component-preview.component';
import { CodeSnippetPreviewComponent } from '../../code-snippet-preview/code-snippet-preview.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ComponentPreviewComponent,
    CodeSnippetPreviewComponent
  ],
  templateUrl: './table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit {
  public themeService = inject(ThemeService);

  // Tab state management for NON-STRIPED example
  nonStripedTableActiveTab: 'preview' | 'code' = 'preview';

  setNonStripedActiveTab(tab: 'preview' | 'code'): void {
    this.nonStripedTableActiveTab = tab;
  }
  
  // Tab state management for STRIPED example
  stripedTableActiveTab: 'preview' | 'code' = 'preview';

  setStripedActiveTab(tab: 'preview' | 'code'): void {
    this.stripedTableActiveTab = tab;
  }

  // Tab state management for NON-STRIPED HOVER example
  nonStripedHoverTableActiveTab: 'preview' | 'code' = 'preview';

  setNonStripedHoverActiveTab(tab: 'preview' | 'code'): void {
    this.nonStripedHoverTableActiveTab = tab;
  }
  
  // Tab state management for STRIPED HOVER example
  stripedHoverTableActiveTab: 'preview' | 'code' = 'preview';

  setStripedHoverActiveTab(tab: 'preview' | 'code'): void {
    this.stripedHoverTableActiveTab = tab;
  }

  // Tab state management for STRIPED SELECTABLE example
  stripedSelectableTableActiveTab: 'preview' | 'code' = 'preview';

  setStripedSelectableActiveTab(tab: 'preview' | 'code'): void {
    this.stripedSelectableTableActiveTab = tab;
  }

  // Tab state management for TOGGLE COLUMNS example
  toggleColumnsTableActiveTab: 'preview' | 'code' = 'preview';

  setToggleColumnsActiveTab(tab: 'preview' | 'code'): void {
    this.toggleColumnsTableActiveTab = tab;
  }

  // Tab state management for FILTER example
  filterTableActiveTab: 'preview' | 'code' = 'preview';

  setFilterTableActiveTab(tab: 'preview' | 'code'): void {
    this.filterTableActiveTab = tab;
  }

  // Example data for the table (used by all)
  tableData = [
    { id: 1, name: 'Cy Ganderton', job: 'Quality Control Specialist', color: 'Blue' },
    { id: 2, name: 'Hart Hagerty', job: 'Desktop Support Technician', color: 'Purple' },
    { id: 3, name: 'Brice Swyre', job: 'Tax Accountant', color: 'Red' },
  ];

  // Selection state
  selectedRowIds = new Set<number>();

  // Column visibility state
  visibleColumns = new Set<string>(['id', 'name', 'job', 'color']);

  isColumnSelectorOpen = false; // State for dropdown visibility

  // Filtering state
  filterId: string = '';
  filterName: string = '';
  filterJob: string = '';
  filterColor: string = '';

  get filteredTableData() {
    return this.tableData.filter(row => 
      (this.filterId === '' || row.id.toString().includes(this.filterId)) &&
      (row.name.toLowerCase().includes(this.filterName.toLowerCase())) &&
      (row.job.toLowerCase().includes(this.filterJob.toLowerCase())) &&
      (row.color.toLowerCase().includes(this.filterColor.toLowerCase()))
    );
  }

  ngOnInit(): void {
    // Reset selection and visibility on init if needed, or load from a service/storage
    this.selectedRowIds.clear();
    this.visibleColumns = new Set<string>(['id', 'name', 'job', 'color']);
    this.isColumnSelectorOpen = false; // Ensure dropdown is closed on init
    // Reset filters on init
    this.filterId = '';
    this.filterName = '';
    this.filterJob = '';
    this.filterColor = '';
  }

  // --- Selection Logic ---
  toggleRowSelection(id: number): void {
    if (this.selectedRowIds.has(id)) {
      this.selectedRowIds.delete(id);
    } else {
      this.selectedRowIds.add(id);
    }
  }

  toggleSelectAll(): void {
    if (this.areAllSelected()) {
      this.selectedRowIds.clear();
    } else {
      this.tableData.forEach(row => this.selectedRowIds.add(row.id));
    }
  }

  isRowSelected(id: number): boolean {
    return this.selectedRowIds.has(id);
  }

  areAllSelected(): boolean {
    return this.selectedRowIds.size === this.tableData.length;
  }

  isAnySelected(): boolean {
    return this.selectedRowIds.size > 0 && !this.areAllSelected();
  }

  // --- Column Visibility Logic ---
  toggleColumnVisibility(columnKey: string): void {
    if (this.visibleColumns.has(columnKey)) {
      if (this.visibleColumns.size > 1) {
        this.visibleColumns.delete(columnKey);
      }
    } else {
      this.visibleColumns.add(columnKey);
    }
  }

  isColumnVisible(columnKey: string): boolean {
    return this.visibleColumns.has(columnKey);
  }

  toggleColumnSelector(): void {
    this.isColumnSelectorOpen = !this.isColumnSelectorOpen;
  }

  // --- Example Code Getters ---

  // Getter for NON-STRIPED table example code
  get nonStripedTableExampleCode(): string {
    const borderRadiusClass = this.themeService.getBorderRadiusClass();
    const shadowStyle = this.themeService.getShadowClassForElements();
    const primaryBgClass = this.themeService.getPrimaryBgClass();

    const tableHtml = `
<div class="overflow-x-auto border-neo-border border-black ${borderRadiusClass}" style="box-shadow: ${shadowStyle};">
  <table class="min-w-full bg-white">
    <thead class="${primaryBgClass} text-white font-medium">
      <tr>
        <th class="py-3 px-4 text-left">ID</th>
        <th class="py-3 px-4 text-left">Nombre</th>
        <th class="py-3 px-4 text-left">Puesto</th>
        <th class="py-3 px-4 text-left">Color Favorito</th>
      </tr>
    </thead>
    <tbody>
      <!-- Data rows generated by @for loop -->
      @for (row of tableData; track row.id) {
        <tr class="border-b border-black">
          <td class="py-3 px-4">{{ row.id }}</td>
          <td class="py-3 px-4">{{ row.name }}</td>
          <td class="py-3 px-4">{{ row.job }}</td>
          <td class="py-3 px-4">{{ row.color }}</td>
        </tr>
      }
    </tbody>
  </table>
</div>`;

    return this.escapeHtml(tableHtml.trim());
  }

  // Getter for STRIPED table example code
  get stripedTableExampleCode(): string {
    const borderRadiusClass = this.themeService.getBorderRadiusClass();
    const shadowStyle = this.themeService.getShadowClassForElements();
    const primaryBgClass = this.themeService.getPrimaryBgClass();
    const lightBgClass = this.themeService.getLightBgClass();

    const tableHtml = `
<div class="overflow-x-auto border-neo-border border-black ${borderRadiusClass}" style="box-shadow: ${shadowStyle};">
  <table class="min-w-full bg-white">
    <thead class="${primaryBgClass} text-white font-medium">
      <tr>
        <th class="py-3 px-4 text-left">ID</th>
        <th class="py-3 px-4 text-left">Nombre</th>
        <th class="py-3 px-4 text-left">Puesto</th>
        <th class="py-3 px-4 text-left">Color Favorito</th>
      </tr>
    </thead>
    <tbody>
      <!-- Data rows generated by @for loop -->
       @for (row of tableData; track row.id; let isEven = $even) {
        <tr class="border-b border-black" [ngClass]="isEven ? '${lightBgClass}' : ''">
          <td class="py-3 px-4">{{ row.id }}</td>
          <td class="py-3 px-4">{{ row.name }}</td>
          <td class="py-3 px-4">{{ row.job }}</td>
          <td class="py-3 px-4">{{ row.color }}</td>
        </tr>
      }
    </tbody>
  </table>
</div>`;

    return this.escapeHtml(tableHtml.trim());
  }

  // Getter for NON-STRIPED HOVER table example code
  get nonStripedHoverTableExampleCode(): string {
    const borderRadiusClass = this.themeService.getBorderRadiusClass();
    const shadowStyle = this.themeService.getShadowClassForElements();
    const primaryBgClass = this.themeService.getPrimaryBgClass();

    const tableHtml = `
<div class="overflow-x-auto border-neo-border border-black ${borderRadiusClass}" style="box-shadow: ${shadowStyle};">
  <table class="min-w-full bg-white">
    <thead class="${primaryBgClass} text-white font-medium">
      <tr>
        <th class="py-3 px-4 text-left">ID</th>
        <th class="py-3 px-4 text-left">Nombre</th>
        <th class="py-3 px-4 text-left">Puesto</th>
        <th class="py-3 px-4 text-left">Color Favorito</th>
      </tr>
    </thead>
    <tbody>
      <!-- Data rows generated by @for loop -->
      @for (row of tableData; track row.id) {
        <tr class="border-b border-black hover:bg-gray-100">
          <td class="py-3 px-4">{{ row.id }}</td>
          <td class="py-3 px-4">{{ row.name }}</td>
          <td class="py-3 px-4">{{ row.job }}</td>
          <td class="py-3 px-4">{{ row.color }}</td>
        </tr>
      }
    </tbody>
  </table>
</div>`;

    return this.escapeHtml(tableHtml.trim());
  }

  // Getter for STRIPED HOVER table example code
  get stripedHoverTableExampleCode(): string {
    const borderRadiusClass = this.themeService.getBorderRadiusClass();
    const shadowStyle = this.themeService.getShadowClassForElements();
    const primaryBgClass = this.themeService.getPrimaryBgClass();
    const lightBgClass = this.themeService.getLightBgClass();

    const tableHtml = `
<div class="overflow-x-auto border-neo-border border-black ${borderRadiusClass}" style="box-shadow: ${shadowStyle};">
  <table class="min-w-full bg-white">
    <thead class="${primaryBgClass} text-white font-medium">
      <tr>
        <th class="py-3 px-4 text-left">ID</th>
        <th class="py-3 px-4 text-left">Nombre</th>
        <th class="py-3 px-4 text-left">Puesto</th>
        <th class="py-3 px-4 text-left">Color Favorito</th>
      </tr>
    </thead>
    <tbody>
      <!-- Data rows generated by @for loop -->
       @for (row of tableData; track row.id; let isEven = $even) {
        <tr class="border-b border-black hover:bg-gray-100" [ngClass]="isEven ? '${lightBgClass}' : ''">
          <td class="py-3 px-4">{{ row.id }}</td>
          <td class="py-3 px-4">{{ row.name }}</td>
          <td class="py-3 px-4">{{ row.job }}</td>
          <td class="py-3 px-4">{{ row.color }}</td>
        </tr>
      }
    </tbody>
  </table>
</div>`;

    return this.escapeHtml(tableHtml.trim());
  }
  
  // Getter for STRIPED SELECTABLE table example code
  get stripedSelectableTableExampleCode(): string {
    const borderRadiusClass = this.themeService.getBorderRadiusClass();
    const shadowStyle = this.themeService.getShadowClassForElements();
    const primaryBgClass = this.themeService.getPrimaryBgClass();
    const lightBgClass = this.themeService.getLightBgClass();
    
    // Comment explaining the required TS logic
    const tsLogicComment = `
  export class YourComponent {
    tableData = [ /* your data */ ];
    selectedRowIds = new Set<number>();

    toggleRowSelection(id: number): void { /* Add/remove id from selectedRowIds */ }
    toggleSelectAll(): void { /* Add all ids or clear selectedRowIds */ }
    isRowSelected(id: number): boolean { /* return selectedRowIds.has(id); */ }
    areAllSelected(): boolean { /* return selectedRowIds.size === tableData.length; */ }
    isAnySelected(): boolean { /* return selectedRowIds.size > 0 && !areAllSelected(); */ }
  }
    `;

    const tableHtml = `
<div class="overflow-x-auto border-neo-border border-black ${borderRadiusClass}" style="box-shadow: ${shadowStyle};">
  <table class="min-w-full bg-white">
    <thead class="${primaryBgClass} text-white font-medium">
      <tr>
        <th class="py-3 px-4 text-left w-12">
          <input 
            type="checkbox"
            (change)="toggleSelectAll()"
            [checked]="areAllSelected()"
            [indeterminate]="isAnySelected()"
            class="form-checkbox h-5 w-5 text-blue-600 border-black focus:ring-blue-500"
          >
        </th>
        <th class="py-3 px-4 text-left">ID</th>
        <th class="py-3 px-4 text-left">Nombre</th>
        <th class="py-3 px-4 text-left">Puesto</th>
        <th class="py-3 px-4 text-left">Color Favorito</th>
      </tr>
    </thead>
    <tbody>
      <!-- Data rows generated by @for loop -->
       @for (row of tableData; track row.id; let isEven = $even) {
        <tr class="border-b border-black" [ngClass]="isEven ? '${lightBgClass}' : ''">
          <td class="py-3 px-4">
            <input 
              type="checkbox" 
              (change)="toggleRowSelection(row.id)"
              [checked]="isRowSelected(row.id)"
              class="form-checkbox h-5 w-5 text-blue-600 border-black focus:ring-blue-500"
            >
          </td>
          <td class="py-3 px-4">{{ row.id }}</td>
          <td class="py-3 px-4">{{ row.name }}</td>
          <td class="py-3 px-4">{{ row.job }}</td>
          <td class="py-3 px-4">{{ row.color }}</td>
        </tr>
      }
    </tbody>
  </table>
</div>`;

    return this.escapeHtml(tsLogicComment + tableHtml.trim());
  }

  // Getter for TOGGLE COLUMNS table example code
  get toggleColumnsTableExampleCode(): string {
    const borderRadiusClass = this.themeService.getBorderRadiusClass();
    const shadowStyle = this.themeService.getShadowClassForElements();
    const primaryBgClass = this.themeService.getPrimaryBgClass();
    const lightBgClass = this.themeService.getLightBgClass();
    const hoverXClass = this.themeService.getHoverTranslateXClass();
    const hoverYClass = this.themeService.getHoverTranslateYClass();

    // Comment explaining the required TS logic
    const tsLogicComment = `
  export class YourComponent {
    tableData = [ /* your data */ ];
    visibleColumns = new Set<string>(['id', 'name', 'job', 'color']); 
    isColumnSelectorOpen = false;

    toggleColumnVisibility(columnKey: string): void { 
        if (this.visibleColumns.has(columnKey)) {
            if (this.visibleColumns.size > 1) { // Prevent hiding last column
                this.visibleColumns.delete(columnKey);
            }
        } else {
            this.visibleColumns.add(columnKey);
        }
    }
    isColumnVisible(columnKey: string): boolean { 
        return this.visibleColumns.has(columnKey); 
    }
    toggleColumnSelector(): void { this.isColumnSelectorOpen = !this.isColumnSelectorOpen; }
  }
    `;

    // HTML for the table including the styled button and dropdown in the header
    const tableHtml = `
<div class="overflow-x-auto border-neo-border border-black ${borderRadiusClass}" style="box-shadow: ${shadowStyle};">
  <table class="min-w-full bg-white">
    <thead class="${primaryBgClass} text-white font-medium">
      <tr>
        <th class="py-3 px-4 text-left">Nombre</th>
        @if (isColumnVisible('id')) { <th class="py-3 px-4 text-left">ID</th> }
        @if (isColumnVisible('job')) { <th class="py-3 px-4 text-left">Puesto</th> }
        @if (isColumnVisible('color')) { <th class="py-3 px-4 text-left">Color Favorito</th> }
        <!-- Column Toggle Button Header -->
        <th class="py-2 px-4 text-right">
          <div class="relative inline-block text-left">
            <!-- Neobrutalist Button Structure -->
            <div class="relative">
               <!-- Shadow Layer -->
               <div class="absolute inset-0 ${borderRadiusClass}" style="box-shadow: ${shadowStyle};"></div>
               <!-- Button Content -->
               <button 
                  (click)="toggleColumnSelector()" 
                  type="button" 
                  class="relative inline-flex justify-center items-center border-neo-border border-black px-2 py-1 bg-white text-sm font-medium text-gray-700 transition-transform ${borderRadiusClass} ${hoverXClass} ${hoverYClass}"
                  aria-haspopup="true" 
                  [attr.aria-expanded]="isColumnSelectorOpen">
                 <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                   <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                 </svg>
               </button>
             </div>
            <!-- Dropdown Panel -->
            @if (isColumnSelectorOpen) {
              <div 
                class="origin-top-right absolute right-0 mt-2 w-48 border-neo-border border-black bg-white focus:outline-none z-10 ${borderRadiusClass}"
                style="box-shadow: ${shadowStyle};"
                role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                <div class="py-1" role="none">
                  <label class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                    <input type="checkbox" (change)="toggleColumnVisibility('id')" [checked]="isColumnVisible('id')" class="form-checkbox h-4 w-4 mr-2 border-black text-blue-600 focus:ring-blue-500">
                    <span>ID</span>
                  </label>
                  <label class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                    <input type="checkbox" (change)="toggleColumnVisibility('job')" [checked]="isColumnVisible('job')" class="form-checkbox h-4 w-4 mr-2 border-black text-blue-600 focus:ring-blue-500">
                    <span>Puesto</span>
                  </label>
                  <label class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                    <input type="checkbox" (change)="toggleColumnVisibility('color')" [checked]="isColumnVisible('color')" class="form-checkbox h-4 w-4 mr-2 border-black text-blue-600 focus:ring-blue-500">
                    <span>Color Favorito</span>
                  </label>
                </div>
              </div>
            }
          </div>
        </th>
      </tr>
    </thead>
    <tbody>
       @for (row of tableData; track row.id; let isEven = $even) {
        <tr class="border-b border-black" [ngClass]="isEven ? '${lightBgClass}' : ''">
          <td class="py-3 px-4">{{ row.name }}</td>
          @if (isColumnVisible('id')) { <td class="py-3 px-4">{{ row.id }}</td> }
          @if (isColumnVisible('job')) { <td class="py-3 px-4">{{ row.job }}</td> }
          @if (isColumnVisible('color')) { <td class="py-3 px-4">{{ row.color }}</td> }
          <td></td> 
        </tr>
      }
    </tbody>
  </table>
</div>`;

    // Combine TS comment and table HTML
    return this.escapeHtml(tsLogicComment + tableHtml.trim());
  }

  // Getter for FILTER table example code
  get filterTableExampleCode(): string {
    const borderRadiusClass = this.themeService.getBorderRadiusClass();
    const shadowStyle = this.themeService.getShadowClassForElements();
    const primaryBgClass = this.themeService.getPrimaryBgClass();
    const lightBgClass = this.themeService.getLightBgClass();

    // Comment explaining the required TS logic
    const tsLogicComment = `
  import { FormsModule } from '@angular/forms'; // Required!
  
  export class YourComponent {
    tableData = [ /* your data */ ];
    filterId: string = '';
    filterName: string = '';
    filterJob: string = '';
    filterColor: string = '';

    get filteredTableData() {
      return this.tableData.filter(row => 
        (this.filterId === '' || row.id.toString().includes(this.filterId)) &&
        (row.name.toLowerCase().includes(this.filterName.toLowerCase())) &&
        (row.job.toLowerCase().includes(this.filterJob.toLowerCase())) &&
        (row.color.toLowerCase().includes(this.filterColor.toLowerCase()))
      );
    }
  }
    `;

    const tableHtml = `
<div class="overflow-x-auto border-neo-border border-black ${borderRadiusClass}" style="box-shadow: ${shadowStyle};">
  <table class="min-w-full bg-white">
    <thead class="${primaryBgClass} text-white font-medium">
      <!-- Header Row -->
      <tr>
        <th class="py-3 px-4 text-left">ID</th>
        <th class="py-3 px-4 text-left">Nombre</th>
        <th class="py-3 px-4 text-left">Puesto</th>
        <th class="py-3 px-4 text-left">Color Favorito</th>
      </tr>
      <!-- Filter Row -->
      <tr class="bg-white">
         <th class="p-2">
            <div class="relative">
             <div class="absolute inset-0 ${borderRadiusClass}" style="box-shadow: ${shadowStyle};"></div>
             <input 
               type="text" 
               [(ngModel)]="filterId" 
               placeholder="Filtrar..."
               class="relative w-full px-2 py-1 border-neo-border border-black bg-white text-sm text-gray-900 ${borderRadiusClass} focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
             >
           </div>
         </th> 
         <th class="p-2">
           <div class="relative">
             <div class="absolute inset-0 ${borderRadiusClass}" style="box-shadow: ${shadowStyle};"></div>
             <input 
               type="text" 
               [(ngModel)]="filterName" 
               placeholder="Filtrar..."
               class="relative w-full px-2 py-1 border-neo-border border-black bg-white text-sm text-gray-900 ${borderRadiusClass} focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
             >
           </div>
         </th>
         <th class="p-2">
            <div class="relative">
             <div class="absolute inset-0 ${borderRadiusClass}" style="box-shadow: ${shadowStyle};"></div>
             <input 
               type="text" 
               [(ngModel)]="filterJob" 
               placeholder="Filtrar..."
               class="relative w-full px-2 py-1 border-neo-border border-black bg-white text-sm text-gray-900 ${borderRadiusClass} focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
             >
           </div>
         </th>
         <th class="p-2">
            <div class="relative">
             <div class="absolute inset-0 ${borderRadiusClass}" style="box-shadow: ${shadowStyle};"></div>
             <input 
               type="text" 
               [(ngModel)]="filterColor" 
               placeholder="Filtrar..."
               class="relative w-full px-2 py-1 border-neo-border border-black bg-white text-sm text-gray-900 ${borderRadiusClass} focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
             >
           </div>
         </th>
      </tr>
    </thead>
    <tbody>
       @for (row of filteredTableData; track row.id; let isEven = $even) {
        <tr class="border-b border-black" [ngClass]="isEven ? '${lightBgClass}' : ''">
          <td class="py-3 px-4">{{ row.id }}</td>
          <td class="py-3 px-4">{{ row.name }}</td>
          <td class="py-3 px-4">{{ row.job }}</td>
          <td class="py-3 px-4">{{ row.color }}</td>
        </tr>
       }
       @if (filteredTableData.length === 0) {
         <tr>
           <td colspan="4" class="text-center py-4 text-gray-500">No se encontraron resultados.</td>
         </tr>
       }
    </tbody>
  </table>
</div>`;

    // Combine TS comment and table HTML
    return this.escapeHtml(tsLogicComment + tableHtml.trim());
  }

  private escapeHtml(unsafe: string): string {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}
