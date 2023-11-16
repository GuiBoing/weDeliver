export interface CupomItem {
    id: number,
    tagDeUso: string,
    nome: string,
    campanhaPertence: {
      nome: string,
      id: number
    },
    valorMinimoUso?: number,
    tipoDesconto: 'porcentagem' | 'fixo',
    valorDeDesconto: number,
    dataDeValidade: Date,
    dataCriacao:Date,
    produtosPertencentes?: {
      nome: string,
      id: number,
      valorTotal: number
    }[],
    totalLiberados?: number,
    quantidadeDisponivel?: number,
    quantidadeUsados?: number,
    criadoPorUsuario?: {
      nome: string,
      id: number
    },
    status: 'ativo' | 'desativado'
  };