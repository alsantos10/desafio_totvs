import { Entrega } from "../entregas/entregas.interface";

export interface DashboardFirstEntity {
    motorist: string;
    totalEntregue: number;
    totalParaEntregar: number;
};

export interface DashboardSecondEntity {
    motorist: string;
    totalInsucesso: number;
};

export interface DashboardThirdEntity {
    bairro: string;
    totalEntregas: number;
    entregasRealizadas: number;
};

export class DashboardEntity {
    entregas: Entrega[] = [];

    dash1: DashboardFirstEntity[] = [];
    dash2: DashboardSecondEntity[] = [];
    dash3: DashboardThirdEntity[] = [];

    constructor(todasEntregas: Entrega[]) {
        this.entregas = todasEntregas;

        this.getDash1();
        this.getDash3();
    }

    getDash1() {
        const listaNomes: string[] = [];
        this.entregas.forEach(entrega => {
            if (!listaNomes.includes(entrega.motorista.nome)) {
                listaNomes.push(entrega.motorista.nome);
            }
        });

        listaNomes.forEach(nome => {
            const entregasMotorista = this.getEntregasDoMotorista(nome);
            this.dash1.push({
                motorist: nome,
                totalParaEntregar: entregasMotorista.length,
                totalEntregue: entregasMotorista.filter(item => item.status_entrega === 'ENTREGUE').length
            });
            
            this.dash2.push({
                motorist: nome,
                totalInsucesso: entregasMotorista.filter(item => item.status_entrega === 'INSUCESSO').length
            });
        });
    }

    private getDash3() {
        const listaBairros: string[] = [];
        this.entregas.forEach(entrega => {
            if (!listaBairros.includes(entrega.cliente_destino.bairro)) {
                listaBairros.push(entrega.cliente_destino.bairro);
            }
        });

        listaBairros.forEach(bairro => {
            const entregasBairro = this.getEntregasPorBairro(bairro);
            this.dash3.push({
                bairro: bairro,
                totalEntregas: entregasBairro.length,
                entregasRealizadas: entregasBairro.filter(item => item.status_entrega === 'ENTREGUE').length
            })
        })
    }

    private getEntregasPorBairro(bairro: string): Entrega[] {
        return this.entregas.filter(item => (item.cliente_destino.bairro === bairro))
    }

    private getEntregasDoMotorista(nomeMotorista: string): Entrega[] {
        return this.entregas.filter(item => item.motorista.nome === nomeMotorista);
    }
}