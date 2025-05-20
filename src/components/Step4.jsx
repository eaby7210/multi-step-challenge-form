import React, { useState, useEffect } from 'react';
import { Star, HelpCircle } from 'lucide-react';

const bundles = [
  {
    group: 'InvestorBootz Deal Accelerator™ Bundle',
    tagline: 'Your Fast-Track to Closing More Deals',
    items: [
      {
        name: 'Ext/Int Photos + Walk Through Video',
        price: 180,
        badge: 'Most Popular',
        description: 'Professional exterior/interior photos and a walk-through video to accelerate your deal closing.'
      }
    ]
  },
  {
    group: 'InvestorBootz Market Domination™ Bundles',
    tagline: 'Our Most Powerful Solutions for Maximum Impact',
    items: [
      {
        name: 'Domination Pro™',
        price: 215,
        description: 'Comprehensive marketing bundle for serious investors.'
      },
      {
        name: 'Domination Max™',
        price: 269,
        description: 'Enhanced marketing with additional features for maximum exposure.'
      },
      {
        name: 'Domination Ultra™',
        price: 299,
        description: 'Ultimate marketing power for dominating your market.'
      }
    ]
  },
  {
    group: 'InvestorBootz Access Essentials™ Bundles',
    tagline: 'Simplify Property Access, Maximize Buyer Confidence',
    items: [
      {
        name: 'Access Plus™',
        price: 210,
        description: 'Essential access solutions for your property.'
      },
      {
        name: 'Access Pro™',
        price: 215,
        description: 'Professional access management for buyers and agents.'
      },
      {
        name: 'Access Max™',
        price: 239,
        description: 'Advanced access features for maximum buyer confidence.'
      },
      {
        name: 'Access Ultra™',
        price: 259,
        description: 'Ultimate access bundle for seamless property showings.'
      }
    ]
  },
  {
    group: 'InvestorBootz Quantum™ Bundles',
    tagline: 'Take a Quantum Leap Toward Faster Conversions',
    items: [
      {
        name: 'Quantum Pro™',
        price: 175,
        description: 'Entry-level quantum bundle for faster conversions.'
      },
      {
        name: 'Quantum Max™',
        price: 200,
        description: 'Mid-tier quantum bundle for increased conversion rates.'
      },
      {
        name: 'Quantum Ultra™',
        price: 210,
        description: 'Top-tier quantum bundle for the fastest conversions.'
      }
    ]
  }
];

const Step4 = ({ formData = {}, handleChange }) => {
  const [selectedGroupIdx, setSelectedGroupIdx] = useState(() => {
    // If formData.bundleGroup exists, set initial group index accordingly
    const idx = bundles.findIndex(b => b.group === formData.bundleGroup);
    return idx !== -1 ? idx : 0;
  });
  const [selectedItemIdx, setSelectedItemIdx] = useState(() => {
    // If formData.bundleItem exists, set initial item index accordingly
    const group = bundles[selectedGroupIdx];
    if (formData.bundleItem && group) {
      const idx = group.items.findIndex(i => i.name === formData.bundleItem);
      return idx !== -1 ? idx : null;
    }
    return null;
  });
  const [hovered, setHovered] = useState({ group: null, item: null });

  // Ensure default group and item are set in formData
  useEffect(() => {
    if (!formData.bundleGroup) {
      handleChange({ name: 'bundleGroup', value: bundles[0].group });
    }
    if (!formData.bundleItem) {
      handleChange({ name: 'bundleItem', value: bundles[0].items[0].name });
    }
  }, [formData.bundleGroup, formData.bundleItem, handleChange]);

  // When group changes, reset item selection
  const handleGroupSelect = (idx) => {
    setSelectedGroupIdx(idx);
    setSelectedItemIdx(null);
    if (handleChange) {
      handleChange({ name: 'bundleGroup', value: bundles[idx].group });
      handleChange({ name: 'bundleItem', value: null });
    }
  };

  const handleItemSelect = (idx) => {
    setSelectedItemIdx(idx);
    if (handleChange) {
      handleChange({ name: 'bundleItem', value: bundles[selectedGroupIdx].items[idx].name });
    }
  };

  const selectedGroup = bundles[selectedGroupIdx];

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-main mb-6 text-center">Choose Your Bundled Service</h2>
      {/* Group selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-center mb-8 pb-8">
        {bundles.map((bundle, idx) => (
          <button
            key={bundle.group}
            type="button"
            className={`px-5 py-3 rounded-lg border-2 font-semibold text-sm transition-all flex items-center gap-2 shadow-sm bg-card hover:label-active-gradient w-full h-full
              ${selectedGroupIdx === idx ? 'border-primary ring-2 ring-primary label-active-gradient text-inverse' : 'border-gray-200 text-main'}`}
            onClick={() => handleGroupSelect(idx)}
            onMouseEnter={() => setHovered({ group: idx, item: null })}
            onMouseLeave={() => setHovered({ group: null, item: null })}
            style={{ minHeight: '90px' }}
          >
            <div className="flex flex-col items-start w-full">
              <span className={`flex items-center text-left w-full ${selectedGroupIdx === idx ? 'text-inverse' : ''}`}>
                {bundle.group}
                {idx === 0 && (
                  <span className="flex items-center gap-1 bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-semibold ml-2">
                    <Star className="w-3 h-3 text-green-500" /> Most Popular
                  </span>
                )}
              </span>
              <span className="relative flex items-center mt-1">
                <HelpCircle className={`w-4 h-4 ml-1 ${selectedGroupIdx === idx ? 'text-inverse' : 'text-primary'}`} />
                {hovered.group === idx && (
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 bg-card border border-gray-300 rounded-lg shadow-lg p-3 text-sm text-main z-10">
                    {bundle.tagline}
                  </div>
                )}
              </span>
            </div>
          </button>
        ))}
      </div>
      <hr className="my-6 border-t-2 border-gray-300" />
      {/* Items of selected group */}
      <div className="flex flex-wrap gap-4 justify-center">
        {selectedGroup.items.map((item, idx) => (
          <div
            key={item.name}
            className={`relative bg-card border rounded-lg p-4 flex flex-col items-start min-w-[220px] shadow hover:shadow-lg transition-all cursor-pointer group
              ${selectedItemIdx === idx ? 'border-primary ring-2 ring-primary label-active-gradient text-inverse' : 'border-gray-200 text-main'}`}
            onClick={() => handleItemSelect(idx)}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className={`font-semibold ${selectedItemIdx === idx ? 'text-inverse' : 'text-main'}`}>{item.name}</span>
              {item.badge && (
                <span className="flex items-center gap-1 bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-semibold ml-2">
                  <Star className="w-3 h-3 text-green-500" /> {item.badge}
                </span>
              )}
            </div>
            <div className={`text-lg font-bold mb-1 ${selectedItemIdx === idx ? 'text-inverse' : 'text-primary'}`}>${item.price}</div>
          </div>
        ))}
      </div>
      {/* Optionally, you can show a message or disable next if no item is selected */}
    </div>
  );
};

export default Step4;
