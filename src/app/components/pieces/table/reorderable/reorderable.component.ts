import {
  ChangeDetectionStrategy,
  Component,
  inject,
  type OnInit,
} from '@angular/core';
import { ThemeService } from '../../../../services/theme.service';
import { CommonModule } from '@angular/common';
import { ComponentPreviewComponent } from '../../../component-preview/component-preview.component';
import { CodeSnippetPreviewComponent } from '../../../code-snippet-preview/code-snippet-preview.component';
import { TableRow } from '../table.component';

@Component({
  selector: 'app-reorderable',
  imports: [
    CommonModule,
    ComponentPreviewComponent,
    CodeSnippetPreviewComponent,
  ],
  templateUrl: './reorderable.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReorderableComponent implements OnInit {
  public themeService = inject(ThemeService);

  // Example data for the table (used by all)
  tableData: TableRow[] = [
    {
      id: 1,
      name: 'Cy Ganderton',
      job: 'Quality Control Specialist',
      color: 'Blue',
    },
    {
      id: 2,
      name: 'Hart Hagerty',
      job: 'Desktop Support Technician',
      color: 'Purple',
    },
    { id: 3, name: 'Brice Swyre', job: 'Tax Accountant', color: 'Red' },
    {
      id: 4,
      name: 'Marjy Ferencz',
      job: 'Office Assistant I',
      color: 'Crimson',
    },
    {
      id: 5,
      name: 'Yancy Tear',
      job: 'Community Outreach Specialist',
      color: 'Indigo',
    },
  ];

  // Sorting state
  sortColumnKey: keyof TableRow | null = null;
  sortDirection: 'asc' | 'desc' | null = null;

  // --- Options Menu State ---
  openOptionsRowId: number | null = null;

  // Tab state management for SORTABLE example
  sortableTableActiveTab: 'preview' | 'code' = 'preview';

  setSortableTableActiveTab(tab: 'preview' | 'code'): void {
    this.sortableTableActiveTab = tab;
  }

  // --- Sorting Logic ---
  sortTable(columnKey: keyof TableRow): void {
    if (this.sortColumnKey === columnKey) {
      // Cycle direction: null -> asc -> desc -> null
      if (this.sortDirection === null) {
        this.sortDirection = 'asc';
      } else if (this.sortDirection === 'asc') {
        this.sortDirection = 'desc';
      } else {
        this.sortColumnKey = null;
        this.sortDirection = null;
      }
    } else {
      // New column sort: default to asc
      this.sortColumnKey = columnKey;
      this.sortDirection = 'asc';
    }
  }

  // --- Options Menu Logic ---
  toggleOptions(rowId: number): void {
    this.openOptionsRowId = this.openOptionsRowId === rowId ? null : rowId;
  }

  handleOptionClick(option: string, rowId: number): void {
    console.log(`${option} clicked for row ${rowId}`);
    this.openOptionsRowId = null; // Close the menu after action
  }

  get sortedTableData(): TableRow[] {
    if (!this.sortColumnKey || !this.sortDirection) {
      return this.tableData; // Return original data if no sort applied
    }

    // Create a copy to avoid modifying the original array
    const dataToSort = [...this.tableData];

    dataToSort.sort((a, b) => {
      const aValue = a[this.sortColumnKey!];
      const bValue = b[this.sortColumnKey!];

      let comparison = 0;
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        comparison = aValue - bValue;
      } else if (typeof aValue === 'string' && typeof bValue === 'string') {
        comparison = aValue.localeCompare(bValue);
      } else {
        // Handle mixed types or other types if necessary
        comparison = String(aValue).localeCompare(String(bValue));
      }

      return this.sortDirection === 'asc' ? comparison : -comparison;
    });

    return dataToSort;
  }

  // Getter for SORTABLE table example code
  get sortableTableExampleCode(): string {
    const borderRadiusClass = this.themeService.getBorderRadiusClass();
    const shadowStyle = this.themeService.getShadowClassForElements();
    const primaryBgClass = this.themeService.getPrimaryBgClass();
    const lightBgClass = this.themeService.getLightBgClass();

    // Comment explaining the required TS logic
    const tsLogicComment = `
  interface TableRow { id: number; name: string; job: string; color: string; }

  export class YourComponent {
    tableData: TableRow[] = [ /* your data */ ];
    sortColumnKey: keyof TableRow | null = null;
    sortDirection: 'asc' | 'desc' | null = null;

    sortTable(columnKey: keyof TableRow): void { /* ... cycle logic ... */ }

    get sortedTableData(): TableRow[] { 
      // Return sorted copy based on sortColumnKey and sortDirection
      // ... sort logic ...
      return this.tableData; // Placeholder 
    }
  }
    `;

    // Define SVGs
    const ascSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up-az-icon lucide-arrow-up-a-z"><path d="m3 8 4-4 4 4"/><path d="M7 4v16"/><path d="M20 8h-5"/><path d="M15 10V6.5a2.5 2.5 0 0 1 5 0V10"/><path d="M15 14h5l-5 6h5"/></svg>`;
    const descSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-down-az-icon lucide-arrow-down-a-z"><path d="m3 16 4 4 4-4"/><path d="M7 20V4"/><path d="M20 8h-5"/><path d="M15 10V6.5a2.5 2.5 0 0 1 5 0V10"/><path d="M15 14h5l-5 6h5"/></svg>`;

    const tableHtml = `
<div class="overflow-x-auto border-neo-border border-black ${borderRadiusClass}" style="box-shadow: ${shadowStyle};">
  <table class="min-w-full bg-white">
    <thead class="${primaryBgClass} text-white font-medium">
      <tr>
        <!-- Sortable Headers with updated SVGs -->
        <th class="py-3 px-4 text-left">
           <button (click)="sortTable('id')" class="flex items-center space-x-1 hover:opacity-80">
             <span>ID</span>
             @if (sortColumnKey === 'id') {
               @if (sortDirection === 'asc') {
                 ${ascSvg}
               } @else if (sortDirection === 'desc') {
                 ${descSvg}
               }
             }
           </button>
        </th>
        <th class="py-3 px-4 text-left">
           <button (click)="sortTable('name')" class="flex items-center space-x-1 hover:opacity-80">
             <span>Nombre</span>
             @if (sortColumnKey === 'name') {
               @if (sortDirection === 'asc') {
                 ${ascSvg}
               } @else if (sortDirection === 'desc') {
                 ${descSvg}
               }
             }
           </button>
        </th>
         <th class="py-3 px-4 text-left">
           <button (click)="sortTable('job')" class="flex items-center space-x-1 hover:opacity-80">
             <span>Puesto</span>
             @if (sortColumnKey === 'job') {
               @if (sortDirection === 'asc') {
                 ${ascSvg}
               } @else if (sortDirection === 'desc') {
                 ${descSvg}
               }
             }
           </button>
        </th>
        <th class="py-3 px-4 text-left">
           <button (click)="sortTable('color')" class="flex items-center space-x-1 hover:opacity-80">
             <span>Color Favorito</span>
             @if (sortColumnKey === 'color') {
               @if (sortDirection === 'asc') {
                 ${ascSvg}
               } @else if (sortDirection === 'desc') {
                 ${descSvg}
               }
             }
           </button>
        </th>
      </tr>
    </thead>
    <tbody>
       @for (row of sortedTableData; track row.id; let isEven = $even) {
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

  ngOnInit(): void {}
}
