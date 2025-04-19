import {
  ChangeDetectionStrategy,
  Component,
  inject,
  type OnInit,
} from '@angular/core';
import { ThemeService } from '../../../../services/theme.service';
import { TableRow } from '../table.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentPreviewComponent } from '../../../component-preview/component-preview.component';
import { CodeSnippetPreviewComponent } from '../../../code-snippet-preview/code-snippet-preview.component';

@Component({
  selector: 'app-striped-selection',
  imports: [
    CommonModule,
    FormsModule,
    ComponentPreviewComponent,
    CodeSnippetPreviewComponent,
  ],
  templateUrl: './striped-selection.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StripedSelectionComponent implements OnInit {
  public themeService = inject(ThemeService);

  // Filtering state
  filterId: string = '';
  filterName: string = '';
  filterJob: string = '';
  filterColor: string = '';

  // Sorting state
  sortColumnKey: keyof TableRow | null = null;
  sortDirection: 'asc' | 'desc' | null = null;

  // Tab state management for STRIPED SELECTABLE example
  stripedSelectableTableActiveTab: 'preview' | 'code' = 'preview';

  // Selection state
  selectedRowIds = new Set<number>();

  setStripedSelectableActiveTab(tab: 'preview' | 'code'): void {
    this.stripedSelectableTableActiveTab = tab;
  }

  // --- Combined Filtered and Sorted Data Getter ---
  get filteredAndSortedTableData(): TableRow[] {
    // 1. Apply Filters
    let filteredData = this.tableData.filter(row => 
      (this.filterId === '' || row.id.toString().includes(this.filterId)) &&
      (row.name.toLowerCase().includes(this.filterName.toLowerCase())) &&
      (row.job.toLowerCase().includes(this.filterJob.toLowerCase())) &&
      (row.color.toLowerCase().includes(this.filterColor.toLowerCase()))
    );

    // 2. Apply Sorting
    if (this.sortColumnKey && this.sortDirection) {
      // Create a copy to avoid modifying the filtered array directly during sort
      const dataToSort = [...filteredData]; 
      dataToSort.sort((a, b) => {
        const aValue = a[this.sortColumnKey!];
        const bValue = b[this.sortColumnKey!];

        let comparison = 0;
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          comparison = aValue - bValue;
        } else if (typeof aValue === 'string' && typeof bValue === 'string') {
          comparison = aValue.localeCompare(bValue);
        } else {
          comparison = String(aValue).localeCompare(String(bValue));
        }
        return this.sortDirection === 'asc' ? comparison : -comparison;
      });
      filteredData = dataToSort; // Assign the sorted array back
    }

    return filteredData;
  }

  // Example data for the table (used by all)
  tableData: TableRow[] = [
    { id: 1, name: 'Cy Ganderton', job: 'Quality Control Specialist', color: 'Blue' },
    { id: 2, name: 'Hart Hagerty', job: 'Desktop Support Technician', color: 'Purple' },
    { id: 3, name: 'Brice Swyre', job: 'Tax Accountant', color: 'Red' },
    { id: 4, name: 'Marjy Ferencz', job: 'Office Assistant I', color: 'Crimson' },
    { id: 5, name: 'Yancy Tear', job: 'Community Outreach Specialist', color: 'Indigo' },
  ];

  ngOnInit(): void {}

  toggleSelectAll(): void {
    const currentDataIds = this.filteredAndSortedTableData.map((row) => row.id);
    if (this.areAllSelected()) {
      // Deselect only the currently visible/filtered items
      currentDataIds.forEach((id) => this.selectedRowIds.delete(id));
    } else {
      // Select only the currently visible/filtered items
      currentDataIds.forEach((id) => this.selectedRowIds.add(id));
    }
  }

  areAllSelected(): boolean {
    const currentData = this.filteredAndSortedTableData; // Use current data for select all logic
    if (currentData.length === 0) return false;
    // Check if all currently visible/filtered items are selected
    return currentData.every((row) => this.selectedRowIds.has(row.id));
  }

  isAnySelected(): boolean {
    const currentData = this.filteredAndSortedTableData;
    if (currentData.length === 0) return false;
    // Check if at least one visible/filtered item is selected, but not all
    return (
      currentData.some((row) => this.selectedRowIds.has(row.id)) &&
      !this.areAllSelected()
    );
  }

  // --- Selection Logic ---
  toggleRowSelection(id: number): void {
    if (this.selectedRowIds.has(id)) {
      this.selectedRowIds.delete(id);
    } else {
      this.selectedRowIds.add(id);
    }
  }

  isRowSelected(id: number): boolean { return this.selectedRowIds.has(id); }

  // Getter for STRIPED SELECTABLE table example code
  get stripedSelectableTableExampleCode(): string {
    const borderRadiusClass = this.themeService.getBorderRadiusClass();
    const shadowStyle = this.themeService.getShadowClassForElements();
    const primaryBgClass = this.themeService.getPrimaryBgClass();
    const lightBgClass = this.themeService.getLightBgClass();
    const hoverXClass = this.themeService.getHoverTranslateXClass();
    const hoverYClass = this.themeService.getHoverTranslateYClass();

    // Simplified Neo Checkbox HTML structure (Select All)
    const checkAllCheckboxHtml = `
              <div class="relative inline-flex items-center justify-center h-5 w-5 align-middle">
                <!-- Shadow Layer -->
                <div 
                  class="absolute inset-0 ${borderRadiusClass}" 
                  [ngStyle]="{'box-shadow': themeService.getShadowClassForElements()}"></div>
                <!-- Input Layer -->
                <input 
                  type="checkbox"
                  (change)="toggleSelectAll()"
                  [checked]="areAllSelected()"
                  [indeterminate]="isAnySelected()"
                  class="relative h-full w-full border-neo-border border-black transition-transform cursor-pointer ${borderRadiusClass} ${hoverXClass} ${hoverYClass}"
                  [ngClass]="isAnySelected() || areAllSelected() ? '${primaryBgClass} text-white focus:ring-offset-0 focus:ring-transparent' : 'bg-white focus:ring-blue-500'" 
                  style="appearance: none; -webkit-appearance: none; -moz-appearance: none;"
                  title="Select all rows"
                  >
              </div>
    `;
    
    // Simplified Neo Checkbox HTML structure (Row)
    const rowCheckboxHtml = `
              <div class="relative inline-flex items-center justify-center h-5 w-5 align-middle">
                 <!-- Shadow Layer -->
                <div 
                  class="absolute inset-0 ${borderRadiusClass}" 
                  [ngStyle]="{'box-shadow': themeService.getShadowClassForElements()}"></div>
                <!-- Input Layer -->
                <input 
                  type="checkbox"
                  (change)="toggleRowSelection(row.id)"
                  [checked]="isRowSelected(row.id)"
                  class="relative h-full w-full border-neo-border border-black transition-transform cursor-pointer ${borderRadiusClass} ${hoverXClass} ${hoverYClass}"
                  [ngClass]="isRowSelected(row.id) ? '${primaryBgClass} text-white focus:ring-offset-0 focus:ring-transparent' : 'bg-white focus:ring-blue-500'" 
                  style="appearance: none; -webkit-appearance: none; -moz-appearance: none;"
                  title="Select row {{ row.id }}"
                  >
              </div>
    `;

    const tsLogicComment = `
  // Component Logic:\n  import { ThemeService } from './path/to/theme.service\'; // Import ThemeService\n  // ... other imports\n  \n  tableData: TableRow[] = [/* ... your data ... */];\n  selectedRowIds = new Set<number>();\n  \n  constructor(public themeService: ThemeService) {} // Inject ThemeService\n  \n  toggleRowSelection(id: number): void { /* ... logic ... */ }\n  toggleSelectAll(): void { /* ... logic ... */ }\n  isRowSelected(id: number): boolean { return this.selectedRowIds.has(id); }\n  areAllSelected(): boolean { /* ... logic ... */ }\n  isAnySelected(): boolean { /* ... logic ... */ }`;

    const rawHtml = `
${tsLogicComment}
<!-- HTML Template -->
<div class="overflow-x-auto border-neo-border border-black ${borderRadiusClass}" style="box-shadow: ${shadowStyle};">
  <table class="min-w-full bg-white">
    <thead class="${primaryBgClass} text-white font-medium">
      <tr>
        <th class="py-3 px-4 text-left w-12">
          ${checkAllCheckboxHtml.trim()}
        </th>
        <th class="py-3 px-4 text-left">ID</th>
        <th class="py-3 px-4 text-left">Nombre</th>
        <th class="py-3 px-4 text-left">Puesto</th>
        <th class="py-3 px-4 text-left">Color Favorito</th>
      </tr>
    </thead>
    <tbody>
      @for (row of tableData; track row.id; let isEven = $even) {
        <tr class="border-b border-black" [ngClass]="isEven ? '${lightBgClass}' : ''">
          <td class="py-3 px-4">
             ${rowCheckboxHtml.trim()}
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
    return this.escapeHtml(rawHtml.trim());
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
