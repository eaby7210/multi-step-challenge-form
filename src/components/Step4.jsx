import React, { useState, useEffect } from "react";
import {
  Star,
  HelpCircle,
  AlertCircle,
  Megaphone,
  AlertTriangle,
} from "lucide-react";

const bundles = [
  {
    group: "InvestorBootz Deal Accelerator™ Bundle",
    tagline: "Your Fast-Track to Closing More Deals",
    caution: (
      <div className="flex items-center justify-center gap-2">
        <AlertTriangle className="text-red-600 w-5 h-5" />
        Use Responsibly... We Can’t Be Held Liable for Bidding Wars!
      </div>
    ),
    items: [
      {
        name: "Ext/Int Photos + Walk Through Video",
        price: 180,
        badge: "Most Popular",
        description:
          "Professional exterior/interior photos and a walk-through video to accelerate your deal closing.",
        // tooltip: 'Ext/Int Photos + Walk Through Video',
      },
    ],
  },
  {
    group: "InvestorBootz Market Domination™ Bundles",
    tagline: "Our Most Powerful Solutions for Maximum Impact",
    caution: (
      <div className="flex items-center justify-center gap-2">
        <Megaphone className="text-red-600 w-5 h-5" />
        Attention: Side Effects May Include Multiple Offers & Faster Closings.
      </div>
    ),
    items: [
      {
        name: "Domination Pro™",
        price: 215,
        description: "Comprehensive marketing bundle for serious investors.",
        tooltip:
          "Ext/Int Photos + Walk Through Video + Document Signed/Notarized",
      },
      {
        name: "Domination Max™",
        price: 269,
        description:
          "Enhanced marketing with additional features for maximum exposure.",
        tooltip: "Ext/Int Photos + Walk Through Video + 2D Floor Plan",
      },
      {
        name: "Domination Ultra™",
        price: 299,
        description: "Ultimate marketing power for dominating your market.",
        tooltip:
          "Ext/Int Photos + Walk Through Video + 2D Floor Plan + Document Signed/Notarized",
      },
    ],
  },
  {
    group: "InvestorBootz Access Essentials™ Bundles",
    tagline: "Simplify Property Access, Maximize Buyer Confidence",
    caution: (
      <div className="flex items-center justify-center gap-2">
        <Megaphone className="text-red-600 w-5 h-5" />
        Caution: Easy Access Means More Showings... Hope You Like Talking to
        Buyers!
      </div>
    ),
    items: [
      {
        name: "Access Plus™",
        price: 210,
        description: "Essential access solutions for your property.",
        tooltip: "Ext/Int Photos + Lock Box",
      },
      {
        name: "Access Pro™",
        price: 215,
        description: "Professional access management for buyers and agents.",
        tooltip: "Ext/Int Photos + Lock Box + Room Measurements",
      },
      {
        name: "Access Max™",
        price: 239,
        description: "Advanced access features for maximum buyer confidence.",
        tooltip: "Ext/Int Photos + Lock Box + Document Signed/Notarized",
      },
      {
        name: "Access Ultra™",
        price: 259,
        description: "Ultimate access bundle for seamless property showings.",
        tooltip:
          "Ext/Int Photos + Lock Box + Document Signed/Notarized + Room Measurements",
      },
    ],
  },
  {
    group: "InvestorBootz Quantum™ Bundles",
    tagline: "Take a Quantum Leap Toward Faster Conversions",
    caution: (
      <div className="flex items-center justify-center gap-2">
        <AlertTriangle className="text-red-600 w-5 h-5" />
        Warning: May Cause Instant Buyer Interest—Proceed with Caution!
      </div>
    ),
    items: [
      {
        name: "Quantum Pro™",
        price: 175,
        description: "Entry-level quantum bundle for faster conversions.",
        tooltip: "Ext/Int Photos + Room Measurements",
      },
      {
        name: "Quantum Max™",
        price: 200,
        description: "Mid-tier quantum bundle for increased conversion rates.",
        tooltip: "Ext/Int Photos + Document Signed/Notarized",
      },
      {
        name: "Quantum Ultra™",
        price: 210,
        description: "Top-tier quantum bundle for the fastest conversions.",
        tooltip:
          "Ext/Int Photos + Room Measurements + Document Signed/Notarized",
      },
    ],
  },
];

