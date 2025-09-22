import React, { useState, useRef } from "react";
import ModalWrapper from "./components/ModalWrapper";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";
import Step4 from "./components/Step4";
import Step5 from "./components/Step5";
import OrderConfig from "./components/OrderConfig";
import Step6 from "./components/Step6";
import Step7 from "./components/Step7";
import AlaCartePage from "./components/AlaCartePage";
import "./App.css";
import {
  Home,
  MapPin,
  Layers,
  Package,
  ListChecks,
  KeyRound,
  Calendar,
} from "lucide-react";
import logoBlack from "./assets/logo_color_black.png";
import ToS from "./components/ToS";
import api from "./apis/interceptors/axios";
import Success from "./components/Success";
import Cancel from "./components/Cancel";
import useGetApi from "./apis/hooks/useGetApi";
import ErrorPage from "./components/Error";
import LoadingOverlay from "./components/Spinner";

export default function App() {

  const searchParams = new URLSearchParams(window.location.search);
  const status = searchParams.get("status");
  const session_id = searchParams.get("session_id");
  const company_id = searchParams.get("company_id");
  const user_id = searchParams.get("user_id")
    ? searchParams.get("user_id")
    : searchParams.get("client_id");
  const [currentStep, setCurrentStep] = useState(0);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showFraudModal, setShowFraudModal] = useState(false);
  const [pgloading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ company_id, user_id });
