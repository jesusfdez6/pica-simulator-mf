import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';



@NgModule({
  exports: [
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatTableModule,
    
    // Agrega otros módulos de Angular Material que quieras usar
  ],

})
export class MaterialModule {}