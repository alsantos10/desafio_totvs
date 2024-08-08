import { Component, Input, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

import { DashboardEntity } from '../dashboard.class';

@Component({
  selector: 'app-dashboard-detalhe',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './dashboard-detalhe.component.html',
  styleUrl: './dashboard-detalhe.component.scss'
})
export class DashboardDetalheComponent implements OnInit {

  @Input()
  dash: DashboardEntity | undefined;
  dataSource: any;

  @Input()
  tipo = 1;

  displayedColumns: string[]  = ['motorist', 'totalParaEntregar', 'totalEntregue'];
  displayedColumns2: string[] = ['motorist', 'totalInsucesso'];
  displayedColumns3: string[] = ['bairro', 'totalEntregas', 'entregasRealizadas'];
  
  ngOnInit(): void {
    switch (this.tipo) {
      case 2: this.dataSource = this.dash?.dash2;
        this.displayedColumns = this.displayedColumns2;
        break; 
        case 3: this.dataSource = this.dash?.dash3;
        this.displayedColumns = this.displayedColumns3;
        break;
      default:
        this.dataSource = this.dash?.dash1;
    }
  }
}
