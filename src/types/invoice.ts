export interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  taxRate: number;
}

export interface Invoice {
  id: string;
  customerId: string;
  serviceRequestId: string;
  branchId: string;
  issueDate: string;
  dueDate: string;
  status: 'Draft' | 'Sent' | 'Paid' | 'Partially Paid' | 'Overdue';
  items: InvoiceLineItem[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  amountPaid: number;
}
