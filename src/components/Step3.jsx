import { useEffect } from 'react';
import { Package, ListChecks } from 'lucide-react';

const Step3 = ({ formData, handleChange, onNext, onPrev }) => {
  useEffect(() => {
    if (!formData.serviceType) {
      handleChange({ name: 'serviceType', value: 'bundled' });
    }
  }, [formData.serviceType, handleChange]);
  function cleanFormData(formData) {


  if (formData.serviceType === "bundled") {
    // Remove all keys starting with a_la_carte
    Object.keys(formData).forEach(key => {
      if (key.startsWith("a_la_carte")) {
        delete formData[key];
      }
    });
  } else if (formData.serviceType === "a_la_carte") {
    // Remove bundleGroup and bundleItem
    delete formData.bundleGroup;
    delete formData.bundleItem;
    delete formData.bundlePrice;
  }

  console.log("Cleaned formData:", formData);
}

function handleValidation() {
  
 cleanFormData(formData);

  onNext()
  // Perform any additional validation logic here
}
  
  return (
    <>
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-main mb-6 text-center">Service Type Selection</h2>
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          {/* Bundled Services Option */}
          <label
            htmlFor="service-bundled"
            className={`flex flex-col items-center justify-center cursor-pointer px-6 py-4 md:px-8 md:py-6 rounded-xl border-2 transition-all text-center shadow-sm w-full md:w-auto
              ${formData.serviceType !== 'a_la_carte' ? 'border-primary ring-2 ring-primary label-active-gradient text-inverse' : 'border-gray-200 hover:border-primary hover:label-active-gradient hover:text-inverse'}`}
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
            <Package className={`w-8 h-8 mb-2 ${formData.serviceType !== 'a_la_carte' ? 'text-inverse' : 'text-primary'}`} />
            <span className="font-medium text-lg">Bundled Services</span>
          </label>

          {/* A La Carte Services Option */}
          <label
            htmlFor="service-a-la-carte"
            className={`flex flex-col items-center justify-center cursor-pointer px-6 py-4 md:px-8 md:py-6 rounded-xl border-2 transition-all text-center shadow-sm w-full md:w-auto
              ${formData.serviceType === 'a_la_carte' ? 'border-primary ring-2 ring-primary label-active-gradient text-inverse' : 'border-gray-200 hover:border-primary hover:label-active-gradient hover:text-inverse'}`}
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
            <ListChecks className={`w-8 h-8 mb-2 ${formData.serviceType === 'a_la_carte' ? 'text-inverse' : 'text-primary'}`} />
            <span className="font-medium text-lg">A La Carte Services</span>
          </label>
        </div>
      </div>
      <div className="sticky bottom-0 left-0 w-full bg-white/90 backdrop-blur z-20 shadow-[0_-2px_8px_0_rgba(0,0,0,0.04)] flex flex-col md:flex-row justify-between items-center px-4 py-3 mt-4 border-t">
                <button
                  type="button"
                  className={`w-full md:w-auto px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 focus:outline-none font-semibold transition-all duration-200`}
                  onClick={onPrev}
                >
                  Previous
                </button>
               
                  <button
                    type="button"
                    className={
                      "w-full md:w-auto mt-2 md:mt-0 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 focus:outline-none font-semibold transition-all duration-200 "
                    }
                    onClick={handleValidation}
                  >
                    Next
                  </button>
                
              </div>
    </>
  );
};

export default Step3;
