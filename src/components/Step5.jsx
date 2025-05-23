import React, { useState } from 'react';
import { HelpCircle, Plus, X, ChevronDown, ChevronUp } from 'lucide-react';

const A_LA_CARTE_ITEMS = [
  {
    key: 'photos',
    name: 'Exterior & Interior Photos',
    price: 165,
    description: 'Professional exterior and interior photos to showcase your property.'
  },
  {
    key: 'lockbox_same_day',
    name: 'Lock Box Setup (Same Day)',
    price: 120,
    description: 'Lock box setup with same-day service.'
  },
  {
    key: 'lockbox_48hr',
    name: 'Lock Box Setup (48-Hour Notice)',
    price: 100,
    description: 'Lock box setup with 48-hour advance notice.'
  },
  {
    key: 'doc_signed',
    name: 'Document Signed/Notarized with Same-Day Scans',
    price: 90,
    description: 'Get your documents signed or notarized and scanned the same day.'
  },
  {
    key: 'floor_plans',
    name: '2D Floor Plans',
    price: null,
    description: 'Professional 2D floor plans for your property.'
  },
  {
    key: 'showing',
    name: 'Property Showing (1 HR)',
    price: 70,
    description: 'One hour property showing. Add $35 per half hour after first hour.',
    prompt: 'Add $35 per half hour after first hour'
  },
  {
    key: 'walkthrough',
    name: 'Walk Through Video',
    price: 75,
    description: 'A walk-through video tour of your property.'
  },
  {
    key: 'maintenance',
    name: 'Home Maintenance, Repair & Preservation',
    price: null,
    description: 'Request home maintenance, repair, or preservation services.',
    prompt: 'Describe the request',
    inputType: 'textarea'
  },
  {
    key: 'letter_posting',
    name: 'Letter Posting',
    price: 70,
    description: 'Post letters at the property as needed.'
  },
  {
    key: 'wellness',
    name: 'Wellness Check',
    price: 70,
    description: 'A wellness check on the property.'
  },
  {
    key: 'mls_photography',
    name: 'Premium MLS Photography',
    price: null,
    description: 'Premium MLS-ready photography packages.',
    submenu: {
      options: [
        { label: '30 Photo Package', value: '30', price: 0 },
        { label: '50 Photo Package', value: '50', price: 50 }
      ],
      addOns: [
        { label: 'Aerial Photos', value: 'aerial', price: 40 },
        { label: 'Drone Videos', value: 'drone', price: 60 },
        { label: '3D Tours', value: '3d', price: 100 },
        { label: 'Twilight', value: 'twilight', price: 30 },
        { label: 'Staging', value: 'staging', price: 80 }
      ]
    }
  },
  {
    key: 'bandit_signs',
    name: 'Bandit Signage Placement',
    price: null,
    description: 'Place bandit signs at the property.',
    submenu: {
      options: [
        { label: '10 Signs', value: '10', price: 0 },
        { label: '15 Signs', value: '15', price: 25 },
        { label: '20 Signs', value: '20', price: 50 }
      ]
    }
  },
  {
    key: 'landview',
    name: 'LandView Photos',
    price: 130,
    description: 'Specialized LandView photography.'
  },
  {
    key: 'move_in_out',
    name: 'Move-In/Move-Out Photo Inspection',
    price: 165,
    description: 'Photo inspection for move-in or move-out.'
  },
  {
    key: 'doc_recording',
    name: 'Document Recording Service',
    price: 85,
    description: 'Service for recording documents.',
    submenu: {
      options: [
        { label: 'Recording Fee Required?', value: 'yes' },
        { label: 'No Recording Fee', value: 'no' }
      ],
      prompt: 'Enter Amount',
      inputType: 'number'
    }
  },
  {
    key: 'licensed_inspection',
    name: 'Licensed Home Inspection',
    price: null,
    description: 'Licensed home inspection. Choose type and price.',
    submenu: {
      options: [
        { label: 'Basic', value: 'basic', price: 250 },
        { label: 'Comprehensive', value: 'comprehensive', price: 350 },
        { label: 'Specialty', value: 'specialty', price: 450 }
      ]
    }
  }
];

