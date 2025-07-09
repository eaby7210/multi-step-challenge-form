import React, { useState } from 'react';
import { Home, Users, KeyRound, Smartphone, UserCheck, Key, Landmark, Hash } from 'lucide-react';

const ACCESS_OPTIONS = [
  {
    key: 'lock_box',
    label: 'Lock Box',
    icon: <KeyRound className="w-6 h-6 text-primary mr-2" />, 
    prompt: [
      { name: 'lock_box_code', label: 'Lock Box Code', type: 'text', placeholder: 'Enter code' },
      { name: 'lock_box_location', label: 'Location/Directions', type: 'text', placeholder: 'Describe location or directions' }
    ]
  },
  {
    key: 'app_lock_box',
    label: 'App-enabled Lock Box',
    icon: <Smartphone className="w-6 h-6 text-primary mr-2" />, 
    prompt: []
  },
  {
    key: 'meet_contact',
    label: 'Meet Contact On-site',
    icon: <UserCheck className="w-6 h-6 text-primary mr-2" />, 
    prompt: [
      { name: 'contact_first_name', label: 'Contact First Name', type: 'text', placeholder: 'First name' },
      { name: 'contact_last_name', label: 'Contact Last Name', type: 'text', placeholder: 'Last name' },
      { 
        name: 'contact_phone_type', 
        label: 'Phone Type', 
        type: 'select', 
        options: [
          { value: '', label: 'Select type', disable:true },
          { value: 'mobile', label: 'Mobile' },
          { value: 'landline', label: 'Landline' }
        ]
      },
      { name: 'contact_phone', label: 'Contact Phone', type: 'tel', placeholder: 'Phone number' },
      // { name: 'contact_email', label: 'Contact Email', type: 'email', placeholder: 'Email address' }
    ]
  },
  {
    key: 'hidden_key',
    label: 'Hidden Key',
    icon: <Key className="w-6 h-6 text-primary mr-2" />, 
    prompt: [
      { name: 'hidden_key_directions', label: 'Directions', type: 'text', placeholder: 'Where is the key hidden?' }
    ]
  },
  {
    key: 'community_access',
    label: 'Community Access',
    icon: <Landmark className="w-6 h-6 text-primary mr-2" />, 
    prompt: [
      { name: 'community_access_instructions', label: 'Instructions', type: 'text', placeholder: 'Gate code, guard, etc.' }
    ]
  },
  {
    key: 'door_code',
    label: 'Door Code',
    icon: <Hash className="w-6 h-6 text-primary mr-2" />, 
    prompt: [
      { name: 'door_code_value', label: 'Door Code', type: 'text', placeholder: 'Enter door code' }
    ]
  }
];

