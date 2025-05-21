type Carro = {
    carro_id: string;
    modelo: string;
    valor: number;
    marca: string;
    novo: boolean;
}

type Marca_Carro = {
    marca_id: string;
    marca: string;
}

export type { Carro, Marca_Carro };