const handleChange = (e) => {
  // Initialize nextFormData as a copy of current formData
  let nextFormData = { ...formData };

  if (e && e.target) {
    // Case 1: Standard input event
    const { name, value, type, checked } = e.target;
    nextFormData[name] = type === "checkbox" ? checked : value;
  } else if (e) {
    // Case 2: Manual update
    if (e.remove) {
      const copy = { ...nextFormData };
      delete copy[e.name];
      nextFormData = copy;
    } else if (e.replaceFormData) {
      nextFormData = e.value;
    } else if (e.name && e.value !== undefined) {
      nextFormData[e.name] = e.value;
    }
    // else keep nextFormData as is
  }

  setFormData(nextFormData);

  // Return updated data for immediate use
  return nextFormData;
};



  const handleSubmit = () => {
    setShowTermsModal(true);
  };
  const nextStep = (type = null) => {
    if (steps[currentStep].validate()) {
      // Mark current step as validated
      setValidatedSteps((prev) => {
        const updated = [...prev];
        updated[currentStep] = true;
        return updated;
      });

      const getNext = steps[currentStep].getNextStep;
      const next = getNext ? getNext(formData, type) : currentStep + 1;

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
  const steps = [
    {
      id: 1,
      title: "Unit Selection",
      heading: "Let’s Get Your Property Order Started",
      component: (
        <Step1
          formData={formData}
          handleChange={handleChange}
          onNext={nextStep}
          onPrev={prevStep}
        />
      ),
      validate: () => true, // Replace with actual function
      getNextStep: () => 1,
      getPrevStep: () => null, // No previous step for the first step
    },
    {
      id: 2,
      title: "Property Information",
      heading: "Enter Your Property Address",
      component: (
        <Step2
          formData={formData}
          handleChange={handleChange}
          onNext={nextStep}
          onPrev={prevStep}
        />
      ),
      validate: () => true,
      getNextStep: () => 2,
      getPrevStep: () => 0,
    },
    {
      id: 3,
      title: "Bundle Services",
      heading: "Configure Property Services",
      component: (
        <OrderConfig
          formData={formData}
          handleChange={handleChange}
          onNext={nextStep}
          onPrev={prevStep}
        />
      ),
      validate: () => true,
      getNextStep: (formData, type) => {
        console.log(`From next set ${formData.serviceType} ${type}`);
        if (formData.serviceType === "a_la_carte" || type === "a_la_carte")
          return 3;
        return 4;
      },
      getPrevStep: () => 1,
    },
    {
      id: 4,
      title: "Individual Services",
      heading: "Configure Property Services",
      component: (
        <AlaCartePage
          formData={formData}
          handleChange={handleChange}
          onNext={nextStep}
          onPrev={prevStep}
        />
      ),
      validate: () => {
        return true;
      },
      getNextStep: (formData) => {
        console.log(formData);
        return 4;
      },
      getPrevStep: () => 2,
    },
    {
      id: 6,
      title: "Property Access",
      heading: "Let’s Get Your Property Order Started",
      component: (
        <Step6
          formData={formData}
          handleChange={handleChange}
          onNext={nextStep}
          onPrev={prevStep}
        />
      ),
      validate: () => true,
      getNextStep: () => 5,
      getPrevStep: (/*formData*/) => {
        if (formData.serviceType === "a_la_carte") return 3;
        return 2;
      },
    },
    {
      id: 7,
      title: "Schedule",
      heading: "Let’s Get Your Property Order Started",
      component: (
        <Step7
          formData={formData}
          handleChange={handleChange}
          onNext={handleSubmit}
          onPrev={prevStep}
        />
      ),
      validate: () => true,
      getNextStep: () => null,
      getPrevStep: () => 4,
    },
  ];
  const [validatedSteps, setValidatedSteps] = useState(
    Array(steps.length).fill(false)
  );
  const termsRef = useRef(null);
  const getapiBool = !(status && session_id);
  const { data, loading, error } = useGetApi(
    "notary-view/?company_id=" + company_id + "&user_id=" + user_id,
    {
      company_id,
      user_id,
    },
    false,
    getapiBool
  );

  // console.log("data" + data);

  // if (
  //   error
  //   //  && (company_id && user_id)
  //   ){
  //   const errMsg =error?.response?.data?.message
  //   return <ErrorPage message={
  //     errMsg ? errMsg:error} code={error?.status}/>
  // }
  if (status === "success") {
    return <Success session_id={session_id} />;
  } else if (status === "cancel") {
    return <Cancel />;
  }

  // Map step index to Lucide icon
  const stepIcons = [
    <Home className="w-5 h-5" />, // Unit Selection
    <MapPin className="w-5 h-5" />, // Property Information
    // <Layers className="w-5 h-5" />, // Service Type
    <Package className="w-5 h-5" />, // Bundled Services
    <ListChecks className="w-5 h-5" />, // A La Carte Menu
    <KeyRound className="w-5 h-5" />, // Property Access
    <Calendar className="w-5 h-5" />, // Schedule
  ];

  // Terms of Service Modal
  const TermsModal = ({ setLoading }) => {
    // Accept button and tooltip are separated to avoid re-rendering the whole modal
    const AcceptButtonWithTooltip = React.memo(({ termsRef }) => {
      const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);

      const [checked, setChecked] = useState(false);
      const handleScroll = React.useCallback(
        (e) => {
          const { scrollTop, scrollHeight, clientHeight } = e.target;
          if (
            !hasScrolledToBottom &&
            scrollTop + clientHeight >= scrollHeight - 5
          ) {
            setHasScrolledToBottom(true);
          }
        },
        [hasScrolledToBottom]
      );
      React.useEffect(() => {
        const node = termsRef.current;
        if (!node) return;
        node.addEventListener("scroll", handleScroll);
        return () => node.removeEventListener("scroll", handleScroll);
      }, [termsRef, handleScroll]);
      // Reset checkbox if modal reopens
      React.useEffect(() => {
        setChecked(false);
      }, [hasScrolledToBottom]);
      const handleAccept = () => {
        if (hasScrolledToBottom && checked) {
          setShowTermsModal(false);
          setLoading(true);
          const submittedData = {
            ...formData,
            acceptedAt: new Date().toISOString(),
          };
          console.log(
            "Form submitted with data:",
            JSON.stringify(submittedData, null, 2)
          );

          // Submit logic here
          api
            .post("submit-order/", submittedData)
            .then((response) => {
              console.log(
                "Form submitted successfully!\n" +
                  JSON.stringify(response.data, null, 2)
              );
              window.location.href = response.data.stripe_checkout_url;
            })
            .catch((error) => {
              console.error("Error submitting form:", error);
              console.log("Failed to submit form. Please try again.");
            });
        }
      };
      const acceptEnabled = hasScrolledToBottom && checked;
      return (
        <div className="flex flex-col md:flex-row w-full items-center justify-around md:justify-between gap-3 mt-2">
          <div className="flex flex-col items-center">
            <label
              htmlFor="accept-tos"
              className={`text-sm select-none ${
                !hasScrolledToBottom ? "text-gray-400" : "text-main"
              }`}
            >
              <input
                type="checkbox"
                id="accept-tos"
                className="mr-2 accent-primary"
                disabled={!hasScrolledToBottom}
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
              />
              I accept the Terms of Service
            </label>
            {!acceptEnabled && (
              <span className="text-xs text-red-500 text-center">
                Please scroll to the bottom and accept the Terms of Service
              </span>
            )}
          </div>

          <button
            className={`px-4 py-2 font-semibold transition-all duration-200 ${
              acceptEnabled
                ? "bg-primary text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none"
            } w-full md:w-auto`}
            disabled={!acceptEnabled}
            tabIndex={0}
            onClick={handleAccept}
            type="button"
          >
            Submit
          </button>
        </div>
      );
    });
    // Modal body
    const handleClose = () => {
      setShowTermsModal(false);
    };
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div className="bg-white shadow-xl w-full max-w-[95%] sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl min-w-[300px] p-6 relative flex flex-col">
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
            {/* <div
  className="relative bg-cover bg-center bg-no-repeat pt-[8%] pb-8 sm:pb-12 lg:pb-[4%]"
  style={{
    backgroundImage:
      'linear-gradient(180deg, rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url("https://investorbootz.com/wp-content/uploads/2022/10/pexels-olha-ruskykh-7504782.jpg")',
  }}
> */}
            <div className="max-w-screen-xl mx-auto px-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[65px] lg:leading-[95px] text-center font-bold">
                Terms and <span className="text-primary">Conditions</span>
              </h1>
            </div>
            {/* </div> */}
          </div>
          <div
            ref={termsRef}
            className="overflow-y-auto border p-1 mb-6 h-85 text-sm text-main text-left"
            tabIndex={0}
          >
            <ToS />
          </div>
          <div className="flex flex-col-reverse md:flex-row justify-end gap-3 mt-2 w-full">
            <button
              className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 w-full md:w-auto"
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

  // Fraud Info Modal
  const FraudModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white shadow-xl w-full max-w-lg p-6 relative flex flex-col">
        <h2 className="text-2xl font-bold text-primary mb-4">
          The Moment Money or Property Changes Hands—You Need a Notary!
        </h2>
        <p className="mb-2 text-main text-sm">
          Whenever a document transfers ownership, access, or financial
          interest, notarization isn’t just a good idea—it’s often a legal
          requirement.
        </p>
        <p className="mb-2 text-main text-sm">
          We’re talking about documents like:
        </p>
        <ul className="list-disc pl-6 mb-2 text-main text-sm">
          <li>Deeds (Grant, Quitclaim, Warranty)</li>
          <li>Powers of Attorney (POA)</li>
          <li>Authorization to Sign Listing Docs (AIF)</li>
          <li>Promissory Notes</li>
          <li>Easements or Land Use Agreements</li>
          <li>Mortgages and Deeds of Trust</li>
        </ul>
        <p className="mb-4 text-main text-sm">
          These aren’t low-stakes forms. These are high-liability, high-value
          transactions—and courts, title companies, and financial institutions
          expect them to be notarized.
          <br />
          Skipping this step could invalidate your deal, delay funding, or
          worse—open the door for fraud that you can’t unwind.
        </p>
        <button
          className="px-4 py-2 bg-primary text-white font-semibold hover:bg-blue-700 w-full mt-2"
          onClick={() => setShowFraudModal(false)}
        >
          Close
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-main flex flex-col md:flex-row p-0 min-h-screen">
      {(loading || pgloading) && <LoadingOverlay />}
      {showTermsModal && <TermsModal setLoading={setLoading} />}
      {showFraudModal && <FraudModal />}
      {/* Sidebar Progress Tracker (desktop) */}
      <aside className="hidden md:flex flex-col items-start py-10 px-4 border-r border-r-[#dbe7f5] bg-white lg:min-w-[150px] xl:min-w-[200px] max-w-[250px] flex-grow">
        <img
          src={logoBlack}
          alt="InvestorBootz Logo"
          className="mb-8 w-36 h-auto"
        />
        <h2 className="text-lg font-bold text-primary mb-8 tracking-wide">
          Order Progress
        </h2>
        <ol className="flex flex-col gap-6 w-full">
          {steps.map((step, idx) => (
            <li
              key={step.id}
              className="flex items-center gap-3 w-full cursor-pointer"
              onClick={() => {
                if (validatedSteps[idx]) setCurrentStep(idx);
              }}
            >
              <div
                className={`flex items-center justify-center rounded-full border-2 font-bold transition-all duration-300
          ${
            idx === currentStep
              ? "bg-primary text-white border-primary scale-110"
              : idx < currentStep
              ? "bg-primary text-white border-primary"
              : "bg-gray-200 text-gray-400 border-gray-200"
          }
        `}
                style={{ width: 36, height: 36 }}
              >
                {stepIcons[idx]}
              </div>
              <span
                className={`font-semibold text-sm truncate y-2 ${
                  idx === currentStep ? "text-primary" : "text-gray-500"
                }`}
              >
                {step.title}
              </span>
            </li>
          ))}
        </ol>

        {/* Fraud Warning CTA */}

        <div className="sticky bottom-0 left-0 w-full mt-auto text-xs text-gray-400 font-medium pt-8 pb-3">
          <div className="w-full p-4 sm:p-6 mb-6 bg-[#99a1af] text-xs">
            <div className="flex flex-col gap-2 sm:gap-1">
              <span className="font-bold text-black flex items-center gap-2 text-xs ">
                <span role="img" aria-label="warning">
                  🚨
                </span>
                Real Estate Fraud Is Surging.
              </span>
              <span className="text-black">
                Here’s How to Stay Protected.&nbsp;
                <span
                  className="block sm:inline text-blue-700 underline font-semibold hover:text-blue-900 cursor-pointer mt-1 sm:mt-0"
                  onClick={() => setShowFraudModal(true)}
                  role="button"
                >
                  Learn More
                </span>
              </span>
            </div>
          </div>
          Step {currentStep + 1} of {steps.length}
        </div>
      </aside>
      {/* Main Content + Mobile Progress Bar */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Progress Bar */}
        <div
          className="md:hidden bg-main pb-2 pt-2"
          style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.03)" }}
        >
          <div className="flex flex-col items-center w-full max-w-2xl mx-auto px-2">
            <img
              src={logoBlack}
              alt="InvestorBootz Logo"
              className="mb-2 w-32 h-auto"
            />
          </div>
          <div className="sticky top-0 z-30 bg-main">
            <div className="flex items-center justify-between w-full">
              {steps.map((step, idx) => (
                <div
                  key={step.id}
                  className="flex flex-col items-center flex-1 min-w-0 cursor-pointer"
                  onClick={() => {
                    if (validatedSteps[idx]) setCurrentStep(idx);
                  }}
                >
                  <div
                    className={`flex items-center justify-center rounded-full border-2 font-bold transition-all duration-300
          ${
            idx === currentStep
              ? "bg-primary text-white border-primary scale-110"
              : idx < currentStep
              ? "bg-primary text-white border-primary"
              : "bg-gray-200 text-gray-400 border-gray-200"
          }
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
              <span
                className={`bg-secondary px-2 py-1 rounded-full shadow font-bold text-inverse`}
              >
                {steps[currentStep].title}
              </span>
              <span className="text-gray-500 font-medium">
                Step {currentStep + 1} of {steps.length}
              </span>
            </div>
            {/* Mobile Fraud Warning CTA */}
            <div className="w-full px-3 py-3 mb-4 mt-2 shadow-sm text-center bg-[#99a1af] text-xs flex flex-col gap-1">
              <span className="font-bold text-black mx-auto flex items-center gap-2 text-xs">
                <span role="img" aria-label="warning" className="">
                  🚨
                </span>
                Real Estate Fraud Is Surging.
              </span>
              <span className="text-black">
                Here’s How to Stay Protected.&nbsp;
                <span
                  className="inline text-blue-700 underline font-semibold hover:text-blue-900 cursor-pointer mt-1"
                  onClick={() => setShowFraudModal(true)}
                  role="button"
                >
                  Learn More
                </span>
              </span>
            </div>
          </div>
        </div>
        <div className="bg-card p-4 md:p-10 max-w-3xl mx-auto mt-4 md:mt-10 w-full md:w-auto flex-1 flex flex-col">
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8 text-primary font-sans tracking-tight leading-snug md:leading-tight">
            {steps[currentStep].heading}
          </h1>
          {/* Step Content */}
          <form className="flex-1 flex flex-col">
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
        </div>
      </div>
    </div>
  );
}
