export enum StatusEntrega {
    'PENDENTE', 'ENTREGUE', 'INSUCESSO'
}

export interface Motorista {
    nome: string;
}

export interface Cliente {
    nome: string;
    endereco: string;
    bairro: string;
    cidade: string;
};

export interface Entrega {
    id: number;
    documento: string;
    motorista: Motorista;
    cliente_origem: Cliente;
    cliente_destino: Cliente;
    status_entrega: string;
}

export interface EntregasResponse {
    entregas: Array<Entrega>
}
