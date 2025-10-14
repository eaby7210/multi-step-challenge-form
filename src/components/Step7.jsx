import React,{useState} from 'react';
import {
      Calendar,
      Clock,
      User,
      Phone,
      Mail,
      Users,
      StickyNote,
      Tag,
      TicketPercent
       } from 'lucide-react';
import useGetApi from '../apis/hooks/useGetApi';
import LoadingOverlay from './Spinner';
import { isValidUSPhoneNumber, formatUSPhoneNumber } from '../lib/phoneUtils';


// import TextEditor from './TextEditor';



const Step7 = ({ formData, handleChange, onNext, onPrev, currentStep, stepsLength }) => {
  const isLastStep = currentStep === stepsLength - 1;
    const [errors, setErrors] = useState({});
    const [couponCode, setCouponCode] = useState('');
    
console.log('Step7 formData:', formData);

    const {data, loading, error,refetch } =useGetApi(
    "stripe-coupon/"+couponCode,
    {

    },false,false)
function populateContact() {
  
  if (handleChange) {
    handleChange({
      target: {
        name: 'contact_first_name_sched',
        value: formData.contact_first_name || '',
      },
    });
    handleChange({
      target: {
        name: 'contact_last_name_sched',
        value: formData.contact_last_name || '',
      },
    });
    handleChange({
      target: {
        name: 'contact_phone_sched',
        value: formData.contact_phone || '',
      },
    });
    handleChange({
      target: {
        name: 'contact_email_sched',
        value: formData.contact_email || '',
      },
    });
  }
}
const handleValidation = () => {
  
  const newErrors = {};

  // Preferred option is required
  if (!formData.preferred_option) {
    newErrors.preferred_option = "Please select a preferred date & time option.";
  }

  // If "specify" is selected, preferred_datetime is required
  if (formData.preferred_option === "specify" && !formData.preferred_datetime) {
    newErrors.preferred_datetime = "Please specify the date and time.";
  }

  // Point of Contact for Scheduling
  if (!formData.contact_first_name_sched || !formData.contact_first_name_sched.trim()) {
    newErrors.contact_first_name_sched = "First name is required.";
  }
  if (!formData.contact_last_name_sched || !formData.contact_last_name_sched.trim()) {
    newErrors.contact_last_name_sched = "Last name is required.";
  }
  if (!formData.contact_phone_type_sched){
    newErrors.contact_phone_type_sched = "Phone type is required"
  }
if (!formData.contact_phone_sched || !formData.contact_phone_sched.trim()) {
  newErrors.contact_phone_sched = "Phone number is required";
} else if (!isValidUSPhoneNumber(formData.contact_phone_sched)) {
  newErrors.contact_phone_sched = "Invalid phone number format.";
}

  // if (!formData.contact_email_sched || !formData.contact_email_sched.trim()) {
  //   newErrors.contact_email_sched = "Email address is required.";
  // } else if (
  //   formData.contact_email_sched &&
  //   !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contact_email_sched)
  // ) {
  //   newErrors.contact_email_sched = "Email address is invalid.";
  // }

  // Co-signer fields (only if cosigner is true)
  if (formData?.cosigner) {
    if (!formData.cosigner_first_name_sched || !formData.cosigner_first_name_sched.trim()) {
      newErrors.cosigner_first_name_sched = "Co-signer first name is required.";
    }
    if (!formData.cosigner_last_name_sched || !formData.cosigner_last_name_sched.trim()) {
      newErrors.cosigner_last_name_sched = "Co-signer last name is required.";
    }
    if (!formData.cosigner_phone_type_sched){
    newErrors.cosigner_phone_type_sched = "Phone type is required"
  }
    if (!formData.cosigner_phone_sched || !formData.cosigner_phone_sched.trim()) {
      newErrors.cosigner_phone_sched = "Co-signer phone number is required.";
    }
    // if (!formData.cosigner_email_sched || !formData.cosigner_email_sched.trim()) {
    //   newErrors.cosigner_email_sched = "Co-signer email address is required.";
    // } else if (
    //   formData.cosigner_email_sched &&
    //   !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.cosigner_email_sched)
    // ) {
    //   newErrors.cosigner_email_sched = "Co-signer email address is invalid.";
    // }
  }

  // Special instructions are optional, so no validation

  if (Object.keys(newErrors).length === 0) {
    setErrors({});
    onNext();
  } else {
    setErrors(newErrors);
  }
};

const handleCouponValidation = async () => {
  const updatedErrors = { ...errors };
  handleChange({ name: "coupon_code", value: null });

  try {
    const res = await refetch(); // Await actual coupon validation

    // Clear coupon_code error if previously set
    delete updatedErrors.coupon_code;

    // Apply coupon value via handleChange
    if (handleChange && couponCode) {
      handleChange({ name: "coupon_code", value: couponCode });
    }

    // Optionally show success message or feedback here
    console.log("Coupon data:", res?.data);
  } catch (err) {
    console.error("Coupon validation failed:", err);
    if (formData.coupon_code){
    handleChange({ name: "coupon_code", value: null });
    }
    // Add coupon error message without clearing other errors
    updatedErrors.coupon_code =
      err?.response?.data?.error || error ||err?.response?.data?.detail || err?.message || "Invalid coupon code";
  }

  setErrors(updatedErrors); // Set final error state
};


  return (
    <div className="mb-8">
  
      <h2 className="text-2xl font-bold text-main mb-8 text-center flex items-center justify-center gap-2">
        <Calendar className="w-7 h-7 text-primary" />
        Schedule Your Appointment
      </h2>
      <div className="mb-8 flex flex-col gap-6 items-center">
        {/* Preferred Date & Time */}
        <div className="w-full max-w-md">
          <label className="font-semibold mb-2 flex items-center gap-2 text-main">
            <Clock className="w-5 h-5 text-primary" />
            Preferred Date & Time
          </label>
          <div className="flex flex-col md:flex-row gap-4">
            {/* Radio Input for TBD */}
            <label
              className={`flex-1 flex flex-col items-center justify-center cursor-pointer px-6 py-6 border-2 transition-all text-center shadow-sm
                ${formData.preferred_option === 'tbd' ? 'border-primary ring-2 ring-primary label-active-gradient text-inverse' : 'border-gray-200 hover:border-primary hover:label-active-gradient hover:text-inverse'}`}
            >
              <input
                type="radio"
                name="preferred_option"
                value="tbd"
                checked={formData.preferred_option === 'tbd'}
                onChange={handleChange}
                className="hidden"
              />
              <Clock className={`w-6 h-6 mb-2 ${formData.preferred_option === 'tbd' ? 'text-inverse' : 'text-primary'}`} />
              <span className="font-medium text-lg">To Be Determined</span>
            </label>

            {/* Radio Input for Specify Date & Time */}
            <label
              className={`flex-1 flex flex-col items-center justify-center cursor-pointer px-6 py-6 border-2 transition-all text-center shadow-sm
                ${formData.preferred_option === 'specify' ? 'border-primary ring-2 ring-primary label-active-gradient text-inverse' : 'border-gray-200 hover:border-primary hover:label-active-gradient hover:text-inverse'}`}
            >
              <input
                type="radio"
                name="preferred_option"
                value="specify"
                checked={formData.preferred_option === 'specify'}
                onChange={handleChange}
                className="hidden"
              />
              <Calendar className={`w-6 h-6 mb-2 ${formData.preferred_option === 'specify' ? 'text-inverse' : 'text-primary'}`} />
              <span className="font-medium text-lg">Specify Date & Time</span>
            </label>
          </div>
          {errors.preferred_option && (
            <div className="text-red-500 text-sm mt-2 text-center">
              {errors.preferred_option}
            </div>
          )}

          {/* Date & Time Input Field */}
          {formData.preferred_option === 'specify' && (
            <>
            <div className="mt-4">
              <input
                type="datetime-local"
                name="preferred_datetime"
                value={formData.preferred_datetime || ''}
                onChange={handleChange}
                className="border border-primary rounded p-2 w-full focus:ring-2 focus:ring-primary focus:border-primary text-main"
              />
            </div>
            {errors.preferred_datetime && (
              <div className="text-red-500 text-sm mt-2 text-center">
                {errors.preferred_datetime} 
              </div>
            )}
            
            </>
          )}
        </div>

        {/* Point of Contact */}
        <div className="w-full max-w-md bg-card p-4 border border-primary flex flex-col gap-4 mt-4">
          
          <div className="font-semibold text-main mb-2 w-full flex items-center gap-2">
           <span><User className="w-5 h-5 text-primary" /></span>
            <span>Point of Contact for Scheduling Appointment</span>
            
           
          </div>
          {(formData?.contact_email || formData?.contact_name || formData?.contact_phone) &&
           (<a
              href="#"
              onClick={e => { e.preventDefault(); populateContact(); }}
              className="text-primary underline text-end self-end text-xs font-medium hover:text-cyan transition-colors duration-150 cursor-pointer"
            >
              Same as Contact on Site
            </a>)}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              <div className="flex flex-col md:flex-row w-full items-center gap-2">

                  <input
                    type="text"
                    name="contact_first_name_sched"
                    value={formData.contact_first_name_sched || ''}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="border border-primary rounded p-2 w-full md:w-1/2 focus:ring-2 focus:ring-primary focus:border-primary text-main"
                  />
                  <input
                    type="text"
                    name="contact_last_name_sched"
                    value={formData.contact_last_name_sched || ''}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="border border-primary rounded p-2 w-full md:w-1/2 focus:ring-2 focus:ring-primary focus:border-primary text-main"
                  />
                </div>
                
            </div>
           
            {(errors.contact_first_name_sched || errors.contact_last_name_sched) && (
                  <div className="text-red-500 text-sm">
                    Please provide both first and last names.
                    </div>
                )}
               
          
            {/* Phone Type Select */}
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary" />
              <select
                name="contact_phone_type_sched"
                value={formData.contact_phone_type_sched || ''}
                onChange={handleChange}
                className="border border-primary rounded p-2 w-full focus:ring-2 focus:ring-primary focus:border-primary text-main"
              >
                <option value="">Select Phone Type</option>
                <option value="mobile">Mobile</option>
                <option value="landline">Landline</option>
              </select>
            </div>
            {errors.contact_phone_type_sched && (
              <div className="text-red-500 text-sm text-center">
                {errors.contact_phone_type_sched}
              </div>
            )}


            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary" />
              <input
                type="tel"
                name="contact_phone_sched"
                value={formData.contact_phone_sched || ''}
                onChange={handleChange}
                placeholder="Phone Number"
                className="border border-primary rounded p-2 w-full focus:ring-2 focus:ring-primary focus:border-primary text-main"
              />
            </div>
            {errors.contact_phone_sched && (
              <div className="text-red-500 text-sm text-center">
                {errors.contact_phone_sched
                }
              </div>
            )}
            {/* <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" />
              <input
                type="email"
                name="contact_email_sched"
                value={formData.contact_email_sched || ''}
                onChange={handleChange}
                placeholder="Email Address"
                className="border border-primary rounded p-2 w-full focus:ring-2 focus:ring-primary focus:border-primary text-main"
              />
            </div>
            {errors.contact_email_sched && (
              <div className="text-red-500 text-sm text-center">
                {errors.contact_email_sched}
                </div>
            )} */}
            
          </div>

        {formData?.cosigner &&
          (<>
          <div className="font-semibold text-main my-2 flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            <span>Co-signer</span>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              <div className="flex flex-col md:flex-row w-full items-center gap-2">

                  <input
                    type="text"
                    name="cosigner_first_name_sched"
                    value={formData.cosigner_first_name_sched || ''}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="border border-primary rounded p-2 w-full md:w-1/2 focus:ring-2 focus:ring-primary focus:border-primary text-main"
                  />
                  <input
                    type="text"
                    name="cosigner_last_name_sched"
                    value={formData.cosigner_last_name_sched || ''}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="border border-primary rounded p-2 w-full md:w-1/2 focus:ring-2 focus:ring-primary focus:border-primary text-main"
                  />
                </div>
            </div>
            {(errors.cosigner_first_name_sched || errors.cosigner_last_name_sched) && (
              <div className="text-red-500 text-sm">
                Please provide both co-signer first and last names.
                </div>)}
            
            {/* Phone Type Select */}
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary" />
              <select
                name="cosigner_phone_type_sched"
                value={formData.cosigner_phone_type_sched || ''}
                onChange={handleChange}
                className="border border-primary rounded p-2 w-full focus:ring-2 focus:ring-primary focus:border-primary text-main"
              >
                <option value="">Select Phone Type</option>
                <option value="mobile">Mobile</option>
                <option value="landline">Landline</option>
              </select>
            </div>
            {errors.cosigner_phone_type_sched && (
              <div className="text-red-500 text-sm text-center">
                {errors.cosigner_phone_type_sched}
              </div>
            )}


            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary" />
              <input
                type="tel"
                name="cosigner_phone_sched"
                value={formData.cosigner_phone_sched || ''}
                onChange={handleChange}
                placeholder="Phone Number"
                className="border border-primary rounded p-2 w-full focus:ring-2 focus:ring-primary focus:border-primary text-main"
              />
            </div>
            {errors.cosigner_phone_sched && (
              <div className="text-red-500 text-sm text-center">
                {errors.cosigner_phone_sched}
              </div>
            )}
            {/* <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" />
              <input
                type="email"
                name="cosigner_email_sched"
                value={formData.cosigner_email_sched || ''}
                onChange={handleChange}
                placeholder="Email Address"
                className="border border-primary rounded p-2 w-full focus:ring-2 focus:ring-primary focus:border-primary text-main"
              />
            </div>
            {errors.cosigner_email_sched && (
              <div className="text-red-500 text-sm text-center">
                {errors.cosigner_email_sched}
                </div>
            )} */}
          </div>
          </>)
        }

          <div className="flex mt-2 items-start gap-2">
            <StickyNote className="w-4 h-4 text-primary mt-2" />
            <textarea
              name="special_instructions"
              value={formData.special_instructions || ''}
              onChange={handleChange}
              onInput={e => {
                e.target.style.height = 'auto';
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              placeholder="Special Instructions (optional)"
              className="border border-primary rounded p-2 w-full focus:ring-2 focus:ring-primary focus:border-primary text-main resize-none overflow-hidden"
              style={{ minHeight: '80px' }}
            />
          </div>


        </div>
           {/* Coupon Code Field */}
          {/* <div className="mt-4 w-full"> */}
  {/* <label className="font-semibold mb-2 flex items-center gap-2 text-main">
    <TicketPercent className="w-5 h-5 text-primary" />
    Coupon Code
  </label> */}

  {/* Show input + apply button if coupon is not applied
  {!formData.coupon_code ? (
    <div className="flex flex-col md:flex-row items-stretch gap-2">
      <input
        type="text"
        name="coupon_code"
        value={couponCode}
        onChange={(e) => setCouponCode(e.target.value)}
        placeholder="Enter coupon code (if any)"
        className="border border-primary rounded p-2 w-full focus:ring-2 focus:ring-primary focus:border-primary text-main"
      />
      <button
        type="button"
        className="px-4 py-2 bg-secondary text-inverse rounded-lg hover:bg-primary hover:text-inverse font-semibold transition-all duration-200"
        onClick={handleCouponValidation}
      >
        {loading ? (
          <span className="text-gray-700 font-medium">Loading...</span>
        ) : (
          'Apply'
        )}
      </button>
    </div>
  ) : (
    // Show applied message + remove option
    <div className="flex flex-col items-start gap-2">
      <div className="text-green-600 text-sm font-semibold">
        Applied Coupon: {formData.coupon_code}
        {data?.percent_off && ` — Discount: ${data.percent_off}%`}
      </div>
      <button
        type="button"
        onClick={() => {
          // Clear both local and form state
          setCouponCode('');
          handleChange({ name: 'coupon_code', value: null });
        }}
        className="text-red-600 text-sm underline hover:text-red-800"
      >
        Remove Coupon
      </button>
    </div>
  )} */}
{/* 
  Error message
  {errors.coupon_code && (
    <div className="text-red-500 text-sm text-center mt-1">
      {errors.coupon_code}
    </div>
  )}
</div> */}


      </div>
      <div className="flex justify-between mt-8 gap-2">
        <button
          type="button"
          className={`px-4 py-2 bg-secondary text-inverse hover:bg-primary hover:text-inverse focus:outline-none font-semibold transition-all duration-200 ${currentStep === 0 ? 'invisible' : ''}`}
          onClick={onPrev}
        >
          Previous
        </button>
        <button
          type="button"
          className="px-6 py-2 bg-primary text-inverse hover:bg-cyan focus:outline-none font-semibold text-lg shadow"
          onClick={handleValidation}
        >
          {isLastStep ? 'Submit' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default Step7;
