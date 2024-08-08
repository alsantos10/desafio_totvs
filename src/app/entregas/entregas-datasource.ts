import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of, merge } from 'rxjs';

import { Entrega } from './entregas.interface';

/**
 * Data source for the ListaEntregas view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class EntregasDataSource extends DataSource<Entrega> {
  data: Entrega[] | undefined;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;
  filter: string | undefined;

  constructor(lista: Entrega[]) {
    super();
    this.data = lista;
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Entrega[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(of(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          if (this.data) {
            return this.getPagedData(this.getSortedData([...this.data ]));
          }
          return this.getPagedData([]);
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Entrega[]): Entrega[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Método que organiza os dados de acordo com a coluna selecionada
   */
  private getSortedData(data: Entrega[]): Entrega[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'origem': return compare(a.cliente_origem.nome, b.cliente_origem.nome, isAsc);
        case 'destino': return compare(a.cliente_destino.nome, b.cliente_destino.nome, isAsc);
        case 'motorista': return compare(a.motorista.nome, b.motorista.nome, isAsc);
        case 'documento': return compare(a.documento, b.documento, isAsc);
        case 'status': return compare(a.status_entrega, b.status_entrega, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Método de comparação para ordenação */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
