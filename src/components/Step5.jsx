import React, { useState } from 'react';
import { HelpCircle, Plus, X, ChevronDown, AlertTriangle } from 'lucide-react';

const NOTES = {
  cancellation: {
    symbol: '$',
    description: 'May include cancellation fee'
  },
  travel: {
    symbol: '🚗',
    description: 'May include travel fee'
  },
  TBD: {
    symbol: 'TBD',
    description: 'Pricing based on scope of work'
  }
};

const A_LA_CARTE_ITEMS = [
  {
    key: 'photos',
    name: 'Exterior & Interior Photos',
    price: 165,
    description: 'Professional exterior and interior photos to showcase your property.',
    notes: ['cancellation', 'travel']
  },
  {
    key: 'lockbox_same_day',
    name: 'Lock Box Setup (Same Day)',
    price: 120,
    description: 'Lock box setup with same-day service.',
    notes: ['cancellation', 'travel']
  },
  {
    key: 'lockbox_48hr',
    name: 'Lock Box Setup (48-Hour Notice)',
    price: 100,
    description: 'Lock box setup with 48-hour advance notice.',
    notes: ['travel']
  },
  {
    key: 'doc_signed',
    name: 'Document Signed/Notarized with Same-Day Scans',
    price: 90,
    description: 'Get your documents signed or notarized and scanned the same day.',
    notes: ['cancellation']
  },
  {
    key: 'floor_plans',
    name: '2D Floor Plans',
    price: 110,
    description: 'Professional 2D floor plans for your property.',
    notes: []
  },
  {
    key: 'showing',
    name: 'Property Showing (1 HR)',
    price: 70,
    description: 'One hour property showing. Add $35 per half hour after first hour.',
    prompt: 'Add $35 per half hour after first hour',
    notes: ['cancellation', 'travel']
  },
  {
    key: 'walkthrough',
    name: 'Walk Through Video',
    price: 75,
    description: 'A walk-through video tour of your property.',
    notes: ['cancellation', 'travel']
  },
  {
    key: 'maintenance',
    name: 'Home Maintenance, Repair & Preservation',
    price: null,
    description: 'Request home maintenance, repair, or preservation services.',
    submenu: {
      prompt: 'Describe the request',
      inputType: 'textarea'
    },
    notes: ['travel','TBD']
  },
  {
    key: 'letter_posting',
    name: 'Letter Posting',
    price: 70,
    description: 'Post letters at the property as needed.',
    notes: ['travel']
  },
  {
    key: 'wellness',
    name: 'Wellness Check',
    price: 70,
    description: 'A wellness check on the property.',
    notes: ['travel']
  },
  {
    key: 'mls_photography',
    name: 'Premium MLS Photography',
    price: 239,
    description: 'Premium MLS-ready photography packages.',
    submenu: {
      options: [
        { label: '30 Photo Package', value: '30', price: 0 },
        { label: '50 Photo Package', value: '50', price: 50 }
      ]
    },
    addOns: [
      { label: 'Aerial Photos', key: 'aerial', price: 40 },
      { label: 'Drone Videos', key: 'drone', price: 60 },
      { label: '3D Tours', key: '3d', price: 100 },
      { label: 'Twilight', key: 'twilight', price: 30 },
      { label: 'Staging', key: 'staging', price: 80 }
    ],
    notes: ['cancellation', 'travel']
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
    },
    notes: ['travel','TBD']
  },
  {
    key: 'landview',
    name: 'LandView Photos',
    price: 130,
    description: 'Specialized LandView photography.',
    notes: ['cancellation', 'travel']
  },
  {
    key: 'move_in_out',
    name: 'Move-In/Move-Out Photo Inspection',
    price: 165,
    description: 'Photo inspection for move-in or move-out.',
    notes: ['cancellation', 'travel']
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
    },
    notes: []
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
    },
    notes: ['cancellation', 'travel','TBD']
  }
];


