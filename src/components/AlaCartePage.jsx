import { useState } from "react";
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
    action: "In Cart",

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
    action: "Configure",
    price: "$25",
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
    action: "Configure",
    price: "$25",
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
            type: "text",
            value: "",
            required: true,
          },
          {
            label: "Email",
            type: "email",
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
    action: "Configure",
    price: "$25",
  },
  {
    id: "repairs",
    title: "Home Maintenance & Repairs",
    subtitle: "Receive and approve bids for repair work on a property",
    form: {
      title: "Quotes and Bids Options",
      description: "Receive and approve bids for repair work on a property",
      items: [
        {
          id: "land q",
          title: "Landscaping Quotes",
          subtitle: "Have our team source and coordinate quote(s) for work",
          basePrice: 65,
          price: 50,
          options: {
            type: "checkbox",
            items: [
              {
                id: "bidOnly",
                label: "Bids Only",
                value: true,
                disabled: true,
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
          basePrice: 65,
          price: 50,
          options: {
            type: "checkbox",
            items: [
              {
                id: "bidOnly",
                label: "Bids Only",
                value: true,
                disabled: true,
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
    action: "Configure",
    price: "$25",
  },
  {
    id: "inspections",
    title: "Home Inspections",
    subtitle: "Send a licensed home inspector to a property",
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
    action: "Configure",
    price: "$25",
  },
  {
    id: "onDemand",
    title: "On Demand Services",
    subtitle: "Send a representative to the property for onsite purposes",
    action: "Configure",
    price: "$25",
    inCart: false,
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

const ORDER_PROTECTION_PRICE = 15;

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
  { items: 7, percent: 60 },
  { items: 8, percent: 60 },
  { items: 9, percent: 60 },
  { items: 10, percent: 60 },
  { items: 11, percent: 60 },
  { items: 12, percent: 60 },
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
  const adjustedTotal = formData.progress?.currentPercent
    ? formData.cartTotal * (formData.progress.currentPercent / 100)
    : formData.cartTotal;

  const adjustedSaving = formData.progress?.currentPercent
    ? formData.cartTotal - adjustedTotal
    : formData.cartSaving;

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

    // console.log("✅ Built newFormData", JSON.stringify(newFormData, null, 2));

    // Save and move forward
    handleChange({ replaceFormData: true, value: newFormData });
    onNext();
  };

  const handleModalOption = (serviceId, itemId, modalOption, isSelected) => {
    const service = services.find((s) => s.id === serviceId);
    if (!isSelected) {
      // existing deselect logic…
      handleItemSelection(serviceId, itemId, false);
      return;
    }

    const existingValues = formData.modalValues?.[serviceId] || {};

    setModalOptionState({
      service,
      itemId,
      existingValues, // ✅ pass down
    });

    const handleModalSubmit = (success, errorMsg, modalValues) => {
      if (!success) {
        // setError(errorMsg);
        return;
      }
      // console.log("modal value", JSON.stringify(modalValues, null, 3));
      if (modalOption.eachItem) {
        handleChange({
          name: "modalValues",
          value: {
            ...formData.modalValues,
            [serviceId]: {
              ...formData.modalValues?.[serviceId],
              [itemId]: modalValues,
            },
          },
        });
      } else {
        handleChange({
          name: "modalValues",
          value: {
            ...formData.modalValues,
            [serviceId]: modalValues,
          },
        });
      }

      handleItemSelection(serviceId, itemId, true);
      setModalOptionState(null);
    };

    setModalOptionState((prev) => ({ ...prev, onSubmit: handleModalSubmit }));
  };

  const handleIncludeModal = (id = null) => {
    return setIncludeModal((state) => {
      return state ? null : id;
    });
  };
  const handleItemSelection = (serviceId, itemId, selected) => {
    const prevSelections = formData.selectedItems?.[serviceId] || {};
    const newSelections = { ...prevSelections, [itemId]: selected };

    // start fresh copy
    let newFormData = { ...formData };

    // Ensure serviceType is a_la_carte
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

    //  If item is protectionInvalid, remove order protection
    // if (selected && item?.protectionInvalid) {
    //   if ("order_protection" in newFormData) {
    //     delete newFormData.order_protection;
    //   }
    // }

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

    // Set default service-level options on first selection

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
    newFormData.order_protection = true;
    //  Recalculate totals
    const { total, savings } = calculateCartTotals(
      {
        ...newFormData.selectedItems,
        [serviceId]: newSelections,
      },
      services,
      newFormData.order_protection
    );

    newFormData.cartTotal = total;
    newFormData.cartSaving = savings;

    // Count discounts with *fresh* formData
    const qualifiedCount = countQualifiedDiscounts(newFormData);
    // console.log(`Qualifying Count ${qualifiedCount}`);
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

    //  Commit once at the end
    handleChange({ replaceFormData: true, value: newFormData });

    //  Return updated formData in case caller needs it
    // console.log(JSON.stringify(newFormData, null, 3));
    return newFormData;
  };

const handleOptionChange = (serviceId, optionId, value, type, name, itemId) => {
  const newFormData = { ...formData };
  const service = services.find((s) => s.id === serviceId);
  const item = itemId ? service?.form?.items?.find((i) => i.id === itemId) : null;

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
  const totalOptionsCount = item?.options?.items?.length || 0;

  let updatedServices = services;

  if (itemId) {
    // Handle price changes
    const originalItem = SERVICES.find((s) => s.id === serviceId)
      ?.form?.items?.find((i) => i.id === itemId);

    if (trueOptionsCount === 1) {
      // Only one option selected → apply its priceChange
      const remainingOption = item.options.items.find((o) => o.id === trueOptionIds[0]);
      if (remainingOption?.priceChange) {
        updatedServices = services.map((s) =>
          s.id !== serviceId
            ? s
            : {
                ...s,
                form: {
                  ...s.form,
                  items: s.form.items.map((i) =>
                    i.id === itemId ? { ...i, price: remainingOption.priceChange } : i
                  ),
                },
              }
        );
      }
    } else {
      // Reset to original price when all or none selected
      updatedServices = services.map((s) =>
        s.id !== serviceId
          ? s
          : {
              ...s,
              form: {
                ...s.form,
                items: s.form.items.map((i) =>
                  i.id === itemId ? { ...i, price: originalItem?.price } : i
                ),
              },
            }
      );
    }

    // Update selectedOptions and selectedItems based on trueOptionsCount
    if (trueOptionsCount === 0) {
      // Remove this item completely
      if (newFormData.selectedOptions?.[serviceId]?.[itemId]) {
        delete newFormData.selectedOptions[serviceId][itemId];
        if (!Object.keys(newFormData.selectedOptions[serviceId]).length) {
          delete newFormData.selectedOptions[serviceId];
        }
      }
      if (newFormData.selectedItems?.[serviceId]?.[itemId]) {
        delete newFormData.selectedItems[serviceId][itemId];
        if (!Object.keys(newFormData.selectedItems[serviceId]).length) {
          delete newFormData.selectedItems[serviceId];
        }
      }
    } else {
      // Save updated options
      newFormData.selectedOptions = {
        ...newFormData.selectedOptions,
        [serviceId]: {
          ...newFormData.selectedOptions?.[serviceId],
          [itemId]: newOptions,
        },
      };
    }

    setServices(updatedServices);
  }

  // Replace formData completely
  handleChange({ replaceFormData: true, value: newFormData });
};


  const handleProtectionToggle = (checked) => {
    handleChange({ name: "order_protection", value: checked });

    const { total, savings } = calculateCartTotals(
      formData.selectedItems,
      services,
      checked
    );


  };

  const calculateCartTotals = (allSelections, allServices, orderProtection) => {
    let total = 0;
    let savings = 0;

    allServices.forEach((service) => {
      const serviceSelections = allSelections?.[service.id] || {};
      const selectedItems =
        service?.form?.items?.filter((item) => serviceSelections[item.id]) ||
        [];

      selectedItems.forEach((item) => {
        total += item.price || 0;
        if (item.basePrice && item.basePrice > item.price) {
          savings += item.basePrice - item.price;
        }
      });
    });

    // if (orderProtection) {
    //   total += ORDER_PROTECTION_PRICE;
    // }
    if (orderProtection) {
      const protectionFee = total * 0.04; // 4% of current total
      total += protectionFee;
    }
    handleChange({ name: "cartTotal", value: total });
    handleChange({ name: "cartSaving", value: savings });
    return { total, savings };
  };
 
  const countQualifiedDiscounts = (formData) => {
    let qualifiedCount = 0;

    Object.keys(discountRules).forEach((serviceId) => {
      const rules = discountRules[serviceId];
      rules.forEach((rule) => {
        try {
          if (rule.condition(formData)) {
            qualifiedCount += 1;
          }
        } catch (err) {
          console.warn(
            `Error evaluating discount rule for ${serviceId}:${rule.itemId}`,
            err
          );
        }
      });
    });

    return qualifiedCount;
  };

  const RenderServiceForm = ({ service, open }) => {

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
                                  handleOptionChange(
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
                                  handleOptionChange(
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
                                  handleOptionChange(
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
                                type="radio"
                                name={`${service.id}-${submenuItem.name}`} // group by name
                                checked={!!currentValue}
                                onChange={(e) =>
                                  handleOptionChange(
                                    service.id,
                                    submenuItem.id,
                                    e.target.checked,
                                    "radio",
                                    submenuItem.name
                                  )
                                }
                                className="w-4 h-4 text-blue-600 border-2 border-gray-300 rounded-full"
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
                                  handleOptionChange(
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
                const isDisabled = Object.entries(
                  formData.selectedItems || {}
                ).some(([serviceId, items]) => {
                  const service = services.find((s) => s.id === serviceId);
                  return Object.entries(items).some(
                    ([itemId, selected]) =>
                      selected &&
                      service?.form?.items?.find((i) => i.id === itemId)
                        ?.protectionInvalid
                  );
                });

                return (
                  <label
                    className={`w-full mt-auto flex items-center justify-between gap-2 border px-3 py-3 bg-card 
        ${
          isDisabled || false
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer"
        }
        border-gray-300 rounded-md`}
                  >
                    {/*Changed here*/}
                    <div className="flex items-center justify-start gap-2">
                      <input
                        type="checkbox"
                        className="accent-primary"
                        // checked={!!formData.order_protection}
                        checked={true}
                        // onChange={(e) =>
                        //   handleProtectionToggle(e.target.checked)
                        // }
                        disabled={isDisabled || true}
                      />
                      <span className="font-medium">Order Protection</span>
                      <span className="text-[#0bc88c] font-semibold ml-1">
                        {/* ${ORDER_PROTECTION_PRICE} */}
                        +4%
                      </span>
                    </div>

                    <button
                      type="button"
                      className={`flex items-center justify-end gap-2 transition-colors 
          ${isDisabled ? "text-gray-400" : "text-gray-700 hover:text-primary"}`}
                      onClick={handlelearnModal}
                      disabled={isDisabled}
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
                        <p className="text-xs font-semibold text-gray-500 mb-2">
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
                          ${Math.round(adjustedSaving * 100) / 100}
                        </span>
                      </div>
                      <div className="flex justify-between text-main font-bold">
                        Total{" "}
                        <span className="text-end">
                          ${Math.round(adjustedTotal * 100) / 100}
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
          onSubmit={modalOptionState.onSubmit}
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
                <span>${Math.round(adjustedTotal * 100) / 100}</span>
              </div>

              <div className="flex justify-between text-sm md:text-base font-semibold text-emerald-600">
                <span>You Saved:</span>
                <span>${Math.round(adjustedSaving * 100) / 100}</span>
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
