import React from 'react';
import { Home, Users, KeyRound, Smartphone, UserCheck, Key, Landmark, Hash } from 'lucide-react';

const ACCESS_OPTIONS = [
  {
    key: 'lock_box',
    label: 'Lock Box',
    icon: <KeyRound className="w-5 h-5 text-primary mr-2" />, 
    prompt: [
      { name: 'lock_box_code', label: 'Lock Box Code', type: 'text', placeholder: 'Enter code' },
      { name: 'lock_box_location', label: 'Location/Directions', type: 'text', placeholder: 'Describe location or directions' }
    ]
  },
  {
    key: 'app_lock_box',
    label: 'App-enabled Lock Box',
    icon: <Smartphone className="w-5 h-5 text-primary mr-2" />, 
    prompt: []
  },
  {
    key: 'meet_contact',
    label: 'Meet Contact On-site',
    icon: <UserCheck className="w-5 h-5 text-primary mr-2" />, 
    prompt: [
      { name: 'contact_name', label: 'Contact Name', type: 'text', placeholder: 'Full name' },
      { name: 'contact_phone', label: 'Contact Phone', type: 'tel', placeholder: 'Phone number' },
      { name: 'contact_email', label: 'Contact Email', type: 'email', placeholder: 'Email address' }
    ]
  },
  {
    key: 'hidden_key',
    label: 'Hidden Key',
    icon: <Key className="w-5 h-5 text-primary mr-2" />, 
    prompt: [
      { name: 'hidden_key_directions', label: 'Directions', type: 'text', placeholder: 'Where is the key hidden?' }
    ]
  },
  {
    key: 'community_access',
    label: 'Community Access',
    icon: <Landmark className="w-5 h-5 text-primary mr-2" />, 
    prompt: [
      { name: 'community_access_instructions', label: 'Instructions', type: 'text', placeholder: 'Gate code, guard, etc.' }
    ]
  },
  {
    key: 'door_code',
    label: 'Door Code',
    icon: <Hash className="w-5 h-5 text-primary mr-2" />, 
    prompt: [
      { name: 'door_code_value', label: 'Door Code', type: 'text', placeholder: 'Enter door code' }
    ]
  }
];

const Step6 = ({ formData, handleChange }) => {
  // Helper to check if an access option is selected
  const isAccessSelected = (key) => !!formData[`access_${key}`];

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center flex items-center justify-center gap-2">
        <KeyRound className="w-7 h-7 text-primary" />
        How will our BootzForce™ Rep access the property?
      </h2>
      {/* Occupancy Status */}
      <div className="mb-10 flex flex-col items-center">
        <div className="flex items-center gap-2 mb-3">
          <Users className="w-5 h-5 text-primary" />
          <span className="text-lg font-semibold text-gray-900">Occupancy Status</span>
        </div>
        <div className="flex gap-6 justify-center w-full">
          <label className={`flex items-center gap-2 px-6 py-4 rounded-xl border-2 transition-all shadow-sm cursor-pointer bg-gray-50
            ${formData.occupancy_vacant ? 'border-primary ring-2 ring-primary bg-secondary' : 'border-gray-200 hover:border-primary hover:bg-secondary'}`}
          >
            <input
              type="checkbox"
              name="occupancy_vacant"
              checked={!!formData.occupancy_vacant}
              onChange={handleChange}
              className="accent-primary w-5 h-5"
            />
            <Home className="w-5 h-5 text-primary mr-1" />
            <span className="font-medium text-lg text-gray-900">Vacant</span>
          </label>
          <label className={`flex items-center gap-2 px-6 py-4 rounded-xl border-2 transition-all shadow-sm cursor-pointer bg-gray-50
            ${formData.occupancy_occupied ? 'border-primary ring-2 ring-primary bg-secondary' : 'border-gray-200 hover:border-primary hover:bg-secondary'}`}
          >
            <input
              type="checkbox"
              name="occupancy_occupied"
              checked={!!formData.occupancy_occupied}
              onChange={handleChange}
              className="accent-primary w-5 h-5"
            />
            <Users className="w-5 h-5 text-primary mr-1" />
            <span className="font-medium text-lg text-gray-900">Occupied</span>
          </label>
        </div>
      </div>
      {/* Access Options */}
      <div className="mb-4">
        <div className="font-semibold text-gray-900 mb-3 text-center flex items-center justify-center gap-2">
          <KeyRound className="w-5 h-5 text-primary" />
          Access Options (Select all that apply):
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start justify-center">
          {ACCESS_OPTIONS.map(option => (
            <div key={option.key} className="w-full max-w-md">
              <label className={`flex items-center gap-3 px-6 py-4 rounded-xl border-2 transition-all shadow-sm cursor-pointer bg-gray-50 w-full
                ${isAccessSelected(option.key) ? 'border-primary ring-2 ring-primary bg-secondary' : 'border-gray-200 hover:border-primary hover:bg-secondary'}`}
              >
                <input
                  type="checkbox"
                  name={`access_${option.key}`}
                  checked={isAccessSelected(option.key)}
                  onChange={handleChange}
                  className="accent-primary w-5 h-5"
                />
                {option.icon}
                <span className="font-medium text-lg text-gray-900">{option.label}</span>
              </label>
              {/* Prompts for additional info if selected */}
              {isAccessSelected(option.key) && option.prompt.length > 0 && (
                <div className="mt-2 ml-8 flex flex-col gap-2">
                  {option.prompt.map(field => (
                    <div key={field.name} className="flex flex-col">
                      <label className="text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        className="border rounded p-2 focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Step6;
