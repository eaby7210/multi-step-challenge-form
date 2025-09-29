import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./Accordian";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown, PlusCircle } from "lucide-react";
import IndModals from "../config/IndividualModal";
import ModalWrapper from "./ModalWrapper";
import OrderProtectionModal from "../config/OrderProtectionModal";
import ServiceOptionModal from "../config/ServiceOptionModal";

const SERVICES = [
  {
    id: "photos",
    title: "Property Photos",
    subtitle: "Send a photographer to a property to take pictures",
    order_protection: true,
    order_protection_type: "percent",
    order_protection_value: 4,
    form: {
      title: "Photography Order Options",
      description: "Send a photographer to a property to take pictures",
      items: [
        {
          id: "basic",
          title: "Photos",
          subtitle: "Int / Ext images showing condition & major systems",
          price: 165,
          basePrice: null,
          options: {
            type: "checkbox",
            minimumRequired: 1,
            items: [
              {
                id: "interior",
                label: "Interior",
                value: true,
                disabled: false,
                valid_item_index: [],
                priceChange: 95,
              },
              {
                id: "exterior",
                label: "Exterior",
                value: true,
                disabled: false,
                valid_item_index: [],
                priceChange: 80,
              },
            ],
          },
        },
        {
          id: "premium30",
          title: "30 Premium Photos",
          subtitle: "Professionally edited, High-Definition images",
          price: 239,
          basePrice: null,
          protectionInvalid: true,
          options: {
            type: "checkbox",
            items: [
              {
                id: "interior",
                label: "Interior",
                disabled: true,
                value: true,
                valid_item_index: [],
              },
              {
                id: "exterior",
                label: "Exterior",
                disabled: true,
                value: true,
                valid_item_index: [],
              },
            ],
          },
        },
        {
          id: "premium50",
          title: "50 Premium Photos",
          subtitle: "Professionally edited, High-Definition images",
          price: 289,
          basePrice: null,
          options: {
            type: "checkbox",
            items: [
              {
                id: "interior",
                label: "Interior",
                disabled: true,
                value: true,
                valid_item_index: [],
              },
              {
                id: "exterior",
                label: "Exterior",
                disabled: true,
                value: true,
                valid_item_index: [],
              },
            ],
          },
        },
        {
          id: "landview",
          title: "LandView Photos",
          subtitle: "Images showcasing vacant land and lot features",
          price: 130,
          basePrice: null,
          options: {
            type: "checkbox",
            items: [
              {
                id: "interior",
                label: "Interior",
                disabled: true,
                value: false,
                valid_item_index: [],
              },
              {
                id: "exterior",
                label: "Exterior",
                disabled: true,
                value: true,
                valid_item_index: [],
              },
            ],
          },
        },
      ],
      options: {},
    },
  },
  {
    id: "lockboxes",
    title: "LockBoxes",
    subtitle: "Have a lockbox installed at the property",
    order_protection: true,
    order_protection_type: "percent",
    order_protection_value: 4,
    form: {
      title: "LockBox Order Options",
      description: "Secure property access with fast lockbox setup",
      items: [
        {
          id: "standard",
          title: "LockBox (48hrs)",
          subtitle: "Lockbox installed within 2 business days",
          price: 90,
          basePrice: null,
        },
        {
          id: "sameday",
          title: "Same Day Lockbox",
          subtitle: "Rush install for immediate property access",
          price: 130,
          basePrice: null,
        },
      ],
      options: {
        type: "none", // no extra options in UI
        items: [],
      },
    },
  },
  {
    id: "notary",
    title: "Notarizations & Signings",
    subtitle: "Have documents signed or notarized",
    order_protection: true,
    order_protection_type: "percent",
    order_protection_value: 4,
    form: {
      title: "Document Order Options",
      description: "Have documents signed or notarized",
      items: [
        {
          id: "inperson",
          title: "In-Person Notarization",
          subtitle: "Notary meets onsite to sign & notarize documents",
          price: 90,
          basePrice: null,
          options: {
            type: "checkbox",
            items: [
              {
                id: "shipDoc",
                label: "Ship Doc",
                value: false,
                disabled: false,
                valid_item_index: [],
              },
            ],
          },
          submenuPriceChange: {
            pages20_75: {
              type: "add",
              value: 30,
            },
            pages75_150: {
              type: "add",
              value: 60,
            },
            witness: {
              type: "multiple",
              value: 25,
            },
          },
        },
        {
          id: "online",
          title: "Online Notarization",
          subtitle: "Secure video notarization from anywhere - no travel req",
          price: 90,
          basePrice: null,
          options: {
            type: "checkbox",
            items: [
              {
                id: "shipDoc",
                label: "Ship Doc",
                value: false,
                disabled: false,
                valid_item_index: [],
              },
            ],
          },
        },
      ],
      options: {},
      submenu: {
        type: "mixed",
        items: [
          {
            id: "pages20_75",
            label: "20-75 Pages",
            value: false,
            type: "radio",
            name: "pages",
            valid_item_index: [],
          },
          {
            id: "pages75_150",
            label: "75-150 Pages",
            value: false,
            type: "radio",
            name: "pages",
            valid_item_index: [],
          },
          {
            id: "witness",
            label: "Add Witness(s)",
            type: "counter",
            value: 0,
            max: 2,
            valid_item_index: [],
          },
        ],
      },
      modalOption: {
        eachItem: false,
        validItem: [],
        form: [
          {
            label: "Signers Name",
            name: "signersName",
            type: "text",
            value: "",
            required: true,
          },
          {
            label: "Email",
            type: "email",
            name: "email",
            value: "",
            required: true,
            valid_item_index: ["online"],
          },
        ],
      },
    },
  },
  {
    id: "videos",
    title: "Property Videos",
    subtitle: "Send a videographer to a property to record video",
    order_protection: true,
    order_protection_type: "percent",
    order_protection_value: 4,
    form: {
      title: "Property Video Options",
      description:
        "Smartphone-walkthrough for due-diligence and internal review",
      items: [
        {
          id: "wt-videos",
          title: "Walk-through Video",
          subtitle: "Receive a walk-through video tour of your property",
          price: 75,
          basePrice: null,
        },
      ],
    },
  },
  {
    id: "repairs",
    title: "Home Maintenance & Repairs",
    subtitle: "Receive and approve bids for repair work on a property",
    order_protection: true,
    order_protection_type: "percent",
    order_protection_value: 4,
    form: {
      title: "Quotes and Bids Options",
      description: "Receive and approve bids for repair work on a property",
      items: [
        {
          id: "land q",
          title: "Landscaping Quotes",
          subtitle: "Have our team source and coordinate quote(s) for work",
          basePrice: null,
          price: 50,
          options: {
            type: "checkbox",
            items: [
              {
                id: "bidOnly",
                label: "Bids Only",
                value: true,
                disabled: true,
                priceChange: 15,
                valid_item_index: [],
              },
              {
                id: "complete",
                label: "Complete It",
                value: true,
                disabled: false,

                valid_item_index: [],
              },
            ],
          },
        },
        {
          id: "trash q",
          title: "Trashout Quotes",
          subtitle: "Have our team source and coordinate quote(s) for work",
          basePrice: null,
          price: 50,
          options: {
            type: "checkbox",
            items: [
              {
                id: "bidOnly",
                label: "Bids Only",
                value: true,
                disabled: true,
                priceChange: 15,
                valid_item_index: [],
              },
              {
                id: "complete",
                label: "Complete It",
                value: true,
                disabled: false,
                valid_item_index: [],
              },
            ],
          },
        },
      ],
      submenu: {
        type: "mixed",
        items: [
          {
            id: "quotes",
            label: "Number of Quotes",
            type: "counter",
            value: 0,
            // max: 2,
            valid_item_index: [],
          },
        ],
      },
    },
  },
  {
    id: "inspections",
    title: "Home Inspections",
    subtitle: "Send a licensed home inspector to a property",
    order_protection: true,
    order_protection_type: "percent",
    order_protection_value: 15,
    form: {
      title: "Home Inspection Options",
      description: "Book a licensed home inspection with 2D floor plan",
      items: [
        {
          id: "land q",
          title: "Home Inspection",
          subtitle: "Full Home Inspection + 2D Floor Plan Included.",
          protectionInvalid: true,
          price: 399,
          basePrice: null,
        },
      ],
    },
  },
  {
    id: "onDemand",
    title: "On Demand Services",
    subtitle: "Send a representative to the property for onsite purposes",
    order_protection: true,
    order_protection_type: "percent",
    order_protection_value: 4,
    form: {
      title: "On Demand Order Options",
      description: "Get boots on the ground™ for access, checks and tasks",
      items: [
        {
          id: "letterPosting",
          title: "Letter Posting",
          subtitle: "Deliver and post letters securely at the property",
          price: 70,
          basePrice: null,
        },
        {
          id: "roomMeasurements",
          title: "Room Measurements",
          subtitle: "Room by room measurements documented onsite",
          price: 70,
          basePrice: null,
        },
        {
          id: "wellnessCheck",
          title: "Wellness Check",
          subtitle: "Seller or tenant gone silent? Confirm occupancy fast.",
          price: 70,
          basePrice: null,
        },
        {
          id: "letSomeoneIn",
          title: "Let Someone In",
          subtitle: "Provide access to the property when needed",
          price: 70,
          basePrice: null,
        },
        {
          id: "documentRecording",
          title: "Document Recording",
          subtitle: "Have a document recorded at the county courthouse",
          price: 85,
          basePrice: null,
        },
        {
          id: "courierServices",
          title: "Courier Services",
          subtitle: "Have documents delivered to a property",
          price: 99,
          basePrice: null,
        },
        {
          id: "banditSign",
          title: "Bandit Sign",
          subtitle: "Install a bandit sign at a property + three pictures",
          price: 75,
          basePrice: null,
        },
      ],
      savings: 24,
      total: 160,
    },
  },
];

