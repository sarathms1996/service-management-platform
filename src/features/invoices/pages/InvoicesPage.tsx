import { useMemo, useState } from 'react';
import { invoices as seedInvoices, customers, serviceRequests, services } from '@/data/mockData';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { getPaymentStatus } from '@/lib/paymentUtils';
import { formatCurrency } from '@/lib/utilities';
import type { Invoice } from '@/types/invoice';

export function InvoicesPage() {
  const [rows, setRows] = useState<Invoice[]>(seedInvoices);

  const invoiceRows = useMemo(
    () => rows.map((invoice) => ({ ...invoice, paymentStatus: getPaymentStatus(invoice.amountPaid, invoice.total) })),
    [rows],
  );

  const handleRecordPayment = (invoiceId: string, value: number) => {
    setRows((current) =>
      current.map((invoice) => {
        if (invoice.id !== invoiceId) return invoice;

        const nextPaid = Math.min(Math.max(value, 0), invoice.total);
        const nextStatus = nextPaid === 0 ? 'Draft' : nextPaid >= invoice.total ? 'Paid' : 'Partially Paid';

        return { ...invoice, amountPaid: nextPaid, status: nextStatus };
      }),
    );
  };

  const handleCreateInvoice = () => {
    const service = services[0];
    const nextInvoice: Invoice = {
      id: `inv-${Date.now()}`,
      customerId: 'c-1',
      serviceRequestId: serviceRequests[0]?.id ?? 'r-1',
      branchId: 'b-1',
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'Draft',
      items: [{
        id: `li-${Date.now()}`,
        description: service.name,
        quantity: 1,
        unitPrice: service.basePrice,
        discount: 0,
        taxRate: 8,
      }],
      subtotal: service.basePrice,
      discount: 0,
      tax: Number((service.basePrice * 0.08).toFixed(2)),
      total: Number((service.basePrice * 1.08).toFixed(2)),
      amountPaid: 0,
    };

    setRows((current) => [nextInvoice, ...current]);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Invoices</h2>
          <p className="text-slate-600">Billing and payment tracking</p>
        </div>
        <button className="btn-primary" onClick={handleCreateInvoice}>Generate Invoice</button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {invoiceRows.map((invoice) => (
          <div key={invoice.id} className="card">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-semibold">{invoice.id}</h3>
              <StatusBadge label={invoice.paymentStatus} tone={invoice.paymentStatus === 'Paid' ? 'success' : invoice.paymentStatus === 'Partially Paid' ? 'warning' : 'danger'} />
            </div>
            <p className="mt-2 text-sm text-slate-600">Customer: {customers.find((customer) => customer.id === invoice.customerId)?.name}</p>
            <p className="text-sm text-slate-600">Balance: {formatCurrency(invoice.total)} • Paid: {formatCurrency(invoice.amountPaid)}</p>
            <input
              type="number"
              min={0}
              max={invoice.total}
              value={invoice.amountPaid}
              onChange={(event) => handleRecordPayment(invoice.id, Number(event.target.value))}
              className="mt-3 w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </div>
        ))}
      </div>

      <div className="card overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left text-slate-600">
              <th className="px-3 py-3">Invoice</th>
              <th className="px-3 py-3">Customer</th>
              <th className="px-3 py-3">Amount</th>
              <th className="px-3 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {invoiceRows.map((invoice) => (
              <tr key={invoice.id} className="border-b border-slate-100">
                <td className="px-3 py-3">{invoice.id}</td>
                <td className="px-3 py-3">{customers.find((customer) => customer.id === invoice.customerId)?.name}</td>
                <td className="px-3 py-3">{formatCurrency(invoice.total)}</td>
                <td className="px-3 py-3"><StatusBadge label={invoice.paymentStatus} tone={invoice.paymentStatus === 'Paid' ? 'success' : invoice.paymentStatus === 'Partially Paid' ? 'warning' : 'danger'} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