const REDUCED_NAMES = {
  photos: 'Photos',
  lockbox_same_day: 'Lockbox(Same)',
  lockbox_48hr: 'Lockbox(48h)',
  doc_signed: 'Doc-Sign&Scan',
  floor_plans: '2D-Plans',
  showing: 'Showing(1hr)',
  walkthrough: 'Walkthrough',
  maintenance: 'Maintenance',
  letter_posting: 'Letter-Post',
  wellness: 'Wellness',
  mls_photography: 'MLS-Photos',
  bandit_signs: 'Bandit-Sign',
  landview: 'LandView',
  move_in_out: 'Move-In/Out_Pics',
  doc_recording: 'Doc-Rec',
  licensed_inspection: 'Inspection'
};

A_LA_CARTE_ITEMS.forEach(item => {
  const key = item.key;
  if (Object.prototype.hasOwnProperty.call(REDUCED_NAMES, key)) {
    item.reduced_name = REDUCED_NAMES[key];
  }
});
// console.log('A La Carte Items:', A_LA_CARTE_ITEMS);
const ADD_ONS = [
  {
    key: 'notarized_doc',
    label: 'One Document Signed/Notarized',
    price: 40,
    notes: ['cancellation'], 
        cation: (
                  <div className="flex flex-col items-start sm:items-center justify-center gap-2 text-sm sm:text-base text-center sm:text-left px-4">
              <span className="flex items-center gap-1 font-bold text-red-600">
                <AlertTriangle className="w-5 h-5" />
                Fraud is on the rise.
              </span>
              <p className="text-gray-700">
                Don’t leave your deals (or documents) exposed. Protect yourself with verified notarization — not just a digital signature.
              </p>
            </div>
           ),  
    cosigner:true,
      },
  {
    key: 'additional_doc',
    label: 'Each Additional Doc',
    price: 15,
    notes: ['cancellation']  
  },
  {
    key: 'measurements',
    label: 'Measurements',
    price: 30,
    notes: ['travel']  
  },
  {
    key: 'addon_floor_plan',
    label: '2D Floor Plan',
    price: 95,
    notes: []
  },
  {
    key: 'addon_walkthrough',
    label: 'Walk Through Video',
    price: 25,
    notes: ['cancellation', 'travel']
  }
];


