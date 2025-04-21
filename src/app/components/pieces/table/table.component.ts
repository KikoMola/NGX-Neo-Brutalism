import { ChangeDetectionStrategy, Component, inject, type OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../../services/theme.service';
import { ComponentPreviewComponent } from '../../component-preview/component-preview.component';
import { CodeSnippetPreviewComponent } from '../../code-snippet-preview/code-snippet-preview.component';
import { BasicComponent } from './basic/basic.component';
import { StripedComponent } from './striped/striped.component';
import { BasicHoverComponent } from './basic-hover/basic-hover.component';
import { StripedHoverComponent } from './striped-hover/striped-hover.component';
import { StripedSelectionComponent } from './striped-selection/striped-selection.component';
import { ColumnSelectionComponent } from './column-selection/column-selection.component';
import { FilteredComponent } from './filtered/filtered.component';
import { ReorderableComponent } from './reorderable/reorderable.component';
import { RowOptionsComponent } from './row-options/row-options.component';
import { FullComponent } from './full/full.component';
// Define interface for table data rows
export interface TableRow {
  id: number;
  name: string;
  job: string;
  color: string;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BasicComponent,
    StripedComponent,
    BasicHoverComponent,
    StripedHoverComponent,
    StripedSelectionComponent,
    ColumnSelectionComponent,
    FilteredComponent,
    ReorderableComponent,
    RowOptionsComponent,
    FullComponent,
  ],
  templateUrl: './table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent  { 
}