const ADD_ONS = [
  { key: 'notarized_doc', label: 'One Document Signed/Notarized', price: 40 },
  { key: 'additional_doc', label: 'Each Additional Doc', price: 15 },
  { key: 'measurements', label: 'Measurements', price: 30 },
  { key: 'addon_floor_plan', label: '2D Floor Plan', price: 95 },
  { key: 'addon_walkthrough', label: 'Walk Through Video', price: 25 }
];

const Step5 = ({ formData = {}, handleChange }) => {
  const [modal, setModal] = useState(null); // { item, addOns, submenu, ... }
  const [submenuState, setSubmenuState] = useState({});
  const [addOnState, setAddOnState] = useState({});
  // const [hovered, setHovered] = useState(null);

  // Determine if an item is selected (exists in formData)
  const isSelected = (item) => !!formData[`a_la_carte_${item.key}`];

  // Open modal for item, prefill with formData if exists
  const openModal = (item) => {
    const saved = formData[`a_la_carte_${item.key}`] || {};
    setModal({ item });
    setSubmenuState(saved.submenu || {});
    setAddOnState(saved.addOns || {});
  };
  const closeModal = () => setModal(null);

  // Handle add-on selection
  const handleAddOnChange = (key, checked) => {
    setAddOnState((prev) => ({ ...prev, [key]: checked }));
  };

  // Handle submenu selection
  const handleSubmenuChange = (field, value) => {
    setSubmenuState((prev) => ({ ...prev, [field]: value }));
  };

  // Save selection to formData
  const handleSave = () => {
    if (!modal) return;
    const { item } = modal;
    let value = { ...item };
    if (Object.keys(submenuState).length) value.submenu = { ...submenuState };
    if (Object.keys(addOnState).length) value.addOns = { ...addOnState };
    handleChange({ name: `a_la_carte_${item.key}`, value });
    closeModal();
  };

  // Remove selection from formData
  const handleRemove = (item) => {
    handleChange({ name: `a_la_carte_${item.key}`, value: null, remove: true });
    if (modal && modal.item && modal.item.key === item.key) {
      setModal(null);
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-main mb-4 text-center">A La Carte Menu</h2>
      <div className="flex flex-col gap-2 items-center w-full max-w-2xl mx-auto">
        {A_LA_CARTE_ITEMS.map((item) => {
          const selected = isSelected(item);
          return (
            <div
              key={item.key}
              className={`relative bg-card border rounded-md p-2 flex flex-col w-full min-h-[70px] max-w-xl shadow-sm hover:shadow-md transition-all cursor-pointer group
                ${selected ? 'border-primary ring-1 ring-primary label-active-gradient text-inverse' : 'border-gray-200 text-main'}`}
              style={{ minHeight: '70px', height: 'auto', justifyContent: 'space-between', overflow: 'visible', maxWidth: '100%', flex: '1 1 auto' }}
              onClick={() => openModal(item)}
              tabIndex={0}
              role="button"
            >
              
              <div className="flex items-center w-full justify-between mb-1 overflow-auto">
                <span className={`font-medium text-sm flex items-center  max-w-[60%] ${selected ? 'text-inverse' : 'text-main'}`} >
                {item.name}
                <HelpCircle className={`w-3 h-3 ml-1 shrink-0 ${selected ? 'text-inverse' : 'text-primary'}`} />
              </span>
                {item.price && (
                  <span className={`text-base font-semibold ml-2 whitespace-nowrap ${selected ? 'text-inverse' : 'text-primary'}`}>${item.price}</span>
                )}
                {selected && (
                  <span className="ml-2 text-green-600 font-bold shrink-0" title="Selected">
                    <svg width="16" height="16" fill="none" viewBox="0 0 20 20"><circle cx="10" cy="10" r="10" fill="#22c55e"/><path d="M6 10.5l2.5 2.5L14 8.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                )}
              </div>
              <div className={`text-xs mt-1 text-wrap ${selected ? 'text-inverse opacity-80' : 'text-main opacity-80'}`}>{item.description}</div>
              {item.prompt && <div className="text-xs text-main opacity-60 italic  w-full">{item.prompt}</div>}
              {selected && (
                <button
                  type="button"
                  className="mt-1 px-2 py-1 rounded bg-danger text-inverse text-xs font-semibold shadow hover:bg-danger-dark border-none z-20"
                  onClick={e => { e.stopPropagation(); e.preventDefault(); handleRemove(item); }}
                  tabIndex={0}
                >
                  Remove
                </button>
              )}
            </div>
          );
        })}
      </div>
      {/* Modal for add-ons and submenus */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(100,116,139,0.18)] backdrop-blur-md">
          <div className="bg-card rounded-lg shadow-2xl p-6 w-full max-w-lg relative">
            <button className="absolute top-3 right-3 text-main hover:text-primary" onClick={closeModal}><X className="w-6 h-6" /></button>
            <h3 className="text-lg font-bold mb-2 text-main">{modal.item.name}</h3>
            <div className="mb-2 text-main">{modal.item.description}</div>
            {/* Submenu logic */}
            {modal.item.submenu && (
              <div className="mb-4">
                {modal.item.submenu.options && (
                  <div className="mb-2">
                    <label className="block font-semibold mb-1 text-main">Choose an option:</label>
                    <select
                      className="w-full border border-primary rounded p-2 text-main"
                      value={submenuState.option || ''}
                      onChange={e => handleSubmenuChange('option', e.target.value)}
                    >
                      <option value="">Select...</option>
                      {modal.item.submenu.options.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}{opt.price ? ` (+$${opt.price})` : ''}</option>
                      ))}
                    </select>
                  </div>
                )}
                {modal.item.submenu.prompt && (
                  <div className="mb-2">
                    <label className="block font-semibold mb-1 text-main">{modal.item.submenu.prompt}</label>
                    <input
                      type={modal.item.submenu.inputType || 'text'}
                      className="w-full border border-primary rounded p-2 text-main"
                      value={submenuState.amount || ''}
                      onChange={e => handleSubmenuChange('amount', e.target.value)}
                    />
                  </div>
                )}
              </div>
            )}
            {/* Special textarea for maintenance */}
            {modal.item.inputType === 'textarea' && (
              <div className="mb-4">
                <label className="block font-semibold mb-1 text-main">Describe the request:</label>
                <textarea
                  className="w-full border border-primary rounded p-2 text-main"
                  rows={3}
                  value={submenuState.maintenance_desc || ''}
                  onChange={e => handleSubmenuChange('maintenance_desc', e.target.value)}
                />
              </div>
            )}
            {/* Add-ons */}
            <div className="mb-4">
              <div className="font-semibold mb-1 text-main">Need an add-on?</div>
              <div className="flex flex-wrap gap-3">
                {ADD_ONS.map(addon => (
                  <label key={addon.key} className="flex items-center gap-2 cursor-pointer border border-primary rounded px-3 py-1 bg-card hover:label-active-gradient hover:text-inverse">
                    <input
                      type="checkbox"
                      checked={!!addOnState[addon.key]}
                      onChange={e => handleAddOnChange(addon.key, e.target.checked)}
                    />
                    <span className="text-main">{addon.label} <span className="text-primary font-semibold">${addon.price}</span></span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button className="px-4 py-2 bg-secondary text-inverse rounded-lg hover:bg-primary hover:text-inverse" onClick={closeModal}>Cancel</button>
              <button className="px-4 py-2 bg-primary text-inverse rounded-lg hover:bg-cyan" onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step5;
