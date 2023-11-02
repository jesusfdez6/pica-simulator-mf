import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SimulatorService } from '../services/simulator.service';
//import { MatSelectChange } from '@angular/material/select';
import { AuthService } from '../services/auth.service';

import { navigate } from "utility-router";


@Component({
  selector: 'app-simulador',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.css']
})
export class SimulatorComponent implements OnInit {
  simulator!: FormGroup;
  plazoOptions: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  month: number = 0

  mostrarInformacion: boolean = false;
  responseSimulator: any = {}
  loanTotal: number = 0;
  displayedColumns: string[] = ['feeNumber', 'paymentToCapital', 'feeInterest', 'feeWithoutInsurance', 'debtBalance'];
  selectedYear: number = 1;
  itemsPerPage = 12;

  constructor(private formBuilder: FormBuilder, private simulatorService: SimulatorService, private authService: AuthService) { }

  ngOnInit() {
    this.simulator = this.formBuilder.group({
      loanTotal: [null, Validators.required],
      termUnit: [1, Validators.required],
      term: ["Year"],
      simulationGuid: ["58229058359258"],
    });

    this.auth();
  }

  auth() {
    this.authService.auth().subscribe(
      {
        next: (response) => {

          localStorage.setItem('token', response.access_token);

        },

        error: (err: any) => { },
        complete: () => { }
      })

  }

  onSubmit() {
    if (this.simulator.valid) {
      const formData = this.simulator.value;
      console.log(formData);
      this.loanTotal = formData.loanTotal;
      this.simulatorService.send(formData).subscribe(
        {
          next: (response) => {
            console.log(response);
            this.mostrarInformacion = true;
            this.responseSimulator = response;
          },

          error: (err: any) => { },
          complete: () => { }
        })


    }
  }

  getAvailableYears(): number[] {
    return Array.from({ length: this.responseSimulator.plan.termUnit }, (_, i) => i + 1);
  }

  get filteredPlanDetail(): any[] {
    const startIndex = (this.selectedYear - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.responseSimulator.plan.planDetail.slice(startIndex, endIndex);
  }

  changeYear(event: any) {
    const selectedValue = event.value;
    if (selectedValue !== null) {
      this.selectedYear = +selectedValue;
    }
  }


  volver() {

    const path: string = ``;
    navigate(path);

  }




}