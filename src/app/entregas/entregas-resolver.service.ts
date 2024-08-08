import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { catchError, of } from "rxjs";

import { EntregasService } from "./entregas.service";

@Injectable({
    providedIn: 'root'
})
export class EntregasResolverService implements Resolve<any> {

    constructor(private service: EntregasService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.service.getEntregas().pipe(
            catchError(error => of('Sem dados de Retorno', error))
        );
    }
}