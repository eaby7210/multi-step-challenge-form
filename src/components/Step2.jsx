import { MapPin, Building } from 'lucide-react';

const Step2 = ({ formData, handleChange }) => {
  return (
    <>
      <div className="mb-6">
        <label htmlFor="address" className="mb-2 text-sm font-medium text-main flex items-center gap-2">
          Address
        </label>
        <div className="relative">
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address || ''}
            onChange={handleChange}
            placeholder="Enter street address"
            className="bg-card border border-primary text-main text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 pl-10 transition-all duration-200 shadow-sm focus:shadow-md"
            required
          />
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary pointer-events-none" />
        </div>
      </div>
      <div className="mb-6">
        <label htmlFor="unit" className="mb-2 text-sm font-medium text-main flex items-center gap-2">
          Unit/Apt/Suite <span className="text-main text-xs opacity-60">(optional)</span>
        </label>
        <div className="relative">
          <input
            type="text"
            id="unit"
            name="unit"
            value={formData.unit || ''}
            onChange={handleChange}
            placeholder="e.g. Apt 2B, Suite 101"
            className="bg-card border border-primary text-main text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 pl-10 transition-all duration-200 shadow-sm focus:shadow-md"
          />
          <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary pointer-events-none" />
        </div>
      </div>
    </>
  );
};

export default Step2;
