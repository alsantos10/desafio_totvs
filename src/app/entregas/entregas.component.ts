import { AfterViewChecked, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTable, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { distinctUntilChanged } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Entrega } from './entregas.interface';
import { EntregasDataSource } from './entregas-datasource';

@Component({
  selector: 'app-entregas',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './entregas.component.html',
  styleUrl: './entregas.component.scss'
})
export class EntregasComponent implements OnInit, AfterViewChecked {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  @ViewChild(MatTable)
  table!: MatTable<Entrega>;

  @ViewChild(MatSelect)
  filtroStatus!: MatSelect;

  dataSource!: EntregasDataSource;
  displayedColumns = ['id', 'documento', 'motorista', 'origem', 'destino', 'status'];

  listaStatus: string[] = ['PENDENTE', 'ENTREGUE', 'INSUCESSO'];
  listaMororista: string[] = [];
  entregas: Entrega[] = [];

  formFilter: FormGroup;
  fStatus: FormControl;
  fMotorista: FormControl;

  constructor(private activatedRoute: ActivatedRoute, private fb: FormBuilder) {
    this.formFilter = this.fb.group({
      fStatus: '',
      fMotorista: ''
    });

    this.fMotorista = this.formFilter.get('fMotorista') as FormControl;
    this.fStatus = this.formFilter.get('fStatus') as FormControl;

    this.fMotorista.valueChanges.pipe(distinctUntilChanged()).subscribe(res => {
      this.filtrar(this.fStatus.value, res);
    });

    this.fStatus.valueChanges.pipe(distinctUntilChanged()).subscribe(res => {
      this.filtrar(res, this.fMotorista.value);
    });
  }
  
  ngAfterViewChecked(): void {
    if (this.dataSource && this.table) {
      this.dataSource.sort = this.sort!;
      this.dataSource.paginator = this.paginator!;
      this.table.dataSource = this.dataSource;
    }
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((response: any) => {
      this.entregas = response.entregas;
      this.loadList(this.entregas);
      this.loadListMotoristas();
    });
  }

  private loadList(entregas: Entrega[]) {
    this.dataSource = new EntregasDataSource(entregas);
  }

  private loadListMotoristas() {
    this.entregas.forEach(item => {
      if (!this.listaMororista.includes(item.motorista.nome)) {
        this.listaMororista.push(item.motorista.nome);
      }
    })
  }

  filtrar(status: string, motorista: string) {
    this.loadList(this.entregas);
    if (status && motorista) {
      this.loadList(this.entregas.filter(item => (item.status_entrega === status && item.motorista.nome === motorista)));
    }
    if (status && !motorista) {
      this.loadList(this.entregas.filter(item => item.status_entrega === status));
    }
    if (motorista && !status) {
      this.loadList(this.entregas.filter(item => item.motorista.nome === motorista));
    }
  }
}
