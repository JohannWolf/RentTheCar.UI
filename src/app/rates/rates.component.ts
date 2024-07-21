import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormBuilder,FormGroup, ReactiveFormsModule } from '@angular/forms'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AddRatesModalComponent } from './add-rates-modal/add-rates-modal.component';
import { EditRateModalComponent } from './edit-rates-modal/edit-rates-modal.component';

@Component({
  selector: 'app-rates',
  standalone: true,
  imports: [    
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule],
  templateUrl: './rates.component.html',
  styleUrl: './rates.component.css',
  encapsulation: ViewEncapsulation.None
})
export class RatesComponent {
  searchForm: FormGroup;
  rates = [{
    name : "testName",
    vehicleClass : "testClass",
    startDate : "01/01/2024",
    endDate : "01/04/2024"
  }
  ]; // This should be replaced with actual data source

  constructor(private fb: FormBuilder, private dialog: MatDialog) {
    this.searchForm = this.fb.group({
      name: [''],
      vehicleClass: [''],
      startDate: [''],
      endDate: ['']
    });
  }

  onSearch() {
    // Implement search logic here
  }

  openAddRateDialog() {
    const dialogRef = this.dialog.open(AddRatesModalComponent, { panelClass: 'custom-title-padding' });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle the result
      }
    });
  }

  openEditRateDialog(rate: any) {
    const dialogRef = this.dialog.open(EditRateModalComponent, {
      data: { rate }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle the result
      }
    });
  }
}
