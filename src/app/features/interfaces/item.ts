export interface Item{
  key?:string;
  name: string;
  price: string;
  sold: boolean;

  paidOut?: TypePaidOut;
  valuePaid?: number;
  type?: TypeSold;
  url?: string;
  date?: string;
  customer?:string;
}
export enum TypeSold{
  A_VISTA='A_VISTA',
  PARCELADO='PARCELADO',
}
export enum TypePaidOut{
  PAGO='PAGO',
  NAO_PAGO='NAO_PAGO',
  PARCIAL='PARCIAL'
}

export const typeValues ={
  A_VISTA: 'A Vista',
  PARCELADO: 'Parcelado',
}
