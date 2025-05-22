type Carro = {
    carro_id: string;
    modelo: string;
    valor: number;
    marca_id: string;
    marca: string;
}

type Marca = {
    marca_id: string;
    marca: string;
}

export type { Carro, Marca };