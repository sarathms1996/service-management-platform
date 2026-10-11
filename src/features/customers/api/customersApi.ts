import { customers } from '@/data/mockData';

export const getCustomers = async () => {
  return customers;
};

export const getCustomerById = async (id: string) => {
  return customers.find((customer) => customer.id === id) ?? customers[0];
};
