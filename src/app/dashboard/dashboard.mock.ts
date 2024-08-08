import { Entrega } from "../entregas/entregas.interface";

export const MOCK_ENTREGAS: Entrega[] = [
    {
        id: 1,
        documento: "01021",
        motorista: {
          nome: "Carlos Pereira"
        },
        cliente_origem: {
          nome: "Empresa ABC",
          endereco: "Rua dos Pinheiros, 789",
          bairro: "Jardins",
          cidade: "S\u00e3o Paulo"
        },
        cliente_destino: {
          nome: "Ana Clara",
          endereco: "Rua Vergueiro, 1234",
          bairro: "Liberdade",
          cidade: "S\u00e3o Paulo"
        },
        status_entrega: "ENTREGUE"
      },
      {
        id: 2,
        documento: "01022",
        motorista: {
          nome: "Carla Souza"
        },
        cliente_origem: {
          nome: "Empresa DEF",
          endereco: "Rua Augusta, 345",
          bairro: "Consola\u00e7\u00e3o",
          cidade: "S\u00e3o Paulo"
        },
        cliente_destino: {
          nome: "Pedro Lima",
          endereco: "Avenida Brasil, 1010",
          bairro: "Jardins",
          cidade: "S\u00e3o Paulo"
        },
        status_entrega: "PENDENTE"
      }
];