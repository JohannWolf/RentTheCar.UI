import { Component} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddVehicleModalComponent } from './add-vehicle-modal/add-vehicle-modal.component';
import { VehicleService } from '../services/inventory/import.export.service';
import { CommonModule } from '@angular/common';
import { FormBuilder,FormGroup, ReactiveFormsModule } from '@angular/forms'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [    
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,],
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
})

export class InventoryComponent {
  vehicles: any[] = [];
  errorMessage: string | null = null;
  searchForm: FormGroup;

  searchControls = [
    { name: 'vehicleNumber', label: 'Vehicle Number' },
    { name: 'licensePlates', label: 'License Plates' },
    { name: 'class', label: 'Class' },
    { name: 'type', label: 'Type' },
    { name: 'brand', label: 'Brand' },
    { name: 'model', label: 'Model' },
    { name: 'status', label: 'Status' },
    { name: 'owningLocation', label: 'Owning Location' },
    { name: 'currentLocation', label: 'Current Location' },
  ];

  constructor(private fb: FormBuilder, public dialog: MatDialog, private vehicleService: VehicleService) {
    this.searchForm = this.fb.group({
      vehicleNumber: [''],
      licensePlates: [''],
      class: [''],
      type: [''],
      brand: [''],
      model: [''],
      status: [''],
      owningLocation: [''],
      currentLocation: ['']
    });
  }

  onSearch() {
    const searchCriteria = this.searchForm.value;
    // Implement search logic here
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.vehicleService.importVehicles(file).subscribe({
        next: (response) => {
          alert(`${response} vehicles imported successfully.`);
          this.errorMessage = null;
        },
        error: (error) => {
          this.errorMessage = error;
          alert(error);
        }
      });
    }
  }

  openAddVehicleModal() {
    const dialogRef = this.dialog.open(AddVehicleModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.vehicles.push(result);
      }
    });
  }

  importVehicles(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.vehicleService.importVehicles(file).subscribe(data => {
        this.vehicles = data;
      });
    }
  }

  exportVehicles() {
    this.vehicleService.exportVehicles(this.vehicles);
  }
}