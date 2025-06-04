import React, { useState, useRef } from 'react';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import Step4 from './components/Step4';
import Step5 from './components/Step5';
import Step6 from './components/Step6';
import Step7 from './components/Step7';
import './App.css';
import { Home, MapPin, Layers, Package, ListChecks, KeyRound, Calendar } from 'lucide-react';
import logoBlack from './assets/logo_color_black.png';
import ToS from './components/ToS';

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [showTermsModal, setShowTermsModal] = useState(false);
  const termsRef = useRef(null);
  
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
    setShowTermsModal(true);
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
      validate: () => {
        const selectedGroup = formData.bundleGroup;
        const selectedItem = formData.bundleItem;
        return !!selectedGroup && !!selectedItem;
      },
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

  // Terms of Service Modal
  const TermsModal = () => {
    // Accept button and tooltip are separated to avoid re-rendering the whole modal
    const AcceptButtonWithTooltip = React.memo(({ termsRef }) => {
      const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
      const [showTooltip, setShowTooltip] = useState(false);
      const [checked, setChecked] = useState(false);
      const handleScroll = React.useCallback((e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.target;
        if (!hasScrolledToBottom && scrollTop + clientHeight >= scrollHeight - 5) {
          setHasScrolledToBottom(true);
        }
      }, [hasScrolledToBottom]);
      React.useEffect(() => {
        const node = termsRef.current;
        if (!node) return;
        node.addEventListener('scroll', handleScroll);
        return () => node.removeEventListener('scroll', handleScroll);
      }, [termsRef, handleScroll]);
      // Reset checkbox if modal reopens
      React.useEffect(() => { setChecked(false); }, [hasScrolledToBottom]);
      const handleAccept = () => {
        if (hasScrolledToBottom && checked) {
          setShowTermsModal(false);
          setShowTooltip(false);
          const submittedData = { ...formData, acceptedAt: new Date().toISOString() };
          console.log("Form submitted with data:", JSON.stringify(submittedData, null, 2));
          alert("Form submitted successfully!\n" + JSON.stringify(submittedData, null, 2));
          // submit logic here if needed
        }
      };
      const acceptEnabled = hasScrolledToBottom && checked;
      return (
        <div className="flex w-full items-center justify-between gap-3 mt-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="accept-tos"
              className="mr-2 accent-primary"
              disabled={!hasScrolledToBottom}
              checked={checked}
              onChange={e => setChecked(e.target.checked)}
            />
            <label htmlFor="accept-tos" className={`text-sm select-none ${!hasScrolledToBottom ? 'text-gray-400' : 'text-main'}`}>I accept the Terms of Service</label>
          </div>
          <div className="flex gap-3">
            {/* <button
              className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300"
              onClick={() => setShowTermsModal(false)}
              type="button"
            >
              Cancel
            </button> */}
            <div className="relative group">
              <div
                onMouseEnter={() => { if (!acceptEnabled) setShowTooltip(true); }}
                onMouseLeave={() => setShowTooltip(false)}
                className="inline-block"
              >
                <button
                  className={`px-4 py-2 rounded font-semibold transition-all duration-200 ${acceptEnabled ? 'bg-primary text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none'}`}
                  disabled={!acceptEnabled}
                  tabIndex={0}
                  onClick={handleAccept}
                  type="button"
                >
                  Submit
                </button>
                {/* Tooltip for disabled Accept */}
                {!acceptEnabled && showTooltip && (
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap shadow-lg z-50">
                    Please read the Terms of Service and check the box.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    });
    // Modal body
    const handleClose = () => {
      setShowTermsModal(false);
    };
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 relative flex flex-col">
          <div className="w-full flex flex-wrap py-3 px-1 bg-gradient-to-b from-blue-white to-gray-200">
              
               <span className="hidden">Terms & Conditions</span>

  <span className="hidden">
    <span className="font-medium">
      <a
        href="https://investorbootz.com/author/vital/"
        title="Posts by JR Keene"
        rel="author"
        className="text-blue-600 hover:underline"
      >
        JR Keene
      </a>
    </span>
  </span>

  <span className="hidden">2025-01-09T20:06:59+00:00</span>

{/* Hero Section */}
<div
  className="relative bg-cover bg-center bg-no-repeat pt-[8%] pb-8 sm:pb-12 lg:pb-[4%]"
  style={{
    backgroundImage:
      'linear-gradient(180deg, rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url("https://investorbootz.com/wp-content/uploads/2022/10/pexels-olha-ruskykh-7504782.jpg")',
  }}
>
  <div className="max-w-screen-xl mx-auto px-4">
    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[65px] lg:leading-[95px] text-center font-bold">
      Terms and <span className="text-green-600">Conditions</span>
    </h1>
  </div>
</div>


            </div>
          <div
            ref={termsRef}
            className="overflow-y-auto border rounded p-1 mb-6 h-85 text-sm text-main text-left"
            tabIndex={0}
          >
            <ToS/>
          </div>
          <div className="flex justify-end gap-3 mt-2">
            <button
              className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300"
              onClick={handleClose}
            >
              Cancel
            </button>
            <AcceptButtonWithTooltip termsRef={termsRef} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-main flex min-h-screen">
      {showTermsModal && <TermsModal />}
      {/* Sidebar Progress Tracker (desktop) */}
      <aside className="hidden md:flex flex-col items-center py-10 px-4 bg-white shadow-lg min-w-[180px] h-screen z-30">
        <img src={logoBlack} alt="InvestorBootz Logo" className="mb-8 w-36 h-auto" />
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
        <div className="md:hidden bg-main pb-2 pt-2" style={{ boxShadow: '0 2px 8px 0 rgba(0,0,0,0.03)' }}>
          <div className="flex flex-col items-center w-full max-w-2xl mx-auto px-2">
            <img src={logoBlack} alt="InvestorBootz Logo" className="mb-2 w-32 h-auto" />
          </div>
          <div className="sticky top-0 z-30 bg-main">
            <div className="flex items-center justify-between w-full">
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
            <div className="flex items-center justify-center gap-2 mt-2 text-xs font-semibold">
              <span className={`bg-secondary px-2 py-1 rounded-full shadow font-bold text-inverse`}>
                {steps[currentStep].title}
              </span>
              <span className="text-gray-500 font-medium">Step {currentStep + 1} of {steps.length}</span>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg shadow-lg p-4 md:p-10 max-w-3xl mx-auto mt-4 md:mt-10 w-full md:w-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8 text-primary font-sans tracking-tight leading-snug md:leading-tight">
            Let’s Get Your Property Order Started
          </h1>
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
            <div className="sticky bottom-0 left-0 w-full bg-white/90 backdrop-blur z-20 shadow-[0_-2px_8px_0_rgba(0,0,0,0.04)] flex flex-col md:flex-row justify-between items-center px-4 py-3 mt-4 border-t">
              <button
                type="button"
                className={`w-full md:w-auto px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 focus:outline-none font-semibold transition-all duration-200 ${currentStep === 0 ? 'invisible' : ''}`}
                onClick={prevStep}
              >
                Previous
              </button>
              {currentStep < steps.length - 1 && (
                <button
                  type="button"
                  className="w-full md:w-auto mt-2 md:mt-0 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 focus:outline-none font-semibold transition-all duration-200"
                  onClick={nextStep}
                >
                  Next
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