const discountRules = {
  photos: [
    {
      itemId: "basic",
      condition: (formData) => {
        const options = formData.selectedOptions?.photos?.basic || {};
        const res =
          !!formData.selectedItems?.photos?.basic &&
          Object.values(options).some((value) => value === true);
        // console.log("basic res", res);
        return res;
      },
    },
    {
      itemId: "landview",
      condition: (formData) => {
        const options = formData.selectedOptions?.photos?.landview || {};
        return (
          !!formData.selectedItems?.photos?.landview &&
          Object.values(options).some((value) => value === true)
        );
      },
    },
    {
      itemId: "premium30",
      condition: (formData) => {
        const options = formData.selectedOptions?.photos?.premium30 || {};
        return (
          !!formData.selectedItems?.photos?.premium30 &&
          Object.values(options).some((value) => value === true)
        );
      },
    },
    {
      itemId: "premium50",
      condition: (formData) => {
        const options = formData.selectedOptions?.photos?.premium50 || {};
        return (
          !!formData.selectedItems?.photos?.premium50 &&
          Object.values(options).some((value) => value === true)
        );
      },
    },
  ],
  notary: [
    {
      itemId: "inperson",
      condition: (formData) => {
        const notaryOptions = formData.selectedOptions?.notary || {};
        // Check page count from submenu: pages20_75 = true => <=15 pages, pages75_150 = true => >15
        if (!formData.selectedItems?.notary?.inperson) return false;
        if (notaryOptions.pages20_75 || notaryOptions.pages75_150) return true;
        return false; // only qualify if pages <= 15
      },
    },
  ],
  onDemand: [
    {
      itemId: "documentRecording",
      condition: (formData) =>
        !!formData.selectedItems?.onDemand?.documentRecording,
    },
    {
      itemId: "letterPosting",
      condition: (formData) =>
        !!formData.selectedItems?.onDemand?.letterPosting,
    },
  ],
  lockboxes: [
    {
      itemId: "standard", // Lockbox - 48 hours
      condition: (formData) => !!formData.selectedItems?.lockboxes?.standard,
      discountBaseRate: 15,
    },
    {
      itemId: "sameday", // Lockbox - Same day
      condition: (formData) => !!formData.selectedItems?.lockboxes?.sameday,
      discountBaseRate: 45,
    },
    {
      itemId: "removal", // Lockbox removal (if you add it later)
      condition: (formData) => !!formData.selectedItems?.lockboxes?.removal,
    },
    {
      itemId: "changecode",
      condition: (formData) => !!formData.selectedItems?.lockboxes?.changecode,
    },
  ],

  onDemandExtras: [
    {
      itemId: "roomMeasurements",
      condition: (formData) =>
        !!formData.selectedItems?.onDemand?.roomMeasurements,
    },
  ],
};

