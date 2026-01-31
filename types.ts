
export interface CalculationRecord {
  id: string;
  timestamp: number;
  invoiceTotal: number;
  taxRate: number;
  discountRate: number;
  preTaxAmount: number;
  discountValue: number;
  finalAmount: number;
}

export enum AppTab {
  DISCOUNT = 'discount',
  CALCULATOR = 'calculator',
  TAFQEET = 'tafqeet'
}
