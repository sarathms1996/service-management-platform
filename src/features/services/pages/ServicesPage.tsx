import { services } from '@/data/mockData';
import { formatCurrency } from '@/lib/utilities';

export function ServicesPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Services</h2>
          <p className="text-slate-600">Catalog of service offerings</p>
        </div>
        <button className="btn-primary">Add Service</button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {services.map((service) => (
          <div key={service.id} className="card">
            <h3 className="font-semibold">{service.name}</h3>
            <p className="mt-2 text-sm text-slate-600">{service.description}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-900">From {formatCurrency(service.basePrice)}</span>
              <span className="text-xs uppercase tracking-wide text-slate-500">{service.category}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
