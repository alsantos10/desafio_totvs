import { Component, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';

import { DashboardEntity } from './dashboard.class';
import { DashboardDetalheComponent } from './dashboard-detalhe/dashboard-detalhe.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: true,
  imports: [
    AsyncPipe,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    DashboardDetalheComponent
  ]
})
export class DashboardComponent {
  private breakpointObserver = inject(BreakpointObserver);

  dash: DashboardEntity | undefined;
  customHeight = '90vh';
  
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((response: any) => {
      this.dash = new DashboardEntity(response.entregas);
    });
  }

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Entregas por Motoristas', cols: 3, rows: 1 },
          { title: 'Entregas Insucesso', cols: 3, rows: 1 },
          { title: 'Entregas por Destino', cols: 3, rows: 1 }
        ];
      }

      return [
        { title: 'Entregas por Motoristas', cols: 1, rows: 1 },
        { title: 'Entregas Insucesso', cols: 1, rows: 1 },
        { title: 'Entregas por Destino', cols: 1, rows: 1 }
      ];
    })
  );
}
