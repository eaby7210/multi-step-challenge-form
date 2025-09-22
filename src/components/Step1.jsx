import React, { useState, useEffect } from 'react';
import { Home, HomeIcon, HelpCircle, Building2 } from 'lucide-react';

const Step1 = ({ formData, handleChange, onNext, onPrev }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  // Ensure default is set in formData
  useEffect(() => {
    if (!formData.unitType) {
      handleChange({ name: 'unitType', value: 'single' });
    }
  }, [formData.unitType, handleChange]);

  return (
    <>
      <div className="mb-8 flex-1">
        {/* <h2 className="text-xl font-semibold text-main mb-6 text-center">How many units need inspections?</h2> */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center items-stretch w-full max-w-2xl mx-auto">
          {/* Single Unit Option */}
          <label
            htmlFor="unit-single"
            className={`flex-1 flex flex-col items-center justify-center cursor-pointer px-6 py-6 border-2 transition-all text-center shadow-sm
              ${formData.unitType !== 'multiple' ? 'border-primary ring-2 ring-primary label-active-gradient text-inverse' : 'border-gray-200 hover:border-primary hover:label-active-gradient hover:text-inverse'}`}
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
            <HomeIcon className={`w-8 h-8 mb-2 ${formData.unitType !== 'multiple' ? 'text-inverse' : 'text-primary'}`} />
            <span className="font-medium text-lg">Single Unit</span>
          </label>

          {/* Multiple Units Option */}
          <div className="relative flex-1">
            <label
              htmlFor="unit-multiple"
              className={`flex flex-col items-center justify-center cursor-pointer px-6 py-6  border-2 transition-all text-center shadow-sm
                ${formData.unitType === 'multiple' ? 'border-primary ring-2 ring-primary label-active-gradient text-inverse' : 'border-gray-200 hover:border-primary hover:label-active-gradient hover:text-inverse'}`}
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
              <Building2 className={`w-8 h-8 mb-2 ${formData.unitType === 'multiple' ? 'text-inverse' : 'text-primary'}`} />
              <span className="font-medium text-lg flex items-center gap-1">
                Multiple Units
                <HelpCircle className={`w-5 h-5 inline-block ${formData.unitType === 'multiple' ? 'text-inverse' : 'text-primary'}`} />
              </span>
            </label>
            {/* Tooltip */}
            {showTooltip && (
              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 max-w-xs bg-card border border-gray-300 rounded-lg shadow-lg p-3 text-sm text-main z-10">
                Have multiple properties in the same neighborhood? <br />
                <span className="font-semibold">Receive a reduced rate if we schedule them all on the same day.</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
       <div className="sticky bottom-0 left-0 w-full bg-white/90 backdrop-blur z-20 shadow-[0_-2px_8px_0_rgba(0,0,0,0.04)] flex flex-col md:flex-row justify-between items-center px-4 py-3 mt-4 border-t">
                <button
                  type="button"
                  className={`w-full md:w-auto invisible px-4 py-2 bg-gray-300 text-gray-800  hover:bg-gray-400 focus:outline-none font-semibold transition-all duration-200`}
                  onClick={onPrev}
                >
                  Previous
                </button>
               
                  <button
                    type="button"
                    className={
                      "w-full md:w-auto mt-2 md:mt-0 px-4 py-2 bg-primary text-white hover:bg-blue-700 focus:outline-none font-semibold transition-all duration-200 "
                    }
                    onClick={onNext}
                  >
                    Next
                  </button>
                
              </div>
    </>
  );
};

export default Step1;
