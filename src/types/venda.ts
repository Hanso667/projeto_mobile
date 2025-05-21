type Venda = {
    venda_id: string;
    cliente_id: string;
    valor_total: number;
}

type Carro_venda = {
    carro_id: string;
    venda_id: string;
    quantidae: number;
    valor: number;
}


export type { Venda, Carro_venda };