const Step5 = ({ formData = {}, handleChange, onPrev, onNext }) => {
  const [modal, setModal] = useState(null); // { item, addOns, submenu, ... }
  const [submenuState, setSubmenuState] = useState({});
  const [addOnState, setAddOnState] = useState({});
 
  const [errors, setErrors] = useState({});

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


  const handleValidation = () => {
  
    const newErrors = {};

    // Validate at least one a_la_carte product selected (excluding a_la_carte_total)
    const hasAlaCarte = Object.keys(formData).some(
      key => key.startsWith('a_la_carte_') && key !== 'a_la_carte_total' && formData[key]
    );
    if (!hasAlaCarte) {
      newErrors.a_la_carte = "Please select at least one A La Carte Service.";
    }

    if (Object.keys(newErrors).length === 0) {
      setErrors({});
      onNext();
    } else {
      setErrors(newErrors);
    }
  };

  // Handle add-on selection
  const handleAddOnChange = (key, checked) => {
    setAddOnState((prev) => ({ ...prev, [key]: checked }));
  };

  // Handle submenu selection
  const handleSubmenuChange = (field, value) => {
    console.log(`--- handleSubmenuChange called for field: ${field}, value: ${value} ---`);
    setSubmenuState((prev) => ({ ...prev, [field]: value }));
  };

  // Save selection to formData
  const handleSave = () => {
    if (!modal) return;
    const { item } = modal;
    console.log('--- handleSave called ---');
    console.log('modal.item:', JSON.stringify(item, null, 2));
    console.log('submenuState:', JSON.stringify(submenuState, null, 2));
    console.log('addOnState:', JSON.stringify(addOnState, null, 2));

    let value = { ...item };
    let totalPrice = item.price || 0;

    // Remove submenu/addOns from value by default
    delete value.submenu;
    delete value.addOns;

    // Only add submenu if there is a selection
    if (item.submenu && Object.keys(submenuState).length) {
      let submenuValue = {};
      if (submenuState.option) {
        const selectedOption = item.submenu.options.find(opt => opt.value === submenuState.option);
        if (selectedOption) {
          totalPrice += selectedOption.price || 0;
          submenuValue.label = selectedOption.label || '';
          submenuValue.option = selectedOption.value || '';
          submenuValue.option_price = selectedOption.price || 0;
        }
      }
      if (submenuState.amount) {
        totalPrice += parseFloat(submenuState.amount) || 0;
        submenuValue.amount = submenuState.amount;
      }
      // Add any other submenuState fields (like textarea for maintenance)
      Object.keys(submenuState).forEach(k => {
        if (k !== 'option' && k !== 'amount') {
          submenuValue[k] = submenuState[k];
        }
      });
      // If prompt_value exists, add prompt from modal.item.submenu
      if (submenuValue.prompt_value && item.submenu && item.submenu.prompt) {
        submenuValue.prompt = item.submenu.prompt;
      }
      if (Object.keys(submenuValue).length) {
        value.submenu = submenuValue;
      }
      console.log('After submenu processing, value.submenu:', JSON.stringify(value.submenu, null, 2));
    }

    // Only add addOns if there are selected add-ons
    const currentAddOns = (item.addOns && item.addOns.length > 0 ? item.addOns : ADD_ONS);
    if (Object.keys(addOnState).length) {
    const selectedAddOns = Object.keys(addOnState).reduce((acc, key) => {
      if (addOnState[key]) {
        const addOn = currentAddOns.find(addon => (addon.key || addon.value || addon.label) === key);
        if (addOn && addOn.price) {
          // Save both label and price
          acc[key] = { label: addOn.label, price: addOn.price };
          totalPrice += addOn.price;
          if (addOn?.cosigner === true) {
            formData.cosigner = true;
          }
        }
      }
      return acc;
    }, {});
    if (Object.keys(selectedAddOns).length) {
      value.addOns = selectedAddOns;
    }
    console.log('After addOns processing, value.addOns:', JSON.stringify(value.addOns, null, 2));
  }

    value.price = item.price || 0;
    value.addons_price = totalPrice - (item.price || 0);
    value.total_price = totalPrice;

    console.log('Final value to save:', JSON.stringify(value, null, 2));

    handleChange({ name: `a_la_carte_${item.key}`, value });

    // Update the total price for all selections
    const currentTotal = formData.a_la_carte_total || 0;
    handleChange({ name: 'a_la_carte_total', value: currentTotal + totalPrice });

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
    <>
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-main mb-4 text-center">A La Carte Menu</h2>
      <div className="flex flex-col gap-2 items-center w-full max-w-2xl mx-auto">
        {A_LA_CARTE_ITEMS.map((item) => {
          const selected = isSelected(item);
          return (
            <div
              key={item.key}
              className={`relative bg-card border p-2 flex flex-col w-full min-h-[70px] max-w-xl shadow-sm hover:shadow-md transition-all cursor-pointer group
                ${selected ? 'border-primary ring-1 ring-primary label-active-gradient text-inverse' : 'border-gray-200 text-main'}`}
              style={{ minHeight: '70px', height: 'auto', justifyContent: 'space-between', overflow: 'visible', maxWidth: '100%', flex: '1 1 auto' }}
              onClick={() => openModal(item)}
              tabIndex={0}
              role="button"
            >
              
              <div className="flex items-center w-full justify-between mb-1 overflow-auto">
                <span className={` text-sm flex items-center truncate max-w-[60%] ${selected ? 'text-inverse font-bold' : 'text-main font-medium'}`} style={{ wordWrap: 'break-word', whiteSpace: 'normal' }}>
                {selected && (
                  <span className="ml-2 text-green-600 font-bold shrink-0" title="Selected">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 20 20">
                      <circle cx="10" cy="10" r="10" fill="#22c55e" />
                      <path d="M6 10.5l2.5 2.5L14 8.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                )}{item.name}
                <HelpCircle className={`w-3 h-3 ml-1 shrink-0 ${selected ? 'text-inverse' : 'text-primary'}`} />
              </span>
              {selected ? (
  <span className={`text-base font-semibold ml-2 whitespace-nowrap ${selected ? 'text-inverse' : 'text-primary'}`}>
    {item.price === null
      ? `$${formData[`a_la_carte_${item.key}`]?.total_price || 0} + TBD`
      : `$${formData[`a_la_carte_${item.key}`]?.total_price || item.price}`}
  </span>
) : (
  <span className={`text-base font-semibold ml-2 whitespace-nowrap text-primary`}>
    {item.price === null ? 'TBD' : `$${item.price}`}
  </span>
)}
                
              </div>
              <div className={`text-xs mt-1 text-wrap ${selected ? 'text-inverse opacity-80' : 'text-main opacity-80'}`}>{item.description}</div>
              {item.prompt && <div className="text-xs text-main opacity-60 italic  w-full">{item.prompt}</div>}
              {selected && (<>
               {(() => {
  const data = formData[`a_la_carte_${item.key}`];
  const hasAddOns = data?.addOns && Object.keys(data.addOns).length > 0;
  const hasSubmenu = data?.submenu && Object.keys(data.submenu).length > 0;
  
  return (
    <>
      {hasSubmenu && (
        <div className="text-xs font-semibold text-inverse mt-1">
          {data.submenu.option && (
            <div>
              <span className="font-semibold">Option:</span> {data.submenu.label || data.submenu.option}
            </div>
          )}
          {data.submenu.prompt && data.submenu.prompt_value && (
            <div>
              <span className="font-semibold">{data.submenu.prompt}:</span> {data.submenu.prompt_value}
            </div>
          )}
        </div>
      )}

      {hasAddOns && (
        <div className="text-xs font-semibold text-inverse mt-1">
          <span className="font-semibold">Add-ons:</span>&nbsp;
          {Object.entries(data.addOns)
            .map(([key, addon]) => addon.label || key)
            .join(", ")
          }
        </div>
      )}
    </>
  );
})()}

                <button
                  type="button"
                  className="mt-1 px-2 py-1 bg-danger text-inverse text-xs font-semibold shadow hover:bg-danger-dark border-none z-20"
                  onClick={e => { e.stopPropagation(); e.preventDefault(); handleRemove(item); }}
                  tabIndex={0}
                >
                  Remove
                </button>
              </>)}
            </div>
          );
        })}
      </div>
      {/* Modal for add-ons and submenus */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(100,116,139,0.18)] backdrop-blur-md">
          <div className="bg-card shadow-2xl p-6 w-full max-w-lg relative">
            <button className="absolute top-3 right-3 text-main hover:text-primary" onClick={closeModal}><X className="w-6 h-6" /></button>
            <h3 className="text-lg font-bold mb-2 text-main">Want to Maximize This Visit?</h3>
            <div className="mb-2 text-main">
              You're already getting <br/><span className='font-bold'>
                {modal.item.name}
{modal.item.notes?.map((key, idx) => (
  <sup key={idx} title={NOTES[key]?.description} className="ml-1 text-xs align-super text-gray-600">
    {NOTES[key]?.symbol}{" "}
  </sup>
))}
                </span> — why not make this visit work even harder for you?
            </div>
            {/* Submenu logic */}
            {modal.item.submenu && (
              <div className="mb-4">
                {modal.item.submenu.options && (
                  <div className="mb-2">
                    <label className="block font-semibold mb-1 text-main">Choose an option:</label>
                    <select
                      className="w-full border border-primary p-2 text-main"
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
                    {modal.item.submenu.inputType === 'textarea' ? (
                            <textarea
                        className="w-full border border-primary  p-2 text-main"
                        rows={3}
                        placeholder={modal.item.submenu.placeholder || 'Enter value...'}
                        value={submenuState.prompt_value || ''}
                        onChange={e => handleSubmenuChange('prompt_value', e.target.value)}/>
                      ) :(
                          <input
                            type={modal.item.submenu.inputType || 'text'}
                            className="w-full border border-primary p-2 text-main"
                            placeholder={modal.item.submenu.placeholder || 'Enter value...'}
                            value={submenuState.prompt_value || ''}
                            onChange={e => handleSubmenuChange('prompt_value', e.target.value)}
                          />
                      )}
                  </div>
                )}
                
              </div>
            )}
          
            {/* Add-ons */}
            <div className="mb-4">
              <div className="font-semibold mb-1 text-main">Need an add-on?</div>
              <div className="flex flex-wrap gap-3">
                {(modal.item.addOns && modal.item.addOns.length > 0 ? modal.item.addOns : ADD_ONS).map(addon => {
                  const addonKey = addon.key || addon.value || addon.label;
                  return (
                    <label key={addonKey} className="flex items-center gap-2 cursor-pointer border border-primary  px-3 py-1 bg-card hover:label-active-gradient hover:text-inverse">
                      <input
                        type="checkbox"
                        checked={!!addOnState[addonKey]}
                        onChange={e => handleAddOnChange(addonKey, e.target.checked)}
                      />
                      <span className="text-main flex items-center gap-1">
  {addon.label}
  {addon.notes?.map((noteKey, i) => (
    <sup
      key={i}
      title={NOTES[noteKey]?.description}
      className="text-xs align-super text-gray-600"
    >
      {NOTES[noteKey]?.symbol}
    </sup>
  ))}
  {addon.price !== undefined && (
    <span className="text-primary font-semibold"> ${addon.price}</span>
  )}
</span>

                    </label>
                  );
                })}
              </div>
            </div>
            {/* Caution message for selected add-on */}
            {(() => {
              const currentAddOns = (modal.item.addOns && modal.item.addOns.length > 0 ? modal.item.addOns : ADD_ONS);
              const selectedCaution = Object.keys(addOnState)
                .map(key => currentAddOns.find(addon => (addon.key || addon.value || addon.label) === key && addOnState[key] && addon.cation))
                .filter(Boolean)[0];
              return selectedCaution ? (
                <div className="my-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 flex items-center gap-2">
                  {selectedCaution.cation}
                </div>
              ) : null;
            })()}
              <p className="text-gray-700 font-medium">
    Add-ons are handled by the same trusted <span className="font-semibold">BootzForce Rep™</span> — no rescheduling needed.
  </p>
   {(() => {
  const itemNotes = modal.item.notes || [];

  const currentAddOns = modal.item.addOns?.length ? modal.item.addOns : ADD_ONS;
  const selectedAddOnNotes = Object.keys(addOnState)
    .flatMap(key => {
      const addon = currentAddOns.find(
        a => (a.key || a.value || a.label) === key && addOnState[key]
      );
      return addon?.notes || [];
    });
  console.log("current addons")
  console.log(currentAddOns)
  

  // Merge and deduplicate
  const allNoteKeys = [...new Set([...itemNotes, ...selectedAddOnNotes])];

  return allNoteKeys.length > 0 && (
    <div className="mt-4">
      {allNoteKeys.map((key, idx) => (
        <p key={idx} className="ml-1 text-sm" title={NOTES[key]?.description}>
          <span className="align-super text-xs">{NOTES[key]?.symbol}</span> {NOTES[key]?.description}
        </p>
      ))}
    </div>
  );
})()}

            <div className="flex justify-end gap-2 mt-4">
              <button className="px-4 py-2 bg-secondary text-inverse hover:bg-primary hover:text-inverse" onClick={closeModal}>Cancel</button>
              {Object.keys(submenuState).length || Object.keys(addOnState).length ? (
                <button className="px-4 py-2 bg-primary text-inverse  hover:bg-cyan" onClick={handleSave}>Save</button>
              ) : (
                <button
                  className="px-4 py-2 bg-secondary text-inverse hover:bg-primary hover:text-inverse"
                  onClick={handleSave}
                >
                  No thanks
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
      <div className="sticky bottom-0 left-0 w-full bg-white/90 backdrop-blur z-20 shadow-[0_-2px_8px_0_rgba(0,0,0,0.04)]  px-4 py-3 mt-4 border-t">
      {errors.a_la_carte && (
  <div className="w-full max-w-2xl mx-auto mb-4">
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2  text-center text-sm">
      {errors.a_la_carte}
    </div>
  </div>
)}
      <div className='flex flex-col md:flex-row justify-between items-center'>
                <button
                  type="button"
                  className={`w-full md:w-auto px-4 py-2 bg-gray-300 text-gray-800 hover:bg-gray-400 focus:outline-none font-semibold transition-all duration-200`}
                  onClick={onPrev}
                >
                  Previous
                </button>
               
                  <button
                    type="button"
                    className={
                      "w-full md:w-auto mt-2 md:mt-0 px-4 py-2 bg-primary text-white hover:bg-blue-700 focus:outline-none font-semibold transition-all duration-200 "
                    }
                    onClick={handleValidation}
                  >
                    Next
                  </button>
                </div>
              </div>
    </>
  );
};

export default Step5;
