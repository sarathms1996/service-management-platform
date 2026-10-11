export const getPaymentStatus = (amountPaid: number, total: number) => {
  if (amountPaid <= 0) return 'Unpaid';
  if (amountPaid >= total) return 'Paid';
  return 'Partially Paid';
};

export const getInvoiceStatusFromPayment = (amountPaid: number, total: number) =>
  getPaymentStatus(amountPaid, total);