const discountLevels = [
  { items: 2, percent: 20 },
  { items: 3, percent: 30 },
  { items: 4, percent: 40 },
  { items: 5, percent: 50 },
  { items: 6, percent: 60 },
];

const AlaCartePage = ({ formData = {}, handleChange, onNext, onPrev }) => {
  const [error, setError] = useState("");
  const [services, setServices] = useState(SERVICES);
  const [openItem, setOpenItem] = useState(null);
  const [includeModal, setIncludeModal] = useState(null);
  const [learnModal, setLearnModal] = useState(false);
  const [levels, _] = useState(discountLevels);
  const [modalOptionState, setModalOptionState] = useState(null);
  const totalLevels = levels.length;
  // const [modalValues, setModalValues] = useState({});

  // useEffect(() => {
  //   console.log("🔄 services state updated:", services);
  // }, [services]);

  // useEffect(() => {
  //   console.log("🔄 formData updated:", formData);
  // }, [formData]);

  const handlelearnModal = () => {
    return setLearnModal((state) => !state);
  };

  const handleValidation = () => {
    // console.log("Inside Validation");
    // console.log(JSON.stringify(formData, null, 3));
    setError("");

    let newFormData = { ...formData };

    const a_la_carteOrder = [];
    // newFormData.order_protection = formData.selectedOptions?.order_protection || false
    // console.log("order protection",formData.selectedOptions?.order_protection)

    // newFormData.discountStatus = formData.selectedItemOptions?.progress || {}
    services.forEach((service) => {
      const selectedServiceItems = formData.selectedItems?.[service.id] || {};
      const selectedItemIds = Object.keys(selectedServiceItems).filter(
        (k) => selectedServiceItems[k] === true
      );

      if (selectedItemIds.length === 0) return;

      const serviceCopy = {
        id: service.id,
        title: service.title,
        subtitle: service.subtitle,
        form: {
          ...service.form,
          items: [],
        },
      };

      service.form?.items?.forEach((item) => {
        if (selectedItemIds.includes(item.id)) {
          let itemCopy = { ...item };

          // Merge in selected options if any
          const selectedItemOptions =
            formData.selectedOptions?.[service.id]?.[item.id];

          if (selectedItemOptions) {
            itemCopy = {
              ...itemCopy,
              options: {
                ...item.options,
                items: item.options?.items?.map((opt) => ({
                  ...opt,
                  value: !!selectedItemOptions[opt.id],
                })),
              },
            };
          }

          serviceCopy.form.items.push(itemCopy);
        }
      });

      // Merge service-level options/submenu (if selected)
      const serviceOptions = formData.selectedOptions?.[service.id];
      if (serviceOptions) {
        if (serviceCopy.form?.options?.items?.length) {
          serviceCopy.form.options.items = serviceCopy.form.options.items.map(
            (opt) => ({
              ...opt,
              value: !!serviceOptions[opt.id],
            })
          );
        }

        if (serviceCopy.form?.submenu?.items?.length) {
          serviceCopy.form.submenu.items = serviceCopy.form.submenu.items.map(
            (sub) => ({
              ...sub,
              value:
                sub.type === "counter"
                  ? serviceOptions[sub.id] || 0
                  : !!serviceOptions[sub.id],
            })
          );
        }
      }

      a_la_carteOrder.push(serviceCopy);
    });

    newFormData.a_la_carteOrder = a_la_carteOrder;

    console.log("✅ Built newFormData", JSON.stringify(newFormData, null, 2));
    console.log("Services", JSON.stringify(services, null, 2));

    // Save and move forward
    handleChange({ replaceFormData: true, value: newFormData });
    onNext();
  };

  // Open modal for a service item
  const handleModalOption = (serviceId, itemId, modalOption, isSelected) => {
    const service = services.find((s) => s.id === serviceId);
    if (!service) {
      console.warn("❌ No service found for serviceId:", serviceId);
      return;
    }

    // If unselecting → just deselect and exit
    if (!isSelected) {
      handleItemSelection(serviceId, itemId, false);
      return;
    }

    // Prefill from service.form.modalOption.form values
    const existingValues = (service.form?.modalOption?.form || []).reduce(
      (acc, field) => {
        if (field.value !== undefined) acc[field.label] = field.value;
        return acc;
      },
      {}
    );

    setModalOptionState({
      serviceId,
      itemId,
      existingValues,
      service,
    });
  };

  // Handle modal submission
  const handleModalSubmit = (success, errorMsg, modalValues) => {
    if (!success) {
      console.warn("❌ Modal submission failed:", errorMsg);
      return;
    }

    const { serviceId, itemId } = modalOptionState;

    // 1️⃣ Mirror into formData for backend payload
    const newModalValues = {
      ...formData.modalValues,
      [serviceId]: {
        ...formData.modalValues?.[serviceId],
        [itemId]: modalValues,
      },
    };

    handleChange({
      name: "modalValues",
      value: newModalValues,
    });

    //  Mark item as selected and merge modal values into services

    handleItemSelection(serviceId, itemId, true, modalValues);

    //  Close modal

    setModalOptionState(null);
  };

  const handleIncludeModal = (id = null) => {
    return setIncludeModal((state) => {
      return state ? null : id;
    });
  };
  const handleItemSelection = (
    serviceId,
    itemId,
    selected,
    modalValues = null
  ) => {
    const prevSelections = formData.selectedItems?.[serviceId] || {};
    const newSelections = { ...prevSelections, [itemId]: selected };

    let newFormData = { ...formData };

    // Ensure serviceType
    if (newFormData.serviceType !== "a_la_carte") {
      newFormData.serviceType = "a_la_carte";
    }

    // Update selectedItems
    newFormData.selectedItems = {
      ...newFormData.selectedItems,
      [serviceId]: newSelections,
    };

    const service = services.find((s) => s.id === serviceId);
    const item = service?.form?.items?.find((i) => i.id === itemId);

    if (service?.order_protection) {
      handleProtectionToggle(service?.order_protection, service);
    }

    // Default item options
    if (selected && item?.options?.items?.length) {
      const prevItemOptions =
        newFormData.selectedOptions?.[serviceId]?.[itemId] || {};
      const defaultItemOptions = {};

      item.options.items.forEach((opt) => {
        defaultItemOptions[opt.id] =
          prevItemOptions[opt.id] ?? opt.value ?? false;
      });

      newFormData.selectedOptions = {
        ...newFormData.selectedOptions,
        [serviceId]: {
          ...newFormData.selectedOptions?.[serviceId],
          [itemId]: defaultItemOptions,
        },
      };
    }

    // Default service-level options
    if (selected && Object.values(prevSelections).every((v) => !v)) {
      if (service?.form) {
        let defaultOptions = {};

        if (service.form.options?.items?.length) {
          service.form.options.items.forEach((opt) => {
            defaultOptions[opt.id] = opt.value ?? false;
          });
        }

        if (service.form.submenu?.items?.length) {
          service.form.submenu.items.forEach((sub) => {
            defaultOptions[sub.id] =
              sub.value ?? (sub.type === "counter" ? 0 : false);
          });
        }

        if (Object.keys(defaultOptions).length > 0) {
          newFormData.selectedOptions = {
            ...newFormData.selectedOptions,
            [serviceId]: {
              ...newFormData.selectedOptions?.[serviceId],
              ...defaultOptions,
            },
          };
        }
      }
    }

    // ✅ Merge modal values directly into services state
    if (modalValues) {
      setServices((prev) =>
        prev.map((s) =>
          s.id === serviceId
            ? {
                ...s,
                form: {
                  ...s.form,
                  modalOption: {
                    ...s.form.modalOption,
                    form: s.form.modalOption.form.map((field) => ({
                      ...field,
                      value:
                        modalValues[field.label] !== undefined
                          ? modalValues[field.label]
                          : field.value,
                    })),
                  },
                },
              }
            : s
        )
      );
    }

    // Always keep order_protection true

    // Discount progress
    const qualifiedCount = countQualifiedDiscounts(newFormData);
    const currentIndex = levels.findIndex(
      (lvl) => lvl.items === qualifiedCount
    );
    const fillPercent = ((currentIndex + 1) / totalLevels) * 100;
    const currentPercent = currentIndex >= 0 ? levels[currentIndex].percent : 0;

    newFormData.progress = {
      qualifiedCount,
      currentIndex,
      fillPercent,
      currentPercent,
    };

    // Recalculate totals
    const calculationResult = calculateCartTotals(newFormData, services);
    newFormData = calculationResult.nextFormData;
    console.log(newFormData);
    return newFormData;
  };

  // 🔄 Shared recalculation logic
  const recalculateServicePrices = (serviceId, nextFormData, services) => {
    const originalService = SERVICES.find((s) => s.id === serviceId);
    if (!originalService) {
      console.warn("❌ No service found for serviceId:", serviceId);
      return services;
    }

    const serviceOptions = nextFormData.selectedOptions?.[serviceId] || {};

    const recalculatedItems = originalService.form.items.map((item) => {
      const basePrice = item.basePrice ?? item.price;
      let finalPrice = basePrice;

      // --- 1) Handle item option-based price changes first
      if (item.options?.items?.length) {
        const itemOptions = serviceOptions[item.id] || {};
        const activeOptionIds = Object.keys(itemOptions).filter(
          (k) => itemOptions[k]
        );

        if (activeOptionIds.length === 1) {
          const activeOpt = item.options.items.find(
            (opt) => opt.id === activeOptionIds[0]
          );
          if (activeOpt?.priceChange) {
            finalPrice = activeOpt.priceChange;
          }
        } else if (activeOptionIds.length === 0) {
          finalPrice = basePrice;
        }
      }

      // --- 2) Handle submenu-based price changes next
      if (item.submenuPriceChange) {
        console.log(
          `🔎 Checking submenuPriceChange for item "${item.id}" (basePrice=${basePrice})`
        );

        // Only iterate price-change keys defined for this item
        let accumulatedAdd = 0;

        Object.keys(item.submenuPriceChange).forEach((optId) => {
          const change = item.submenuPriceChange[optId];
          const isActive = serviceOptions[optId];

          // nicer, safe logging of isActive
          let isActiveLog;
          try {
            isActiveLog = JSON.stringify(isActive);
          } catch (e) {
            isActiveLog = String(isActive);
          }

          console.log(
            `   ➡️ Option "${optId}" | isActive=${isActiveLog} | change=`,
            change
          );

          // skip if no change definition (shouldn't happen since iterating change keys) or inactive
          if (!change) {
            console.log(`      ⏩ No change config for "${optId}", skipping`);
            return;
          }
          if (!isActive && isActive !== 0) {
            // treat 0 as possible valid numeric value
            console.log(`      ⏩ Option "${optId}" not active, skipping`);
            return;
          }

          // Accumulate effects
          if (change.type === "add") {
            accumulatedAdd += Number(change.value || 0);
            console.log(
              `      ➕ Accumulate ADD: +${change.value} (acc=${accumulatedAdd})`
            );
          } else if (change.type === "multiple") {
            // Multiples expect a numeric isActive (count)
            if (typeof isActive === "number") {
              const add = Number(change.value || 0) * isActive;
              accumulatedAdd += add;
            } else {
              console.log(
                `      ⚠️ MULTIPLE expected numeric active value but got: ${isActiveLog}; skipping`
              );
            }
          } else {
            console.log(
              `      ⚠️ Unknown change.type "${change.type}" for "${optId}", skipping`
            );
          }
        });

        finalPrice = basePrice + accumulatedAdd;
      }

      return { ...item, price: finalPrice };
    });

    return services.map((s) =>
      s.id === serviceId
        ? { ...s, form: { ...s.form, items: recalculatedItems } }
        : s
    );
  };

  // 🟦 Refactored handleOptionChange
  const handleOptionChange = (
    serviceId,
    optionId,
    value,
    type,
    name,
    itemId
  ) => {
    const nextFormData = { ...formData };
    const service = services.find((s) => s.id === serviceId);
    const item = itemId
      ? service?.form?.items?.find((i) => i.id === itemId)
      : null;

    // Get previous options
    const prevOptions = itemId
      ? formData.selectedOptions?.[serviceId]?.[itemId] || {}
      : formData.selectedOptions?.[serviceId] || {};

    let newOptions = { ...prevOptions };

    // Handle radio reset
    if (type === "radio" && name && item) {
      item.options?.items
        .filter((o) => o.type === "radio" && o.name === name)
        .forEach((o) => (newOptions[o.id] = false));
    }

    // Update clicked option
    newOptions[optionId] = value;

    const trueOptionIds = Object.keys(newOptions).filter((k) => newOptions[k]);
    const trueOptionsCount = trueOptionIds.length;

    if (itemId) {
      const minRequired = item?.options?.minimumRequired;

      if (minRequired && trueOptionsCount < minRequired) {
        // ❌ Below minimum requirement → remove item completely
        if (nextFormData.selectedOptions?.[serviceId]?.[itemId]) {
          delete nextFormData.selectedOptions[serviceId][itemId];
          if (!Object.keys(nextFormData.selectedOptions[serviceId]).length) {
            delete nextFormData.selectedOptions[serviceId];
          }
        }
        if (nextFormData.selectedItems?.[serviceId]?.[itemId]) {
          delete nextFormData.selectedItems[serviceId][itemId];
          if (!Object.keys(nextFormData.selectedItems[serviceId]).length) {
            delete nextFormData.selectedItems[serviceId];
          }
        }
      } else {
        // ✅ Save updated options (meets or exceeds min requirement,
        // or no minRequired defined, so deselection allowed)
        nextFormData.selectedOptions = {
          ...nextFormData.selectedOptions,
          [serviceId]: {
            ...nextFormData.selectedOptions?.[serviceId],
            [itemId]: newOptions,
          },
        };
      }
    }

    // 🔄 Recalculate with unified logic
    const updatedServices = recalculateServicePrices(
      serviceId,
      nextFormData,
      services
    );

    handleChange({ replaceFormData: true, value: nextFormData });
    setServices(updatedServices);
    calculateCartTotals(nextFormData, updatedServices);
  };

  // 🟦 Refactored handleSubmenuChange
  const handleSubmenuChange = (serviceId, optionId, value, type, name) => {
    let nextFormData = { ...formData };

    let prevOptions = nextFormData.selectedOptions?.[serviceId] || {};
    let newOptions = { ...prevOptions };

    // --- Handle radio groups (reset siblings)
 if (type === "radio" && name) {
  const originalService = SERVICES.find((s) => s.id === serviceId);
  originalService?.form?.submenu?.items
    ?.filter((opt) => opt.type === "radio" && opt.name === name)
    .forEach((opt) => {
      newOptions[opt.id] = false; // reset siblings
    });
}

    // --- Apply new selection
    newOptions[optionId] = value;

    // --- Remove submenu group if all values are falsy/zero
    const activeKeys = Object.keys(newOptions).filter(
      (key) => newOptions[key] && newOptions[key] !== 0
    );

    if (activeKeys.length === 0) {
      const updatedSelectedOptions = { ...nextFormData.selectedOptions };
      delete updatedSelectedOptions[serviceId];
      nextFormData.selectedOptions = updatedSelectedOptions;
    } else {
      nextFormData.selectedOptions = {
        ...nextFormData.selectedOptions,
        [serviceId]: newOptions,
      };
    }

    // 🔄 Recalculate with unified logic
    const updatedServices = recalculateServicePrices(
      serviceId,
      nextFormData,
      services
    );

    handleChange({ replaceFormData: true, value: nextFormData });
    setServices(updatedServices);
    calculateCartTotals(nextFormData, updatedServices);
  };

  const handleProtectionToggle = (checked = null, service) => {
    // --- Update formData
    const newFormData = { ...formData };

    // Ensure structure
    if (!newFormData.orderProtection) {
      newFormData.orderProtection = {};
    }

    if (checked) {
      newFormData.orderProtection[service.id] = {
        enabled: true,
        type: service.order_protection_type,
        value: service.order_protection_value,
      };
    } else {
      // If unchecked → remove entry
      const copy = { ...newFormData.orderProtection };
      delete copy[service.id];
      newFormData.orderProtection = copy;
    }

    // --- Update services state so checkbox reflects
    const updatedServices = services.map((s) =>
      s.id === service.id ? { ...s, order_protection: checked } : s
    );

    // console.log("updated formdata",JSON.stringify(newFormData, null, 3))
    handleChange({ replaceFormData: true, value: newFormData });
    setServices(updatedServices);
    calculateCartTotals(newFormData, updatedServices);
  };

  const calculateCartTotals = (formData, services) => {
    let rawCartTotal = 0;
    let cartTotal = 0;
    let cartSavings = 0;
    let totalProtection = 0;
    const serviceTotals = {};
    const nextFormData = { ...formData };

    // Step 1: loop services
    services.forEach((service) => {
      const serviceSelections = formData.selectedItems?.[service.id] || {};
      const selectedItems =
        service.form?.items?.filter((item) => serviceSelections[item.id]) || [];

      let subtotal = 0;
      let subsavings = 0;
      let protectionAmount = 0;

      // ✅ include items container
      serviceTotals[service.id] = {
        subtotal: 0,
        protectionAmount: 0,
        subsavings: 0,
        items: {},
      };

      selectedItems.forEach((item) => {
        let itemPrice = item.price || 0;
        let originalPrice = itemPrice;

        rawCartTotal += itemPrice;

        // --- Item-level discount check ---
        let isEligible = false;
        const rules = discountRules[service.id] || [];
        const ruleForItem = rules.find((rule) => rule.itemId === item.id);
        if (ruleForItem && ruleForItem.condition(formData)) {
          isEligible = true;
        }

        let discountApplied = 0;
        if (isEligible) {
          const qualifiedCount = countQualifiedDiscounts(formData); // total eligible items
          const discountLevel =
            [...discountLevels]
              .reverse()
              .find((lvl) => qualifiedCount >= lvl.items) || null;

          if (discountLevel) {
            discountApplied = (itemPrice * discountLevel.percent) / 100;
            itemPrice -= discountApplied;
            subsavings += discountApplied;
          }
        }

        subtotal += itemPrice;

        // ✅ save per-item totals
        serviceTotals[service.id].items[item.id] = {
          originalPrice: Number(originalPrice.toFixed(2)),
          discountedPrice: Number(itemPrice.toFixed(2)),
          discountApplied: Number(discountApplied.toFixed(2)),
        };
      });

      // Step 1.5: Apply order protection if enabled
      if (service.order_protection && subtotal > 0) {
        if (service.order_protection_type === "percent") {
          protectionAmount = (subtotal * service.order_protection_value) / 100;
        } else if (service.order_protection_type === "flat") {
          protectionAmount = service.order_protection_value;
        }
        subtotal += protectionAmount;
        totalProtection += protectionAmount;
      }

      // Store service totals
      serviceTotals[service.id].subtotal = Number(subtotal.toFixed(2));
      serviceTotals[service.id].protectionAmount = Number(
        protectionAmount.toFixed(2)
      );
      serviceTotals[service.id].subsavings = Number(subsavings.toFixed(2));

      cartTotal += subtotal;
      cartSavings += subsavings;
    });

    // Step 2: Round totals
    cartTotal = Number(cartTotal.toFixed(2));
    cartSavings = Number(cartSavings.toFixed(2));
    totalProtection = Number(totalProtection.toFixed(2));

    // Step 3: Flip off order_protection if all protections are zero
    const allProtectionZero = Object.values(serviceTotals).every(
      (s) => s.protectionAmount === 0
    );
    // console.log("serviceTotals",JSON.stringify(serviceTotals, null, 3))

    nextFormData.cartTotal = cartTotal;
    nextFormData.cartSavings = cartSavings;
    nextFormData.serviceTotals = serviceTotals;
    nextFormData.order_protection = !allProtectionZero;
    nextFormData.order_protection_price = totalProtection;

    // Commit
    handleChange({ replaceFormData: true, value: nextFormData });
    console.log(nextFormData);
    return {
      cartTotal,
      cartSavings,
      totalProtection,
      serviceTotals,
      order_protection: !allProtectionZero,
      nextFormData,
    };
  };

  const countQualifiedDiscounts = (formData, serviceId = null) => {
    let qualifiedCount = 0;

    // If serviceId is passed → only use that slice of rules
    const servicesToCheck = serviceId
      ? { [serviceId]: discountRules[serviceId] || [] }
      : discountRules;

    Object.entries(servicesToCheck).forEach(([svcId, rules]) => {
      rules.forEach((rule) => {
        try {
          if (rule.condition(formData)) {
            qualifiedCount += 1;
          }
        } catch (err) {
          console.warn(
            `Error evaluating discount rule for ${svcId}:${rule.itemId}`,
            err
          );
        }
      });
    });

    return qualifiedCount;
  };

  const RenderServiceForm = ({ service, open }) => {
    // console.log("render service", JSON.stringify(service, null, 3))

    return (
      <>
        <div className="flex flex-col min-h-0 border-2 border-gray-200 bg-white flex-1">
          <div className=" grid grid-cols-1 gap-1 md:gap-1.5 md:grid-cols-3 p-4 h-full w-full flex-1 ">
            {/* Bundle and Protection section */}
            <div className="col-span-1 md:col-span-2 flex flex-col h-full w-full items-center justify-between mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Left Title */}
                <h3 className="text-left text-md font-bold text-main">
                  {service?.form?.title}
                </h3>

                {/* Right Link */}
                <button
                  type="button"
                  className="flex items-center justify-end gap-2 text-gray-700 hover:text-primary hover:cursor-pointer transition-colors"
                  onClick={() => handleIncludeModal(service.id)}
                >
                  <PlusCircle className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">What's Included</span>
                </button>
              </div>
              {/* service grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {service.form.items.map((item) => {
                  const isSelected =
                    formData.selectedItems?.[service.id]?.[item.id] || false;

                  return (
                    <label
                      key={item.id}
                      className={`text-left transition-all relative block cursor-pointer border shadow-sm p-4
     
        ${
          isSelected
            ? "border-primary ring-2 ring-primary label-active-gradient text-inverse"
            : "border-gray-200 hover:border-gray-300"
        }
      `}
                    >
                      {/* Hidden Checkbox */}
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {
                          const serviceHasModal = service.form?.modalOption;
                          return serviceHasModal
                            ? handleModalOption(
                                service.id,
                                item.id,
                                service.form.modalOption,
                                !isSelected
                              )
                            : handleItemSelection(
                                service.id,
                                item.id,
                                !isSelected
                              );
                        }}
                        className="absolute opacity-0 pointer-events-none hidden"
                      />

                      <div className="font-semibold mb-1">{item.title}</div>

                      <p
                        className={`text-xs py-2 ${
                          isSelected ? "text-inverse/80" : "text-gray-600"
                        }`}
                      >
                        {item.subtitle}
                      </p>
                      <div className="flex items-baseline gap-3">
                        {item.basePrice && (
                          <span
                            className={`text-sm line-through ${
                              isSelected ? "text-inverse/80" : "text-gray-400"
                            }`}
                          >
                            ${item.basePrice}
                          </span>
                        )}
                        <span
                          className={`text-lg font-bold ${
                            isSelected ? "text-inverse" : "text-primary"
                          }`}
                        >
                          {item.price === "xx" ? "$xx" : `$${item.price}`}
                        </span>
                      </div>
                    </label>
                  );
                })}
              </div>

              {/* Submenu for additional options (like for notary service) */}
              {service.form.submenu && (
                <div className=" pt-4 mt-4">
                  <div className="grid grid-cols-2 gap-3">
                    {service.form.submenu.items.map((submenuItem) => {
                      const currentValue =
                        formData.selectedOptions?.[service.id]?.[
                          submenuItem.id
                        ] ?? submenuItem.value;

                      return (
                        <label
                          key={submenuItem.id}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          {submenuItem.type === "counter" ? (
                            // 🔹 Counter with Number Input
                            <div className="flex items-center gap-2">
                              <span className="text-sm">
                                {submenuItem.label}:
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  handleSubmenuChange(
                                    service.id,
                                    submenuItem.id,
                                    Math.max(0, currentValue - 1),
                                    "counter"
                                  )
                                }
                                className="w-6 h-6 bg-gray-200 rounded text-sm"
                              >
                                -
                              </button>

                              {/* Middle number input */}
                              <input
                                type="number"
                                value={currentValue}
                                min={0}
                                max={submenuItem.max ?? 99}
                                onChange={(e) => {
                                  let newVal = parseInt(e.target.value, 10);
                                  if (isNaN(newVal)) newVal = 0;
                                  if (submenuItem.max !== undefined) {
                                    newVal = Math.min(newVal, submenuItem.max);
                                  }
                                  handleSubmenuChange(
                                    service.id,
                                    submenuItem.id,
                                    newVal,
                                    "counter"
                                  );
                                }}
                                className="w-12 text-center border rounded text-sm"
                              />

                              <button
                                type="button"
                                onClick={() =>
                                  handleSubmenuChange(
                                    service.id,
                                    submenuItem.id,
                                    submenuItem.max
                                      ? Math.min(
                                          submenuItem.max,
                                          currentValue + 1
                                        )
                                      : currentValue + 1,
                                    "counter"
                                  )
                                }
                                className="w-6 h-6 bg-gray-200 rounded text-sm"
                              >
                                +
                              </button>
                            </div>
                          ) : submenuItem.type === "radio" ? (
                            // 🔹 Radio
                            <>
                              <input
                                type="checkbox"
                                checked={!!currentValue}
                                onChange={(e) => {
                                  const newValue = e.target.checked;

                                  // If already selected and clicked again → deselect (none selected)
                                  if (currentValue && !newValue) {
                                    handleSubmenuChange(
                                      service.id,
                                      submenuItem.id,
                                      false,
                                      "radio",
                                      submenuItem.name
                                    );
                                  } else {
                                    // Selecting → reset group first, then activate only this one
                                    handleSubmenuChange(
                                      service.id,
                                      submenuItem.id,
                                      true,
                                      "radio",
                                      submenuItem.name
                                    );
                                  }
                                }}
                                className="w-4 h-4 text-blue-600 border-2 border-gray-300 rounded"
                              />
                              <span className="text-sm">
                                {submenuItem.label}
                              </span>
                            </>
                          ) : (
                            // 🔹 Checkbox
                            <>
                              <input
                                type="checkbox"
                                checked={!!currentValue}
                                onChange={(e) =>
                                  handleSubmenuChange(
                                    service.id,
                                    submenuItem.id,
                                    e.target.checked,
                                    "checkbox"
                                  )
                                }
                                className="w-4 h-4 text-blue-600 border-2 border-gray-300 rounded"
                              />
                              <span className="text-sm">
                                {submenuItem.label}
                              </span>
                            </>
                          )}
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Order Protection row */}
              {(() => {
                return (
                  <label
                    className={`w-full mt-auto flex items-center justify-between gap-2 border px-3 py-3 bg-card 
        
        cursor-pointer
        
        border-gray-300 rounded-md`}
                  >
                    <div className="flex items-center justify-start gap-4">
                      <input
                        type="checkbox"
                        className="accent-primary"
                        // checked={!!formData.order_protection}
                        checked={service?.order_protection}
                        onChange={(e) => {
                          handleProtectionToggle(e.target.checked, service);
                        }}
                        disabled={!service?.order_protection_value}
                      />
                      <span
                        className={`font-medium ${
                          !service?.order_protection
                            ? "text-gray-600 hover:text-black"
                            : "text-gray-700 hover:text-black"
                        }`}
                      >
                        Order Protection
                      </span>
                      <span className="text-[#0bc88c] font-semibold ml-1">
                        {/* ${ORDER_PROTECTION_PRICE} */}
                        {formData?.serviceTotals?.[service.id]?.protectionAmount
                          ? `$${
                              formData?.serviceTotals?.[service.id]
                                ?.protectionAmount
                            }`
                          : ""}
                      </span>
                    </div>

                    <button
                      type="button"
                      className={`flex items-center justify-end gap-2 transition-colors 
          ${
            !service?.order_protection
              ? "text-gray-400 hover:text-black"
              : "text-gray-700 hover:text-black"
          }`}
                      onClick={handlelearnModal}
                      disabled={false}
                    >
                      <span className="text-sm font-medium">Learn More</span>
                    </button>
                  </label>
                );
              })()}
            </div>

            <div className="flex flex-col justify-end justify-self-end w-full h-full flex-1">
              {/* 🔹 Service-level options */}
              {service.form.options &&
                service.form.options.type === "checkbox" && (
                  <div className="gap-4 mt-4 mb-6 pb-5">
                    {service.form.options.items.map((option) => (
                      <label
                        key={option.id}
                        className="flex items-center gap-2 cursor-pointer my-3"
                      >
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={
                              formData.selectedOptions?.[service.id]?.[
                                option.id
                              ] ?? option.value
                            }
                            onChange={(e) =>
                              handleOptionChange(
                                service.id,
                                option.id,
                                e.target.checked
                              )
                            }
                            className="w-4 h-4 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500"
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
                )}

              {/* 🔹 Item-level options (only render for selected items) */}
              {service.form.items?.map((item) =>
                formData.selectedItems?.[service.id]?.[item.id]
                  ? item.options?.type === "checkbox" && (
                      <div
                        key={`item-options-${item.id}`}
                        className={`gap-4 mt-2 mb-4 ml-4`}
                      >
                        <p
                          className="text-xs text-start
                         font-semibold text-gray-500 mb-2"
                        >
                          {item.title} Options
                        </p>
                        {item.options.items.map((option) => (
                          <label
                            key={option.id}
                            className={`flex items-center gap-2  my-2 ${
                              option.disabled
                                ? "cursor-not-allowed"
                                : "cursor-pointer"
                            }`}
                          >
                            <div className="relative">
                              <input
                                type="checkbox"
                                checked={
                                  formData.selectedOptions?.[service.id]?.[
                                    item.id
                                  ]?.[option.id] ?? option.value
                                }
                                disabled={option.disabled}
                                onChange={(e) =>
                                  handleOptionChange(
                                    service.id,
                                    option.id,
                                    e.target.checked,
                                    "checkbox",
                                    null,
                                    item.id
                                  )
                                }
                                className={`w-4 h-4 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500 ${
                                  option.disabled
                                    ? "cursor-not-allowed opacity-50"
                                    : ""
                                }`}
                              />
                            </div>
                            <span
                              className={`text-sm text-gray-700${
                                option.disabled
                                  ? "cursor-not-allowed opacity-50"
                                  : ""
                              }`}
                            >
                              {option.label}
                            </span>
                          </label>
                        ))}
                      </div>
                    )
                  : null
              )}

              {/* 🔹 Totals + Cart */}
              <div className="flex w-full flex-col justify-end justify-self-end">
                <div className="border-t pt-4">
                  <div className="flex flex-col justify-between w-full">
                    <div className="w-full text-sm">
                      <div className="flex justify-between text-green-600 font-semibold">
                        Savings{" "}
                        <span className="text-end">
                          $
                          {formData?.serviceTotals?.[service.id]?.subsavings ||
                            0}
                        </span>
                      </div>
                      <div className="flex justify-between text-main font-bold">
                        Total{" "}
                        <span className="text-end">
                          $
                          {formData?.serviceTotals?.[service.id]?.subtotal || 0}
                        </span>
                      </div>
                    </div>
                    <AccordionPrimitive.Trigger asChild>
                      <button className="w-full px-4 py-2 bg-emerald-500 text-white font-semibold hover:bg-emerald-600">
                        Add to Cart
                      </button>
                    </AccordionPrimitive.Trigger>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  const ServiceModal = () => {
    // Find the service modal by id
    const service = IndModals.find((item) => item.id === includeModal);

    // If not found, fallback
    if (!service) {
      return (
        <ModalWrapper handleClose={handleIncludeModal}>
          <div className="p-4 text-center text-sm text-muted-foreground">
            No modal found for service:{" "}
            <span className="font-mono">{includeModal}</span>
          </div>
        </ModalWrapper>
      );
    }

    return (
      <ModalWrapper handleClose={handleIncludeModal}>
        {service.modal}
      </ModalWrapper>
    );
  };
  return (
    <>
      {learnModal && <OrderProtectionModal handleClose={handlelearnModal} />}
      {modalOptionState && (
        <ServiceOptionModal
          service={modalOptionState.service}
          itemId={modalOptionState.itemId}
          existingValues={modalOptionState.existingValues}
          onSubmit={handleModalSubmit}
          onClose={() => setModalOptionState(null)}
          formData={formData}
        />
      )}

      {includeModal && <ServiceModal />}
      <div className="w-full max-w-2xl mx-auto">
        <div className="w-full relative">
          {/* Progress Bar Container */}
          <div className="relative w-full h-3 overflow-hidden bg-gray-100">
            {/* Filled portion */}
            <div
              className="h-full bg-emerald-500 transition-all duration-300"
              style={{ width: `${formData.progress?.fillPercent || 0}%` }}
            />

            {/* Divider Lines */}
            <div className="absolute inset-0 flex">
              {levels.slice(0, -1).map((_, idx) => (
                <div key={idx} className="flex-1 relative">
                  <div className="absolute right-0 top-0 bottom-0 w-px bg-gray-200" />
                </div>
              ))}
            </div>
          </div>

          {/* Text */}
          <p className="mt-2 text-start text-sm text-gray-700">
            You’re saving an additional{" "}
            <span className="font-semibold text-emerald-600">
              {formData.progress?.currentPercent || 0}%
            </span>
          </p>
        </div>
        <Accordion
          type="single"
          collapsible
          className="w-full"
          value={openItem}
          onValueChange={setOpenItem}
        >
          {services.map((service) => {
            // console.log(`Inside Accordion ${openItem}`);
            return (
              <AccordionItem
                key={service.id}
                value={service.id}
                className="px-2"
              >
                <AccordionTrigger
                  className="hover:no-underline p-0"
                  actionText={
                    Object.values(
                      formData?.selectedItems?.[service.id] ?? {}
                    ).some(Boolean)
                      ? "In Cart"
                      : "Configure"
                  }
                  subtext="Instant savings"
                >
                  <div className="flex flex-col text-left">
                    <span className="font-semibold text-base">
                      {service.title}
                    </span>
                    <span className="text-sm hidden sm:block text-muted-foreground">
                      {service.subtitle}
                    </span>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="pt-2">
                  <RenderServiceForm
                    service={service}
                    open={openItem === service.id}
                  />
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
      <div className="w-full bg-white/90 backdrop-blur z-20 shadow-[0_-2px_8px_0_rgba(0,0,0,0.04)]  px-4 py-3 mt-4 border-t">
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

      <div className="sticky bottom-0 left-0 w-full z-20 bg-[#FAFBFD]/80 backdrop-blur-md shadow-[0_-2px_7px_-3px_rgba(0,0,0,0.25)]  px-4 py-3 mt-4">
        {error && (
          <div className="w-full max-w-2xl mx-auto mb-4">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-center text-sm">
              {error}
            </div>
          </div>
        )}

        <div className="w-full bg-white">
          {/* {JSON.stringify(formData?.modalValues, null, 3)}
          <p>modal state: {JSON.stringify(modalOptionState, null, 3)}</p> */}
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
            {/* Left - Order Subtotal */}
            <div className="md:col-span-2 flex flex-col gap-2">
              <div className="flex justify-between text-sm md:text-base font-medium text-gray-800">
                <span>Order Subtotal:</span>
                <span>${formData?.cartTotal}</span>
              </div>

              <div className="flex justify-between text-sm md:text-base font-semibold text-emerald-600">
                <span>You Saved:</span>
                <span>${formData?.cartSavings || "0"}</span>
              </div>
            </div>

            {/* Right - Checkout Button */}
            <div className="flex justify-end md:justify-center">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleValidation();
                }}
                className="w-full  px-5 py-2 bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AlaCartePage;
