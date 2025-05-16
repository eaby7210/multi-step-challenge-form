import React, { useState, useEffect } from 'react';
import { Home, HomeIcon, HelpCircle,Building2 } from 'lucide-react';

const Step1 = ({ formData, handleChange }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  // Ensure default is set in formData
  useEffect(() => {
    if (!formData.unitType) {
      handleChange({ name: 'unitType', value: 'single' });
    }
  }, [formData.unitType, handleChange]);

  return (
    <>
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">How many units need inspections?</h2>
        <div className="flex gap-6 justify-center">
          {/* Single Unit Option */}
          <label
            htmlFor="unit-single"
            className={`flex flex-col items-center justify-center cursor-pointer px-8 py-6 rounded-xl border-2 transition-all text-center shadow-sm text-gray-900 bg-gray-50
              ${formData.unitType !== 'multiple' ? 'border-primary ring-2 ring-primary bg-secondary' : 'border-gray-200 hover:border-primary hover:bg-secondary'}`}
          >
            <input
              id="unit-single"
              type="radio"
              name="unitType"
              value="single"
              checked={formData.unitType !== 'multiple'}
              onChange={handleChange}
              className="hidden"
            />
            <HomeIcon className="w-8 h-8 mb-2 text-primary" />
            <span className="font-medium text-lg">Single Unit</span>
          </label>

          {/* Multiple Units Option */}
          <div className="relative">
            <label
              htmlFor="unit-multiple"
              className={`flex flex-col items-center justify-center cursor-pointer px-8 py-6 rounded-xl border-2 transition-all text-center shadow-sm text-gray-900 bg-gray-50
                ${formData.unitType === 'multiple' ? 'border-primary ring-2 ring-primary bg-secondary' : 'border-gray-200 hover:border-primary hover:bg-secondary'}`}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <input
                id="unit-multiple"
                type="radio"
                name="unitType"
                value="multiple"
                checked={formData.unitType === 'multiple'}
                onChange={handleChange}
                className="hidden"
              />
              
              <Building2 className="w-8 h-8 mb-2 text-primary" />
              <span className="font-medium text-lg flex items-center gap-1">
                Multiple Units
                <HelpCircle className="w-5 h-5 text-primary inline-block" />
              </span>
            </label>
            {/* Tooltip */}
            {showTooltip && (
              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg p-3 text-sm text-gray-700 z-10">
                Have multiple properties in the same neighborhood? <br />
                <span className="font-semibold">Receive a reduced rate if we schedule them all on the same day.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Step1;