const Step6 = ({ formData, handleChange, onPrev, onNext }) => {
  const [validationErrors, setValidationErrors] = useState({});
  const [hasAttemptedNext, setHasAttemptedNext] = useState(false);

  // Helper to check if an access option is selected
  const isAccessSelected = (key) => !!formData[`access_${key}`];

  const validateForm = () => {
  const errors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex for email validation

  // Validate occupancy status
  if (!formData.occupancy_status || !['vacant', 'occupied'].includes(formData.occupancy_status)) {
    errors.occupancy_status = "Occupancy status is required";
  }

  ACCESS_OPTIONS.forEach(option => {
    if (isAccessSelected(option.key)) {
      option.prompt.forEach(field => {
        if (option.key === 'meet_contact' && field.name === 'contact_email') {
          if ((formData[field.name] && field.type === 'email' )&& !emailRegex.test(formData[field.name])) {
            errors[field.name] = `${field.label} must be a valid email address`;
          }
          return; // Skip validation for email in "Meet Contact On-site"
        }
        if (!formData[field.name]?.trim()) {
          errors[field.name] = `${field.label} is required`;
        }
        else if (field.type === 'email' && !emailRegex.test(formData[field.name])) {
          errors[field.name] = `${field.label} must be a valid email address`;
        }
      });
    }
  });

  return errors;
};

  const handleNextAction = () => {
    setHasAttemptedNext(true);
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      onNext();
    } else {
      setValidationErrors(errors);
    }
  };

  return (
    <>
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center flex items-center justify-center gap-2">
        <KeyRound className="w-6 h-6 text-primary" />
        How will our BootzForce™ Rep access the property?
      </h2>
      {/* Occupancy Status */}
      <div className="mb-10 flex flex-col items-center">
        <div className="flex items-center gap-2 mb-3">
          <Users className="w-6 h-6 text-primary" />
          <span className="text-lg font-semibold text-gray-900">Occupancy Status</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
          <label
            className={`flex-1 flex flex-col items-center justify-center cursor-pointer px-6 py-6 rounded-xl border-2 transition-all text-center shadow-sm
              ${formData.occupancy_status === 'vacant' ? 'border-primary ring-2 ring-primary label-active-gradient text-inverse' : 'border-gray-200 hover:border-primary hover:label-active-gradient hover:text-inverse'}`}
          >
            <input
              type="radio"
              name="occupancy_status"
              value="vacant"
              checked={formData.occupancy_status === 'vacant'}
              onChange={handleChange}
              className="hidden"
            />
            <Home className={`w-6 h-6 mb-2 ${formData.occupancy_status === 'vacant' ? 'text-inverse' : 'text-primary'}`} />
            <span className="font-medium text-lg">Vacant</span>
          </label>
          <label
            className={`flex-1 flex flex-col items-center justify-center cursor-pointer px-6 py-6 rounded-xl border-2 transition-all text-center shadow-sm
              ${formData.occupancy_status === 'occupied' ? 'border-primary ring-2 ring-primary label-active-gradient text-inverse' : 'border-gray-200 hover:border-primary hover:label-active-gradient hover:text-inverse'}`}
          >
            <input
              type="radio"
              name="occupancy_status"
              value="occupied"
              checked={formData.occupancy_status === 'occupied'}
              onChange={handleChange}
              className="hidden"
            />
            <Users className={`w-6 h-6 mb-2 ${formData.occupancy_status === 'occupied' ? 'text-inverse' : 'text-primary'}`} />
            <span className="font-medium text-lg">Occupied</span>
          </label>
        </div>
           {hasAttemptedNext && validationErrors.occupancy_status && (
  <div className="text-red-500 text-sm mt-2 text-center">{validationErrors.occupancy_status}</div>
)}
      </div>
      {/* Access Options */}
      <div className="mb-4">
        <div className="font-semibold text-gray-900 mb-3 text-center flex items-center justify-center gap-2">
          <KeyRound className="w-6 h-6 text-primary" />
          Access Options (Select all that apply):
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start justify-center w-full">
          {ACCESS_OPTIONS.map(option => (
            <div key={option.key} className="w-full max-w-md">
              <label
                className={`flex-1 flex flex-col items-center justify-center cursor-pointer px-6 py-6 rounded-xl border-2 transition-all text-center shadow-sm
                  ${isAccessSelected(option.key) ? 'border-primary ring-2 ring-primary label-active-gradient text-inverse' : 'border-gray-200 hover:border-primary hover:label-active-gradient hover:text-inverse'}`}
              >
                <input
                  type="checkbox"
                  name={`access_${option.key}`}
                  checked={isAccessSelected(option.key)}
                  onChange={handleChange}
                  className="hidden"
                />
                {React.cloneElement(option.icon, {
                  className: `w-6 h-6 mb-2 ${isAccessSelected(option.key) ? 'text-inverse' : 'text-primary'}`
                })}
                <span className="font-medium text-lg">{option.label}</span>
              </label>
              {/* Prompts for additional info if selected */}
              {isAccessSelected(option.key) && option.prompt.length > 0 && (
                <div className="mt-2 ml-8 flex flex-col gap-2">
                  {option.prompt.map(field => (
                  <div key={field.name} className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                    {field.type === 'select' ? (
                      <select
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        className={`border rounded p-2 focus:ring-2 focus:ring-primary focus:border-primary ${
                          hasAttemptedNext && validationErrors[field.name] ? 'border-red-500' : ''
                        }`}
                        // Disable if any option is marked as disable
                      >
                        {field.options.map(opt => (
                          <option key={opt.value} value={opt.value} disabled={opt.disable}>{opt.label}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        className={`border rounded p-2 focus:ring-2 focus:ring-primary focus:border-primary ${
                          hasAttemptedNext && validationErrors[field.name] ? 'border-red-500' : ''
                        }`}
                      />
                    )}
                    {hasAttemptedNext && validationErrors[field.name] && (
                      <span className="text-red-500 text-sm mt-1">{validationErrors[field.name]}</span>
                    )}
                  </div>
                ))}
                </div>
              )}
            </div>
          ))}
  
        </div>
      </div>
    </div>
      <div className="sticky bottom-0 left-0 w-full bg-white/90 backdrop-blur z-20 shadow-[0_-2px_8px_0_rgba(0,0,0,0.04)] px-4 py-3 mt-4 border-t">
   
<div className='flex flex-col md:flex-row justify-between items-center'>
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
                    onClick={handleNextAction}
                  >
                    Next
                  </button>
                </div>
              </div>
    </>
  );
};

export default Step6;