const Step4 = ({ formData = {}, handleChange, onNext, onPrev }) => {
  const [selectedGroupIdx, setSelectedGroupIdx] = useState(() => {
    const idx = bundles.findIndex((b) => b.group === formData.bundleGroup);
    return idx !== -1 ? idx : null;
  });

  const [selectedItemIdx, setSelectedItemIdx] = useState(() => {
    const group = bundles[selectedGroupIdx];
    if (formData.bundleItem && group) {
      const idx = group.items.findIndex((i) => i.name === formData.bundleItem);
      return idx !== -1 ? idx : null;
    }
    return null;
  });
  const [error, setError] = useState("");

  const [hovered, setHovered] = useState({ group: null, item: null });

  // Ensure default group and item are set in formData
  useEffect(() => {
    console.log(formData.bundleGroup, formData.bundleItem);
    if (!formData.bundleGroup) {
      handleChange({ name: "bundleGroup", value: bundles[0].group });
    }
    // if (!formData.bundleItem) {
    //   setSelectedItemIdx(0);
    //   handleChange({ name: 'bundleItem', value: bundles[0].items[0].name });
    // }
  }, [formData.bundleGroup, formData.bundleItem, handleChange]);

  const handleValidation = () => {
    if (selectedGroupIdx === null) {
      setError("Please select one bundle group");
      return;
    }

    if (selectedItemIdx === null) {
      setError("Please select a bundle to proceed");
      return;
    }

    setError(""); // Clear any previous error
    onNext();
  };

  // When group changes, reset item selection
  const handleGroupSelect = (idx) => {
    setSelectedGroupIdx(idx);
    setSelectedItemIdx(null);
    if (handleChange) {
      handleChange({ name: "bundleGroup", value: bundles[idx].group });
      handleChange({ name: "bundleItem", value: null });
    }
  };

  const handleItemSelect = (idx) => {
    setSelectedItemIdx(idx);
    console.log("Item selected, index:", idx); // Debugging log to verify item selection
    if (handleChange) {
      handleChange({
        name: "bundleItem",
        value: bundles[selectedGroupIdx].items[idx].name,
      });
      handleChange({
        name: "bundlePrice",
        value: bundles[selectedGroupIdx].items[idx].price,
      });
    }
  };
  console.log("selected item selectedItemIdx: ", selectedItemIdx);
  const selectedGroup = bundles[selectedGroupIdx];

  return (
    <>
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-main mb-6 text-center">
          BUNDLE AND SAVE!
        </h2>
        <p className="text-center text-gray-600 mb-4">
          Combine services for maximum value and start saving today. Photos are
          great, but bundles? Bundles help you get higher bids and move your
          deals faster!
        </p>
        {/* Group selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-center mb-8 pb-8">
          {bundles.map((bundle, idx) => (
            <button
              key={bundle.group}
              type="button"
              className={`px-5 py-3 border-2 font-semibold text-sm transition-all flex items-center gap-2 shadow-sm bg-card hover:label-active-gradient w-full h-full
              ${
                selectedGroupIdx === idx
                  ? "border-primary ring-2 ring-primary label-active-gradient text-inverse"
                  : "border-gray-200 text-main"
              }`}
              onClick={() => handleGroupSelect(idx)}
              onMouseEnter={() => setHovered({ group: idx, item: null })}
              onMouseLeave={() => setHovered({ group: null, item: null })}
              style={{ minHeight: "90px" }}
            >
              <div className="flex flex-col items-start w-full">
                <span
                  className={`flex items-center text-left w-full ${
                    selectedGroupIdx === idx ? "text-inverse" : ""
                  }`}
                >
                  {bundle.group}
                  {idx === 0 && (
                    <span className="flex items-center gap-1 bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-semibold ml-2">
                      <Star className="w-3 h-3 text-green-500" /> Most Popular
                    </span>
                  )}
                </span>
                <span className="relative flex items-center mt-1">
                  <HelpCircle
                    className={`w-4 h-4 ml-1 ${
                      selectedGroupIdx === idx ? "text-inverse" : "text-primary"
                    }`}
                  />
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
        {/* Optionally, you can show a message or disable next if no item is selected */}
        {selectedGroupIdx !== null && (
          <>
            {selectedGroup.caution && (
              <div className="text-yellow-600 text-sm font-medium text-center mb-4">
                {selectedGroup.caution}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center">
              {selectedGroup.items.map((item, idx) => (
                <div
                  key={item.name}
                  className={`relative bg-card border p-4 flex flex-col items-start min-w-[220px] shadow hover:shadow-lg transition-all cursor-pointer group
            ${
              selectedItemIdx === idx
                ? "border-primary ring-2 ring-primary label-active-gradient text-inverse"
                : "border-gray-200 text-main"
            }`}
                  onClick={() => handleItemSelect(idx)}
                  onMouseEnter={() => setHovered({ group: null, item: idx })}
                  onMouseLeave={() => setHovered({ group: null, item: null })}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`font-semibold ${
                        selectedItemIdx === idx ? "text-inverse" : "text-main"
                      }`}
                    >
                      {`${item.name} Bundle`}
                    </span>
                    {item.badge && (
                      <span className="flex items-center gap-1 bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-semibold ml-2">
                        <Star className="w-3 h-3 text-green-500" /> {item.badge}
                      </span>
                    )}
                  </div>
                  <p
                    className={`text-sm text-left ${
                      selectedItemIdx === idx
                        ? "text-inverse"
                        : " text-gray-500"
                    } mt-1`}
                  >
                    {item.tooltip}
                  </p>
                  <div
                    className={`text-lg font-bold mb-1 ${
                      selectedItemIdx === idx ? "text-inverse" : "text-primary"
                    }`}
                  >
                    ${item.price}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <div className="sticky bottom-0 left-0 w-full bg-white/90 backdrop-blur z-20 shadow-[0_-2px_8px_0_rgba(0,0,0,0.04)]  px-4 py-3 mt-4 border-t">
        {error && (
          <div className="w-full max-w-2xl mx-auto mb-4">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-center text-sm">
              {error}
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row justify-between items-center">
          <button
            type="button"
            className={`w-full md:w-auto px-4 py-2 bg-gray-300 text-gray-800  hover:bg-gray-400 focus:outline-none font-semibold transition-all duration-200`}
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

export default Step4;
