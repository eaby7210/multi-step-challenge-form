import { useEffect } from 'react';
import { Package, ListChecks } from 'lucide-react';

const Step3 = ({ formData, handleChange }) => {
  useEffect(() => {
    if (!formData.serviceType) {
      handleChange({ name: 'serviceType', value: 'bundled' });
    }
  }, [formData.serviceType, handleChange]);

  return (
    <>
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">Service Type Selection</h2>
        <div className="flex gap-6 justify-center">
          {/* Bundled Services Option */}
          <label
            htmlFor="service-bundled"
            className={`flex flex-col items-center justify-center cursor-pointer px-8 py-6 rounded-xl border-2 transition-all text-center shadow-sm text-gray-900 bg-gray-50
              ${formData.serviceType !== 'a_la_carte' ? 'border-primary ring-2 ring-primary bg-secondary' : 'border-gray-200 hover:border-primary hover:bg-secondary'}`}
          >
            <input
              id="service-bundled"
              type="radio"
              name="serviceType"
              value="bundled"
              checked={formData.serviceType !== 'a_la_carte'}
              onChange={handleChange}
              className="hidden"
            />
            <Package className="w-8 h-8 mb-2 text-primary" />
            <span className="font-medium text-lg">Bundled Services</span>
          </label>

          {/* A La Carte Services Option */}
          <label
            htmlFor="service-a-la-carte"
            className={`flex flex-col items-center justify-center cursor-pointer px-8 py-6 rounded-xl border-2 transition-all text-center shadow-sm text-gray-900 bg-gray-50
              ${formData.serviceType === 'a_la_carte' ? 'border-primary ring-2 ring-primary bg-secondary' : 'border-gray-200 hover:border-primary hover:bg-secondary'}`}
          >
            <input
              id="service-a-la-carte"
              type="radio"
              name="serviceType"
              value="a_la_carte"
              checked={formData.serviceType === 'a_la_carte'}
              onChange={handleChange}
              className="hidden"
            />
            <ListChecks className="w-8 h-8 mb-2 text-primary" />
            <span className="font-medium text-lg">A La Carte Services</span>
          </label>
        </div>
      </div>
    </>
  );
};

export default Step3;
