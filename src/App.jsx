import React, { useState } from 'react';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import Step4 from './components/Step4';
import Step5 from './components/Step5';
import Step6 from './components/Step6';
import Step7 from './components/Step7';
import './App.css';
import { Home, MapPin, Layers, Package, ListChecks, KeyRound, Calendar } from 'lucide-react';

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  
  // Handles all input types: text, checkbox, custom (multi-select)
  const handleChange = (e) => {
    if (e && e.target) {
      const { name, value, type, checked } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    } else if (e && e.name && e.value !== undefined) {
      if (e.remove) {
        setFormData((prev) => {
          const copy = { ...prev };
          delete copy[e.name];
          return copy;
        });
      } else {
        setFormData((prev) => ({
          ...prev,
          [e.name]: e.value,
        }));
      }
    }
  };

  const handleSubmit = () => {
    if (steps[currentStep].validate()) {
      console.log("formData", formData);
      alert("Form submitted successfully!\n" + JSON.stringify(formData, null, 2));
      // submit logic
    }
  };

  const steps = [
    {
      id: 1,
      title: "Unit Selection",
      component: <Step1 formData={formData} handleChange={handleChange} />,
      validate: () => true, // Replace with actual function
      getNextStep: () =>  1, 
      getPrevStep: () => null, // No previous step for the first step
    },
    {
      id: 2,
      title: "Property Information",
      component: <Step2 formData={formData} handleChange={handleChange} />,
      validate: () => true,
      getNextStep: () => 2,
      getPrevStep: () => 0,
    },
    {
      id: 3,
      title: "Service Type",
      component: <Step3 formData={formData} handleChange={handleChange} />,
      validate: () => true,
      getNextStep: (formData) => {
        if (formData.serviceType === 'a_la_carte') return 4;
        return 3;
      },
      getPrevStep: () => 1,
    },
    {
      id: 4,
      title: "Bundled Services",
      component: <Step4 formData={formData} handleChange={handleChange} />,
      validate: () => true,
      getNextStep: (formData) => {
        if (formData.serviceType !== 'a_la_carte') return 5;
        return 4;
      },
      getPrevStep: () => 2,
    },
    {
      id: 5,
      title: "A La Carte Menu",
      component: <Step5 formData={formData} handleChange={handleChange} />,
      validate: () => true,
      getNextStep: () => 5,
      getPrevStep: (formData) => {
        if (formData.serviceType === 'a_la_carte') return 2;
        return 3;
      },
    },
    {
      id: 6,
      title: "Property Access",
      component: <Step6 formData={formData} handleChange={handleChange} />,
      validate: () => true,
      getNextStep: () => 6,
      getPrevStep:  (formData) => {
        if (formData.serviceType === 'a_la_carte') return 4;
        return 3;
      },
    },
    {
      id: 7,
      title: "Schedule",
      component: <Step7 formData={formData} handleChange={handleChange} onNext={handleSubmit} />,
      validate: () => true,
      getNextStep: () => null,
      getPrevStep: () => 5,
    }
  ];

  const nextStep = () => {
    if (steps[currentStep].validate()) {
      const getNext = steps[currentStep].getNextStep;
      console.log("formData", formData);
      const next = getNext ? getNext(formData) : currentStep + 1;
      if (next !== null && next < steps.length) {
        setCurrentStep(next);
      }
    }
  };

  const prevStep = () => {
    const getPrev = steps[currentStep].getPrevStep;
    const prev = getPrev ? getPrev(formData) : currentStep - 1;
    if (prev !== null && prev >= 0) {
      setCurrentStep(prev);
    }
  };

  // Map step index to Lucide icon
  const stepIcons = [
    <Home className="w-5 h-5" />, // Unit Selection
    <MapPin className="w-5 h-5" />, // Property Information
    <Layers className="w-5 h-5" />, // Service Type
    <Package className="w-5 h-5" />, // Bundled Services
    <ListChecks className="w-5 h-5" />, // A La Carte Menu
    <KeyRound className="w-5 h-5" />, // Property Access
    <Calendar className="w-5 h-5" />  // Schedule
  ];

  return (
    <div className="bg-main flex min-h-screen">
      {/* Sidebar Progress Tracker (desktop) */}
      <aside className="hidden md:flex flex-col items-center py-10 px-4 bg-white shadow-lg min-w-[180px] sticky top-0 h-screen z-30">
        <h2 className="text-lg font-bold text-primary mb-8 tracking-wide">Order Progress</h2>
        <ol className="flex flex-col gap-6 w-full">
          {steps.map((step, idx) => (
            <li key={step.id} className="flex items-center gap-3 w-full">
              <div className={`flex items-center justify-center rounded-full border-2 font-bold transition-all duration-300
                ${idx === currentStep ? 'bg-primary text-white border-primary scale-110 shadow-lg' : idx < currentStep ? 'bg-primary text-white border-primary' : 'bg-gray-200 text-gray-400 border-gray-200'}
              `}
                style={{ width: 36, height: 36 }}
              >
                {stepIcons[idx]}
              </div>
              <span className={`font-semibold text-sm truncate ${idx === currentStep ? 'text-primary' : 'text-gray-500'}`}>{step.title}</span>
            </li>
          ))}
        </ol>
        <div className="mt-auto text-xs text-gray-400 font-medium pt-8">Step {currentStep + 1} of {steps.length}</div>
      </aside>
      {/* Main Content + Mobile Progress Bar */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Progress Bar */}
        <div className="md:hidden sticky top-0 z-30 bg-main pb-2 pt-2" style={{ boxShadow: '0 2px 8px 0 rgba(0,0,0,0.03)' }}>
          <div className="flex items-center justify-between w-full max-w-2xl mx-auto px-2">
            {steps.map((step, idx) => (
              <div key={step.id} className="flex flex-col items-center flex-1 min-w-0">
                <div className={`flex items-center justify-center rounded-full border-2 font-bold transition-all duration-300
                  ${idx === currentStep ? 'bg-primary text-white border-primary scale-110 shadow-lg' : idx < currentStep ? 'bg-primary text-white border-primary' : 'bg-gray-200 text-gray-400 border-gray-200'}
                `}
                  style={{ width: 28, height: 28 }}
                >
                  {stepIcons[idx]}
                </div>
              </div>
            ))}
          </div>
          {/* Active step name and number */}
          <div className="flex items-center justify-center gap-2 mt-2 text-xs font-semibold text-primary">
            <span className="bg-secondary px-2 py-1 rounded-full shadow text-primary font-bold">
              {steps[currentStep].title}
            </span>
            <span className="text-gray-500 font-medium">Step {currentStep + 1} of {steps.length}</span>
          </div>
        </div>
        <div className="bg-card rounded-lg shadow-lg p-4 md:p-10 max-w-3xl mx-auto mt-4 md:mt-10">
          <h1 className="text-3xl font-bold text-center mb-8 text-primary font-sans tracking-tight leading-tight">Let’s Get Your Property Order Started</h1>
          {/* Step Content */}
          <form>
            {steps[currentStep].component && currentStep !== steps.length - 1
              ? steps[currentStep].component
              : null}
            {currentStep === steps.length - 1 && (
              <Step7
                formData={formData}
                handleChange={handleChange}
                onNext={handleSubmit}
                onPrev={prevStep}
                currentStep={currentStep}
                stepsLength={steps.length}
              />
            )}
          </form>
          {/* Sticky Navigation Buttons for all steps except last */}
          {currentStep !== steps.length - 1 && (
            <div className="sticky bottom-0 left-0 w-full bg-white/90 backdrop-blur z-20 shadow-[0_-2px_8px_0_rgba(0,0,0,0.04)] flex justify-between items-center px-4 py-3 mt-4 border-t">
              <button
                type="button"
                className={`px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 focus:outline-none font-semibold transition-all duration-200 ${currentStep === 0 ? "invisible" : ""}`}
                onClick={prevStep}
              >
                Previous
              </button>
              {currentStep < steps.length - 1 ? (
                <button
                  type="button"
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 focus:outline-none font-semibold transition-all duration-200"
                  onClick={nextStep}
                >
                  Next
                </button>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
