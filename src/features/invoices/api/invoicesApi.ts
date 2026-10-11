import api from '@/lib/axios';
import { invoices } from '@/data/mockData';

export const getInvoices = async () => {
  await api.get('/invoices');
  return invoices;
};
