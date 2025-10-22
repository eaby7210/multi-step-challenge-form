import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./Accordian";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import {
  ChevronDown,
  PlusCircle,
  ShieldCheck,
  Shield,
  Check,
  XCircle,
} from "lucide-react";
import IndModals from "../config/IndividualModal";
import ModalWrapper from "./ModalWrapper";
import OrderProtectionModal from "../config/OrderProtectionModal";
import ServiceOptionModal from "../config/ServiceOptionModal";

const initServices = [
  {
    id: "photos",
    title: "Property Photos",
    subtitle: "Send a photographer to a property to take pictures",
    header: "Photographs at the speed of now",
    subheader: (
      <>
        <p>
          Fast, professional photography for your listings, projects, or
          marketing needs
        </p>
      </>
    ),
    order_protection: true,
    order_protection_type: "percent",
    order_protection_disabled: false,
    order_protection_value: 4,
    form: {
      title: "Photography Order Options",
      description: "Send a photographer to a property to take pictures",
      items: [
        {
          id: "PHbasic",
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
          id: "PHpremium30",
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
          id: "PHpremium50",
          title: "50 Premium Photos",
          subtitle: "Professionally edited, High-Definition images",
          price: 289,
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
          id: "PHlandview",
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
    header: "Lockboxes as soon as today",
    subheader: (
      <p>
        Place a lockbox with your custom code. Same day installation available.
      </p>
    ),
    order_protection: true,
    order_protection_type: "percent",
    order_protection_value: 4,
    form: {
      title: "LockBox Order Options",
      description: "Secure property access with fast lockbox setup",
      items: [
        {
          id: "LBstandard",
          title: "LockBox (48hrs)",
          subtitle: "Lockbox installed within 2 business days",
          price: 90,
          basePrice: null,
        },
        {
          id: "LBsameday",
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
      modalOption: {
        eachItem: false,
        validItem: [],
        form: [
          {
            label: "LockBox Code",
            type: "text",
            name: "lockbox",
            value: "",
            required: true,
            // valid_item_index: ["standard", ""],
          },
        ],
      },
    },
  },
  {
    id: "notary",
    title: "Notarizations & Signings",
    subtitle: "Have documents signed or notarized",
    header: "Notarizations - remote or onsite",
    subheader: (
      <p>
        Vetted & background screened notaries available for in-person or online
        signings.
      </p>
    ),
    order_protection: true,
    order_protection_type: "percent",
    order_protection_value: 4,
    form: {
      title: "Document Order Options",
      description: "Have documents signed or notarized",
      items: [
        {
          id: "NTinperson",
          title: "In-Person Notarization",
          subtitle: "Notary meets onsite to sign & notarize documents",
          price: 90,
          basePrice: null,
          options: {
            type: "checkbox",
            items: [
              {
                id: "shipDoc",
                label: "Ship Docs via FedEx",
                value: false,
                disabled: false,
                priceAdd: 15,
                valid_item_index: [],
              },
            ],
          },
          submenuPriceChange: {
            pages21_75: {
              type: "add",
              value: 30,
            },
            pages76_150: {
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
          id: "NTonline",
          title: "Online Notarization",
          subtitle: "Secure video notarization from anywhere - no travel req",
          price: 90,
          basePrice: null,
          options: {
            type: "checkbox",
            items: [
              {
                id: "shipDoc",
                label: "Ship Docs via FedEx",
                value: false,
                disabled: false,
                priceAdd: 15,
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
            id: "pages21_75",
            label: "21-75 Pages",
            value: false,
            type: "radio",
            name: "pages",
            valid_item_index: [],
          },
          {
            id: "pages76_150",
            label: "76-150 Pages",
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
    title: "Property Walkthroughs",
    subtitle: "Send a videographer to a property to record video",
    header: "Digital Property Walk-throughs",
    subheader: (
      <p>
        See every angle - interior and exterior video tours for due diligence or
        marketing.
      </p>
    ),
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
        {
          id: "drone-quote",
          title: "Drone Video Quote",
          subtitle: "Have our team obtain a quote for drone video.",
          price: 20,
          basePrice: null,
        },
        {
          id: "matterport-quote",
          title: "3D Tour Quote",
          subtitle: "Have our team obtain a quote for a 3D Matterport Tour.",
          price: 20,
          basePrice: null,
        },
        {
          id: "3d-floorplan-quote",
          title: "3D Floor Plan Quote",
          subtitle: "Have our team obtain a quote for a 3D Floor Plan.",
          price: 20,
          basePrice: null,
        },
        {
          id: "2d-floorplan-quote",
          title: "2D Floor Plan Quote",
          subtitle: "Have our team obtain a quote for a 2D Floor Plan.",
          price: 20,
          basePrice: null,
        },
      ],
    },
  },
  {
    id: "repairs",
    title: "Home Maintenance & Repairs",
    subtitle: "Receive and approve bids for repair work on a property",
    header: "Choose Your Level of Service",
    subheader: (
      <>
        <p>
          <span className="font-bold">Bid-Only</span>: We find local vendors and
          send you quotes.
        </p>
        <p>
          <span className="font-bold">Complete It</span>: We handle the work
          start-to-finish
        </p>
      </>
    ),
    order_protection: false,
    order_protection_disabled: true,
    order_protection_type: "percent",
    order_protection_value: null,
    disclosure: [
      {
        type: "info",
        message: "Quotes contingent on availability",
      },
    ],
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
          submenuPriceChange: {
            quotes: {
              type: "multiple",
              // value: 2,
            },
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
          submenuPriceChange: {
            quotes: {
              type: "multiple",
              // value: 2,
            },
          },
        },
        {
          id: "locksmith q",
          title: "Locksmith Quotes",
          subtitle:
            "Have our team source and coordinate locksmith service quotes",
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
          submenuPriceChange: {
            quotes: {
              type: "multiple",
              // value: 2,
            },
          },
        },
        // ✅ New Handyman Quotes
        {
          id: "handyman q",
          title: "Handyman Quotes",
          subtitle:
            "Have our team source and coordinate handyman service quotes",
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
          submenuPriceChange: {
            quotes: {
              type: "multiple",
              // value: 2,
            },
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
            value: 1,
            max: 4,
            min: 1,
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
    header: "Licensed Home Inspections",
    subheader: (
      <p>Book a licensed local home inspection with 2D floor plan included. </p>
    ),
    order_protection: true,
    order_protection_type: "percent",

    order_protection_value: null,
    form: {
      title: "Home Inspection Options",
      description: "Book a licensed home inspection with 2D floor plan",
      items: [
        {
          id: "Hinspect",
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
    header: "On-Demand Property Services",
    subheader: (
      <p>Send a local rep for access, checks, and onsite tasks - fast!</p>
    ),
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
          id: "roomMeasure",
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
          id: "docRec",
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
          price: 130,
          basePrice: null,
        },
      ],
    },
  },
];

const discountRules = {
  // 🖼️ Property Photos
  photos: [
    {
      itemId: "PHbasic",
      condition: (formData) => {
        const options = formData.selectedOptions?.photos?.PHbasic || {};
        return (
          !!formData.selectedItems?.photos?.PHbasic &&
          Object.values(options).some((value) => value === true)
        );
      },
    },
    {
      itemId: "PHlandview",
      condition: (formData) => {
        const options = formData.selectedOptions?.photos?.PHlandview || {};
        return (
          !!formData.selectedItems?.photos?.PHlandview &&
          Object.values(options).some((value) => value === true)
        );
      },
    },
    {
      itemId: "PHpremium30",
      condition: (formData) => {
        const options = formData.selectedOptions?.photos?.PHpremium30 || {};
        return (
          !!formData.selectedItems?.photos?.PHpremium30 &&
          Object.values(options).some((value) => value === true)
        );
      },
    },
    {
      itemId: "PHpremium50",
      condition: (formData) => {
        const options = formData.selectedOptions?.photos?.PHpremium50 || {};
        return (
          !!formData.selectedItems?.photos?.PHpremium50 &&
          Object.values(options).some((value) => value === true)
        );
      },
    },
  ],

  // 🧾 Notarizations
  notary: [
    {
      itemId: "NTinperson",
      condition: (formData) => {
        const notaryOptions = formData.selectedOptions?.notary || {};
        if (!formData.selectedItems?.notary?.NTinperson) return false;
        if (notaryOptions?.pages21_75 || notaryOptions?.pages76_150)
          return true;
        return true;
      },
    },
    {
      itemId: "NTonline",
      condition: (formData) => !!formData.selectedItems?.notary?.NTonline,
    },
  ],

  // 🎥 Videos
  videos: [
    {
      itemId: "wt-videos", // Walkthrough video
      condition: (formData) => !!formData.selectedItems?.videos?.["wt-videos"],
    },
  ],

  // 📦 Lockboxes
  lockboxes: [
    {
      itemId: "LBstandard", // Lockbox - 48 hours
      condition: (formData) => !!formData.selectedItems?.lockboxes?.LBstandard,
      discountBaseRate: 15,
    },
    {
      itemId: "LBsameday", // Lockbox - Same day
      condition: (formData) => !!formData.selectedItems?.lockboxes?.LBsameday,
      discountBaseRate: 45,
    },
    // Potential future add-ons (optional)
    {
      itemId: "LBremoval",
      condition: (formData) => !!formData.selectedItems?.lockboxes?.LBremoval,
    },
    {
      itemId: "LBchangecode",
      condition: (formData) =>
        !!formData.selectedItems?.lockboxes?.LBchangecode,
    },
  ],

  // ⚙️ On-Demand Services
  onDemand: [
    {
      itemId: "docRec",
      condition: (formData) => !!formData.selectedItems?.onDemand?.docRec,
    },
    {
      itemId: "letterPosting",
      condition: (formData) =>
        !!formData.selectedItems?.onDemand?.letterPosting,
    },
    {
      itemId: "letSomeoneIn",
      condition: (formData) => !!formData.selectedItems?.onDemand?.letSomeoneIn,
    },
    {
      itemId: "courierServices",
      condition: (formData) =>
        !!formData.selectedItems?.onDemand?.courierServices,
    },
    {
      itemId: "banditSign",
      condition: (formData) => !!formData.selectedItems?.onDemand?.banditSign,
    },
  ],

  // ➕ Optional extras group
  onDemandExtras: [
    {
      itemId: "roomMeasure",
      condition: (formData) => !!formData.selectedItems?.onDemand?.roomMeasure,
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
  const [ SERVICES, setSERVICES] = useState(initServices)
  const [services, setServices] = useState(SERVICES);
  const [openItem, setOpenItem] = useState(null);
  const [includeModal, setIncludeModal] = useState(null);
  const [learnModal, setLearnModal] = useState(false);
  const [levels, _] = useState(discountLevels);
  const [modalOptionState, setModalOptionState] = useState(null);
  const [discountPreview, setDiscountPreview] = useState({});
  const [optionPreview, setOptionPreview] = useState({});

  const totalLevels = levels.length;
  // const [modalValues, setModalValues] = useState({});

  // useEffect(() => {
  // }, [services]);

  // useEffect(() => {
  // }, [formData]);
  // useEffect(() => {
    // if (Object.keys(optionPreview || {}).length > 0) {
      // console.log(
      //   " optionPreview updated:",
      //   JSON.stringify(optionPreview, null, 2)
      // );
    // } else {
      // console.log(" optionPreview cleared or empty");
    // }
  // }, [optionPreview]);

  useEffect(() => {
  // Only apply multiplication if multiple units are selected
  if (formData?.unitType === "multiple" && formData?.numberOfUnits > 1) {
    const updatedServices = initServices.map((service) => {
      const updatedItems = service.form.items.map((item) => {
         item.price = item.price * formData.numberOfUnits;
        let updatedItem = { ...item, };

        // ✅ Step 1: Multiply priceChange values (not main price)
        if (item.options?.items?.length) {
          const updatedOptions = item.options.items.map((opt) => {
            if (opt.priceChange) {
              return {
                ...opt,
                priceChange: opt.priceChange * formData.numberOfUnits,
              };
            }
            return opt;
          });

          updatedItem = {
            ...item,
            options: { ...item.options, items: updatedOptions },
          };
        }

        // ✅ Step 2: Keep item.price as is (no multiplication)
        // unless basePrice explicitly requires scaling (rare case)
        return updatedItem;
      });

      return {
        ...service,
        form: { ...service.form, items: updatedItems },
      };
    });
    console.log(`updated service init`, JSON.stringify(updatedServices, null, 3))
    setSERVICES(updatedServices);
    setServices(updatedServices)
  } else {
    // Reset back to default single-unit prices
    setSERVICES(initServices);
    setServices(initServices)
  }
}, [formData.unitType, formData.numberOfUnits]);


  const handlelearnModal = () => {
    return setLearnModal((state) => !state);
  };

  const handleValidation = () => {
    setError("");

    let newFormData = { ...formData };

    const a_la_carteOrder = [];
    // newFormData.order_protection = formData.selectedOptions?.order_protection || false

    // newFormData.discountStatus = formData.selectedItemOptions?.progress || {}
    const hasBundles =
      Array.isArray(formData.bundles) && formData.bundles.length > 0;

    const hasAlaCarteSelections = Object.values(
      formData.selectedItems || {}
    ).some(
      (serviceSelections) =>
        serviceSelections &&
        Object.values(serviceSelections).some((v) => v === true)
    );
    if (!hasBundles && !hasAlaCarteSelections) {
      setError("Please select a service");
      return;
    }
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
    let newServices = [...services];

    // ✅ Ensure valid service
    const serviceIndex = newServices.findIndex((s) => s.id === serviceId);
    const service = newServices[serviceIndex];
    if (!service) {
      console.warn(`⚠️ Service '${serviceId}' not found`);
      return newFormData;
    }

    // ✅ Ensure correct service type
    if (newFormData.serviceType !== "a_la_carte") {
      newFormData.serviceType = "a_la_carte";
    }

    // ✅ Update selected items
    newFormData.selectedItems = {
      ...newFormData.selectedItems,
      [serviceId]: newSelections,
    };

    const item = service.form?.items?.find((i) => i.id === itemId);
    if (!item) return newFormData;

    // ✅ Handle deselection cleanup
    if (!selected) {
      // Remove stale options for this item
      if (newFormData.selectedOptions?.[serviceId]?.[itemId]) {
        delete newFormData.selectedOptions[serviceId][itemId];
        if (!Object.keys(newFormData.selectedOptions[serviceId]).length) {
          delete newFormData.selectedOptions[serviceId];
        }
      }
    }

    // ✅ Handle protection invalidation logic
    if (item.protectionInvalid && selected) {
      newServices[serviceIndex] = {
        ...service,
        order_protection: false,
        order_protection_disabled: true,
      };
    } else if (item.protectionInvalid && !selected) {
      const originalService = SERVICES.find((s) => s.id === serviceId);
      const stillHasInvalid = service.form.items.some((svcItem) => {
        const isSelected = newFormData.selectedItems?.[serviceId]?.[svcItem.id];
        return svcItem.protectionInvalid && isSelected;
      });

      if (stillHasInvalid) {
        newServices[serviceIndex] = {
          ...service,
          order_protection: false,
          order_protection_disabled: true,
        };
      } else if (originalService) {
        newServices[serviceIndex] = {
          ...service,
          order_protection: originalService.order_protection,
          order_protection_disabled:
            originalService.order_protection_disabled ?? false,
        };
      }
    }

    // ✅ Default item-level options
    if (selected && item.options?.items?.length) {
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

    // ✅ Default service-level options (first selection only)
    if (selected && Object.values(prevSelections).every((v) => !v)) {
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

    // ✅ Merge modal values if provided
    if (modalValues && service.form?.modalOption?.form) {
      newServices = newServices.map((s) =>
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
      );
    }

    // ✅ Update discount progress
    const qualifiedCount = countQualifiedDiscounts(newFormData);
    const currentLevel =
      [...levels].reverse().find((lvl) => qualifiedCount >= lvl.items) || null;
    const currentIndex = currentLevel
      ? levels.findIndex((lvl) => lvl.items === currentLevel.items)
      : -1;

    newFormData.progress = {
      qualifiedCount,
      currentIndex,
      fillPercent: currentLevel ? ((currentIndex + 1) / totalLevels) * 100 : 0,
      currentPercent: currentLevel ? currentLevel.percent : 0,
    };

    // ✅ Recalculate totals once at the end
    const calculationResult = calculateCartTotals(newFormData, newServices);
    newFormData = calculationResult.nextFormData;
    setServices(newServices);

    // console.log(
    //   " handleItemSelection -> nextFormData",
    //   JSON.stringify(newFormData, null, 3)
    // );

    return newFormData;
  };

  const recalculateServicePrices = (serviceId, nextFormData, services) => {
    const originalService = SERVICES.find((s) => s.id === serviceId);
    if (!originalService) {
      console.warn(" No service found for serviceId:", serviceId);
      return { updatedServices: services, optionBreakdown: {} };
    }

    const serviceOptions = nextFormData.selectedOptions?.[serviceId] || {};
    const optionBreakdown = {};

    const recalculatedItems = originalService.form.items.map((item) => {
      const basePrice = item.basePrice ?? item.price;
      let finalPrice = basePrice;
      const itemBreakdown = {};
    const originalItemDef = originalService.form.items.find((i) => i.id === item.id);
    const originalDefaults =
      originalItemDef?.options?.items?.reduce((acc, opt) => {
        acc[opt.id] = opt.value ?? false;
        return acc;
      }, {}) || {};

    const currentOptions = serviceOptions[item.id] || {};
    const sameAsDefaults =
      Object.keys(originalDefaults).length > 0 &&
      Object.keys(originalDefaults).every(
        (key) => (currentOptions[key] ?? false) === originalDefaults[key]
      );
      // --- 1) Handle item option-based price changes/addition first
      if (item.options?.items?.length) {
        const itemOptions = serviceOptions[item.id] || {};
        const activeOptionIds = Object.keys(itemOptions).filter(
          (k) => itemOptions[k]
        );

              if (sameAsDefaults) {
        finalPrice = basePrice;
      } else {
        // Otherwise, apply existing pricing rules
         activeOptionIds.forEach((optId) => {
          const activeOpt = item.options.items.find((opt) => opt.id === optId);
          if (activeOpt?.priceChange) {
            // const delta = activeOpt.priceChange - finalPrice;
            finalPrice = activeOpt.priceChange;
            // itemBreakdown[optId] = activeOpt.priceChange;
          } else if (activeOpt?.priceAdd) {
            finalPrice += activeOpt.priceAdd;
            itemBreakdown[optId] = activeOpt.priceAdd;
          }
        });
      }
       
        // if (activeOptionIds.length === 1) {
        //   console.log(JSON.stringify(activeOptionIds));
        //   const activeOpt = item.options.items.find(
        //     (opt) => opt.id === activeOptionIds[0]
        //   );
        //   if (activeOpt?.priceChange) {
        //     const delta = activeOpt.priceChange - finalPrice;
        //   finalPrice = activeOpt.priceChange;
        //   itemBreakdown[optId] = delta;
        //   } else if (activeOpt?.priceAdd) {
        //     console.log(
        //       `price addition: ${finalPrice}+ ${activeOpt.priceAdd} `
        //     );
        //     finalPrice = finalPrice + activeOpt.priceAdd;
        //   }
        // } else if (activeOptionIds.length === 0) {
        //   console.log("baseprice assign");
        //   finalPrice = basePrice;
        // }
      }

      // --- 2) Handle submenu-based price changes next
      if (item.submenuPriceChange) {
        // Only iterate price-change keys defined for this item
        let accumulatedAdd = 0;

        Object.keys(item.submenuPriceChange).forEach((optId) => {
          const change = item.submenuPriceChange[optId];
          const isActive = serviceOptions[optId];

          // nicer, safe logging of isActive

          // skip if no change definition (shouldn't happen since iterating change keys) or inactive
          if (!change || (!isActive && isActive !== 0)) return;

          // Accumulate effects
          if (change.type === "add") {
            accumulatedAdd += Number(change.value || 0);
            itemBreakdown[optId] = Number(change.value || 0);
          } else if (
            change.type === "multiple" &&
            typeof isActive === "number"
          ) {
            if (change.value) {
              // normal case: multiply defined value
              const add = Number(change.value || 0) * isActive;
              accumulatedAdd += add;
              itemBreakdown[optId] = add;
            } else {
              //  NEW BEHAVIOR: no change.value -> multiply item price
              const multiplied = basePrice * (isActive - 1);
              accumulatedAdd += multiplied;
              itemBreakdown[optId] = multiplied;
            }
          }
        });

        finalPrice = finalPrice + accumulatedAdd;
        // console.log(`final price ${finalPrice} ${accumulatedAdd}`);
      }
      if (Object.keys(itemBreakdown).length > 0) {
        optionBreakdown[item.id] = itemBreakdown;
      }
      return { ...item, price: finalPrice };
    });

    const updatedServices = services.map((s) =>
      s.id === serviceId
        ? { ...s, form: { ...s.form, items: recalculatedItems } }
        : s
    );
    // console.log(
    //   `updating optionBreackdown for ${serviceId}`,
    //   JSON.stringify(optionBreakdown, null, 2)
    // );
    return { updatedServices, optionBreakdown };
  };

  const handleOptionChange = (
    serviceId,
    optionId,
    value,
    type,
    name,
    itemId
  ) => {
    // --- Clone current formData safely ---
    const nextFormData = { ...formData };

    // --- Find service and item ---
    const service = services.find((s) => s.id === serviceId);
    if (!service) return;

    const item = itemId
      ? service.form?.items?.find((i) => i.id === itemId)
      : null;

    // --- Get previous options (item-level or service-level) ---
    const prevOptions = itemId
      ? formData.selectedOptions?.[serviceId]?.[itemId] || {}
      : formData.selectedOptions?.[serviceId] || {};

    let newOptions = { ...prevOptions };

    // --- Handle radio-type options (reset others in group) ---
    if (type === "radio" && name) {
      const optionGroup = itemId
        ? item?.options?.items
        : service?.form?.options?.items;

      if (optionGroup?.length) {
        optionGroup
          .filter((o) => o.type === "radio" && o.name === name)
          .forEach((o) => {
            newOptions[o.id] = false;
          });
      }
    }

    // --- Apply user’s selection ---
    newOptions[optionId] = value;

    // --- Count active options ---
    const trueOptionIds = Object.keys(newOptions).filter((k) => newOptions[k]);
    const trueOptionsCount = trueOptionIds.length;

    // --- Handle item-level minimum option requirement ---
    if (itemId) {
      const minRequired = item?.options?.minimumRequired || 0;

      if (minRequired && trueOptionsCount < minRequired) {
        // ❌ Remove this item entirely if below minimum
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
        // ✅ Save updated item-level options
        nextFormData.selectedOptions = {
          ...nextFormData.selectedOptions,
          [serviceId]: {
            ...nextFormData.selectedOptions?.[serviceId],
            [itemId]: newOptions,
          },
        };
      }
    } else {
      // ✅ Service-level options
      nextFormData.selectedOptions = {
        ...nextFormData.selectedOptions,
        [serviceId]: {
          ...nextFormData.selectedOptions?.[serviceId],
          ...newOptions,
        },
      };
    }

    // --- Recalculate item prices and totals (single unified step) ---
    const { updatedServices, optionBreakdown } = recalculateServicePrices(
      serviceId,
      nextFormData,
      services
    );

    // --- Persist & refresh totals ---
    handleChange({ replaceFormData: true, value: nextFormData });
    setOptionPreview((prev) => ({
      ...prev,
      [serviceId]: { items: optionBreakdown },
    }));
    setServices(updatedServices);
    calculateCartTotals(nextFormData, updatedServices);
  };

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
    const { updatedServices, optionBreakdown } = recalculateServicePrices(
      serviceId,
      nextFormData,
      services
    );

    handleChange({ replaceFormData: true, value: nextFormData });
    setServices(updatedServices);
    setOptionPreview((prev) => ({
      ...prev,
      [serviceId]: { items: optionBreakdown },
    }));
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

    handleChange({ replaceFormData: true, value: newFormData });
    setServices(updatedServices);
    calculateCartTotals(newFormData, updatedServices);
  };

  const calculateCartTotals = (formData, services) => {
    // --- Initialize numeric accumulators safely ---
    let alaCarteSubtotal = 0;
    let alaCarteSavings = 0;
    let alaCarteProtection = 0;
    const serviceTotals = {};
    const nextFormData = { ...formData };
    const preview = {};

    // Step 1️⃣: Calculate A La Carte services
    (services || []).forEach((service) => {
      const serviceSelections = formData.selectedItems?.[service.id] || {};
      const selectedItems =
        (service.form?.items || []).filter(
          (item) => serviceSelections[item.id]
        ) || [];
      const rules = discountRules[service.id] || [];

      let subtotal = 0;
      let subsavings = 0;
      let protectionAmount = 0;

      if (rules.length) preview[service.id] = { items: {} };

      serviceTotals[service.id] = {
        subtotal: 0,
        protectionAmount: 0,
        subsavings: 0,
        items: {},
      };

      // 🔹 Preview potential discounts
      (service.form?.items || []).forEach((item) => {
        const rule = rules.find((r) => r.itemId === item.id);
        if (!rule) return;

        const basePrice = Number(item.price) || 0;
        const qualifiedCount = countQualifiedDiscounts(formData);
        const discountLevel =
          [...discountLevels]
            .reverse()
            .find((lvl) => qualifiedCount >= lvl.items) || null;

        let potentialDiscount = 0;
        let discountedPrice = basePrice;
        if (discountLevel) {
          potentialDiscount = (basePrice * discountLevel.percent) / 100;
          discountedPrice = basePrice - potentialDiscount;
        }

        preview[service.id].items[item.id] = {
          basePrice,
          potentialDiscount,
          discountedPrice,
          isRuleActive: !!rule.condition(formData),
        };
      });

      // 🔹 Compute actual totals for selected items
      selectedItems.forEach((item) => {
        let itemPrice = Number(item.price) || 0;
        let discountApplied = 0;
        const rule = rules.find((r) => r.itemId === item.id);

        if (rule && rule.condition(formData)) {
          const qualifiedCount = countQualifiedDiscounts(formData);
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
        serviceTotals[service.id].items[item.id] = {
          originalPrice: Number(item.price) || 0,
          discountedPrice: Number(itemPrice) || 0,
          discountApplied: Number(discountApplied) || 0,
        };
      });

      // 🔹 Service-level protection
      if (service.order_protection && subtotal > 0) {
        if (service.order_protection_type === "percent") {
          protectionAmount =
            (subtotal * (Number(service.order_protection_value) || 0)) / 100;
        } else if (service.order_protection_type === "flat") {
          protectionAmount = Number(service.order_protection_value) || 0;
        }
        alaCarteProtection += protectionAmount;
      }

      serviceTotals[service.id].subtotal = subtotal;
      serviceTotals[service.id].subsavings = subsavings;
      serviceTotals[service.id].protectionAmount = protectionAmount;

      alaCarteSubtotal += subtotal;
      alaCarteSavings += subsavings;
    });
    // console.log(JSON.stringify(preview, null, 3));
    setDiscountPreview(preview);

    // Step 2️⃣: Bundle totals (safe numeric guards)
    const bundleSubtotal = (formData?.bundles || []).reduce(
      (sum, b) => sum + (Number(b.price) || 0),
      0
    );
    const bundleProtection = Number(formData.bundleOrderProtection) || 0;
    const bundleSavings = Number(formData.bundleSavings) || 0;

    // Step 3️⃣: Combine and finalize
    const totalBeforeProtection =
      (alaCarteSubtotal || 0) + (bundleSubtotal || 0);
    const totalProtection = (alaCarteProtection || 0) + (bundleProtection || 0);
    const totalSavings = (alaCarteSavings || 0) + (bundleSavings || 0);
    const grandTotal = totalBeforeProtection + totalProtection;

    // Step 4️⃣: Assign safe numeric values (toFixed only for display precision)
    nextFormData.alaCarteTotal = Number(alaCarteSubtotal.toFixed(2)) || 0;
    nextFormData.alaCarteSavings = Number(alaCarteSavings.toFixed(2)) || 0;
    nextFormData.alaCarteOrderProtection =
      Number(alaCarteProtection.toFixed(2)) || 0;
    nextFormData.alaCarteOrderProtectionCheck = (alaCarteProtection || 0) > 0;

    nextFormData.bundleTotal = Number(bundleSubtotal.toFixed(2)) || 0;
    nextFormData.bundleSavings = Number(bundleSavings.toFixed(2)) || 0;
    nextFormData.bundleOrderProtection =
      Number(bundleProtection.toFixed(2)) || 0;
    nextFormData.bundleOrderProtectionCheck = (bundleProtection || 0) > 0;

    nextFormData.cartSubtotal = Number(totalBeforeProtection.toFixed(2)) || 0;
    nextFormData.cartProtection = Number(totalProtection.toFixed(2)) || 0;
    nextFormData.cartSavings = Number(totalSavings.toFixed(2)) || 0;
    nextFormData.cartTotal = Number(grandTotal.toFixed(2)) || 0;
    nextFormData.order_protection_price =
      Number(totalProtection.toFixed(2)) || 0;
    nextFormData.serviceTotals = serviceTotals;
    nextFormData.serviceType = bundleSubtotal > 0 ? "mixed" : "a_la_carte";

    // Step 5️⃣: Persist
    handleChange({ replaceFormData: true, value: nextFormData });

    // Step 6️⃣: Return structured safe numerics
    return {
      alaCarteTotal: Number(alaCarteSubtotal.toFixed(2)) || 0,
      alaCarteSavings: Number(alaCarteSavings.toFixed(2)) || 0,
      alaCarteProtection: Number(alaCarteProtection.toFixed(2)) || 0,
      bundleTotal: Number(bundleSubtotal.toFixed(2)) || 0,
      bundleSavings: Number(bundleSavings.toFixed(2)) || 0,
      bundleProtection: Number(bundleProtection.toFixed(2)) || 0,
      cartSubtotal: Number(totalBeforeProtection.toFixed(2)) || 0,
      cartProtection: Number(totalProtection.toFixed(2)) || 0,
      cartSavings: Number(totalSavings.toFixed(2)) || 0,
      cartTotal: Number(grandTotal.toFixed(2)) || 0,
      serviceTotals,
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

  const DisclosureMessages = ({ disclosures }) => {
    if (!disclosures || disclosures.length === 0) return null;

    const typeConfig = {
      info: {
        bg: "text-gray-700",
      },
      warning: {
        bg: " text-amber-800",
      },
      success: {
        bg: " text-green-700",
      },
      danger: {},
    };

    return (
      <>
        {disclosures.map((disc, index) => {
          const cfg = typeConfig[disc.type] || typeConfig.info;
          return (
            <p key={index} className={` text-xs text-start ${cfg.bg}`}>
              {/* {cfg.icon} */}
              <span>
                <sup>*</sup>
                {disc.message}
              </span>
            </p>
          );
        })}
      </>
    );
  };

  const RenderServiceForm = ({
    service,
    // open
  }) => {
    return (
      <>
        <div className="flex flex-col min-h-0 bg-[#fafbfd] border-2 border-gray-200 flex-1">
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

              {service?.header && (
                <div className="text-start w-full my-2 pt-1 pb-4">
                  <h2 className="font-extrabold                                                             text-xl py-1">
                    {service?.header}
                  </h2>
                  <div className="text-sm font-medium">
                    {service?.subheader}
                  </div>
                </div>
              )}
              {/* service grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {service.form.items.map((item) => {
                  const isSelected =
                    formData.selectedItems?.[service.id]?.[item.id] || false;

                  return (
                    <label
                      key={item.id}
                      className={`text-left transition-all relative block cursor-pointer border border-gray-50 bg-white p-4
     
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
                        {(() => {
                          const discountedInfo =
                            formData?.serviceTotals?.[service.id]?.items?.[
                              item.id
                            ];
                          const previewInfo =
                            discountPreview?.[service.id]?.items?.[item.id];

                          // 🔹 Case 1: Selected — show applied discount if any
                          if (
                            isSelected &&
                            discountedInfo &&
                            discountedInfo.discountApplied > 0
                          ) {
                            return (
                              <>
                                <span
                                  className={`text-sm line-through ${
                                    isSelected
                                      ? "text-inverse/80"
                                      : "text-gray-400"
                                  }`}
                                >
                                  ${discountedInfo.originalPrice}
                                </span>
                                <span
                                  className={`text-lg font-bold ${
                                    isSelected ? "text-inverse" : "text-primary"
                                  }`}
                                >
                                  ${discountedInfo.discountedPrice}
                                </span>
                              </>
                            );
                          }

                          // 🔹 Case 2: Not selected but discount preview exists — show potential discount
                          if (
                            !isSelected &&
                            previewInfo &&
                            previewInfo.potentialDiscount > 0
                          ) {
                            return (
                              <>
                                <span className="text-sm line-through text-gray-400">
                                  ${previewInfo.basePrice}
                                </span>
                                <span className="text-lg font-bold text-primary">
                                  ${previewInfo.discountedPrice}
                                </span>
                                {/* <span className="text-xs text-[#0BC88C] ml-1">
          Save ${previewInfo.potentialDiscount}
        </span> */}
                              </>
                            );
                          }

                          // 🔹 Default: normal price
                          return (
                            <span
                              className={`text-lg font-bold ${
                                isSelected ? "text-inverse" : "text-primary"
                              }`}
                            >
                              {item.price === "xx" ? "$xx" : `$${item.price}`}
                            </span>
                          );
                        })()}
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
                                onClick={() => {
                                  handleSubmenuChange(
                                    service.id,
                                    submenuItem.id,
                                    submenuItem.min
                                      ? Math.max(
                                          submenuItem.min,
                                          currentValue - 1
                                        )
                                      : currentValue - 1,
                                    "counter"
                                  );
                                }}
                                className="w-6 h-6 bg-gray-200 rounded text-sm"
                              >
                                -
                              </button>

                              {/* Middle number input */}
                              <input
                                type="number"
                                value={currentValue}
                                min={submenuItem.min ?? 0}
                                max={submenuItem.max ?? 99}
                                onChange={(e) => {
                                  let newVal = parseInt(e.target.value, 10);
                                  if (isNaN(newVal)) newVal = 0;
                                  if (submenuItem.max !== undefined) {
                                    newVal = Math.min(newVal, submenuItem.max);
                                  }
                                  if (submenuItem.min !== undefined) {
                                    newVal = Math.max(submenuItem.min, newVal);
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
              <div className="mt-2">
                {service.disclosure && service.disclosure.length > 0 && (
                  <DisclosureMessages disclosures={service.disclosure} />
                )}

                {(() => {
                  // find all selected items with protectionInvalid = true
                  const invalidItems =
                    service.form.items?.filter(
                      (item) =>
                        item.protectionInvalid &&
                        formData.selectedItems?.[service.id]?.[item.id]
                    ) || [];

                  if (invalidItems.length > 0) {
                    return (
                      <p className="text-xs text-red-600 ">
                        <sup>*</sup>Order Protection not available for{" "}
                        <span className="font-semibold">
                          {" "}
                          {invalidItems.map((i) => i.title).join(", ")}
                        </span>
                      </p>
                    );
                  }
                  return null;
                })()}
              </div>

              {/* Order Protection row */}

              {(() => {
                return (
                  <>
                    <label
                      role="checkbox"
                      className={`w-full mt-auto flex items-center justify-between gap-2 border-2 px-3 py-3 bg-card 
        ${
          !service?.order_protection_value || service?.order_protection_disabled
            ? "cursor-not-allowed border-gray-300"
            : "cursor-pointer border-[#0BC88C]"
        }`}
                      aria-checked={!!service?.order_protection}
                      aria-disabled={
                        !service?.order_protection_value ||
                        service?.order_protection_disabled
                      }
                      onClick={() => {
                        if (
                          !service?.order_protection_disabled &&
                          service?.order_protection_value
                        ) {
                          handleProtectionToggle(
                            !service?.order_protection,
                            service
                          );
                        }
                      }}
                      onKeyDown={(e) => {
                        if (
                          (e.key === " " || e.key === "Enter") &&
                          !service?.order_protection_disabled &&
                          service?.order_protection_value
                        ) {
                          e.preventDefault(); // prevent scrolling on space
                          handleProtectionToggle(
                            !service?.order_protection,
                            service
                          );
                        }
                      }}
                    >
                      <div className="flex items-center justify-start gap-4">
                        {/* Accessible Custom Checkbox */}
                        <div
                          role="checkbox"
                          tabIndex={
                            !service?.order_protection_value ||
                            service?.order_protection_disabled
                              ? -1
                              : 0
                          } // focusable only when active
                          aria-checked={!!service?.order_protection}
                          aria-disabled={
                            !service?.order_protection_value ||
                            service?.order_protection_disabled
                          }
                          onClick={() => {
                            if (
                              !service?.order_protection_disabled &&
                              service?.order_protection_value
                            ) {
                              handleProtectionToggle(
                                !service?.order_protection,
                                service
                              );
                            }
                          }}
                          onKeyDown={(e) => {
                            if (
                              (e.key === " " || e.key === "Enter") &&
                              !service?.order_protection_disabled &&
                              service?.order_protection_value
                            ) {
                              e.preventDefault(); // prevent scrolling on space
                              handleProtectionToggle(
                                !service?.order_protection,
                                service
                              );
                            }
                          }}
                          className={`
            w-5 h-5 border-2 rounded-xs flex items-center justify-center outline-none
            ${
              service?.order_protection
                ? "bg-[#0BC88C] border-[#0BC88C]"
                : "border-[#0BC88C] bg-white"
            }
            ${
              !service?.order_protection_value ||
              service?.order_protection_disabled
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer focus:ring-2 focus:ring-offset-1 focus:ring-[#0BC88C]"
            }
            transition-all duration-200
          `}
                        >
                          {service?.order_protection && (
                            <Check
                              className="w-4 h-5 text-white"
                              strokeWidth={4.5}
                            />
                          )}
                        </div>

                        {/* Label Text */}
                        <span
                          className={`font-medium ${
                            !service?.order_protection
                              ? "text-gray-600 hover:text-black"
                              : "text-gray-700 hover:text-black"
                          }`}
                        >
                          Order Protection
                        </span>

                        {/* Dynamic Shield Icon */}
                        {service?.order_protection_disabled ? (
                          <Shield className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        ) : service?.order_protection ? (
                          <ShieldCheck className="w-5 h-5 text-[#0BC88C] flex-shrink-0" />
                        ) : (
                          <Shield className="w-5 h-5 text-[#0BC88C] flex-shrink-0" />
                        )}

                        {/* Price */}
                        <span className="text-[#0BC88C] font-semibold ml-1">
                          {formData?.serviceTotals?.[service.id]
                            ?.protectionAmount
                            ? `$${parseFloat(
                                formData?.serviceTotals?.[service.id]
                                  ?.protectionAmount
                              ).toFixed(2)}`
                            : ""}
                        </span>
                      </div>
                      {/* Learn More Button */}
                      <button
                        type="button"
                        className={`flex items-center justify-end gap-2 transition-colors ${
                          !service?.order_protection
                            ? "text-gray-600 hover:text-black"
                            : "text-gray-700 hover:text-black"
                        }`}
                        onClick={handlelearnModal}
                        disabled={false}
                      >
                        <span className="text-sm font-medium">Learn More</span>
                      </button>
                    </label>
                  </>
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
              <div className=" flex flex-col justify-between gap-3">
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
              </div>

              {/* 🔹 Option Breakdown Preview */}
              {optionPreview?.[service.id]?.items &&
                Object.keys(optionPreview[service.id].items).length > 0 && (
                  <div className="mt-4 pt-3">
                    <h4 className="text-sm font-semibold text-start text-gray-700 mb-2">
                      Option Breakdown
                    </h4>
                    <div className="flex flex-col gap-2 text-xs text-gray-600">
                      {Object.entries(optionPreview[service.id].items).map(
                        ([itemId, options]) => {
                          // Find item metadata for friendly names
                          const item = service.form.items.find(
                            (i) => i.id === itemId
                          );
                          return (
                            <div key={itemId} className="flex flex-col gap-1">
                              <span className="font-medium text-gray-800 text-start text-sm">
                                {item?.title || itemId}
                              </span>
                              {Object.entries(options).map(([optId, value]) => {
                                // find readable label from service/submenu definitions
                                const optLabel =
                                  item?.options?.items?.find(
                                    (o) => o.id === optId
                                  )?.label ||
                                  service?.form?.submenu?.items?.find(
                                    (s) => s.id === optId
                                  )?.label ||
                                  optId;

                                return (
                                  <div
                                    key={optId}
                                    className="flex justify-between items-center"
                                  >
                                    <span className="text-gray-500">
                                      {optLabel}
                                    </span>
                                    <span className="text-gray-500 font-semibold">
                                      ${value.toFixed(2)}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                )}

              {/* 🔹 Totals + Cart */}
              <div className="flex w-full flex-col  justify-end justify-self-end">
                <div className="border-t pt-4">
                  <div className="flex flex-col justify-between w-full">
                    <div className="w-full text-sm">
                      <div className="flex justify-between text-green-600 font-semibold">
                        Savings{" "}
                        <span className="text-end">
                          $
                          {parseFloat(
                            formData?.serviceTotals?.[service.id]?.subsavings
                          ).toFixed(2) || 0}
                        </span>
                      </div>
                      <div className="flex justify-between text-main font-bold">
                        Total{" "}
                        <span className="text-end">
                          $
                          {parseFloat(
                            formData?.serviceTotals?.[service.id]?.subtotal
                          ).toFixed(2) || 0}
                        </span>
                      </div>
                    </div>
                    <AccordionPrimitive.Trigger asChild>
                      <button className="w-full px-4 py-2 bg-[#0BC88C] text-white font-semibold hover:bg-[#0BC88C]">
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

  const SelectedItemsSummary = ({
    formData,
    services,
    handleItemSelection,
    handleChange,
    calculateCartTotals,
  }) => {
    if (!formData) return null;

    const lines = [];

    // 🟩 1️⃣ Add bundle items first
    if (Array.isArray(formData.bundles) && formData.bundles.length > 0) {
      formData.bundles.forEach((bundle, idx) => {
        lines.push({
          id: `bundle-${idx}`,
          name: bundle.name,
          description: bundle.description,
          price: bundle.price,
          type: "bundle", // ✅ mark type
        });
      });
    }

    // 🟦 2️⃣ Add A La Carte items next
    if (formData?.selectedItems) {
      Object.keys(formData.selectedItems).forEach((serviceId) => {
        const serviceSelections = formData.selectedItems[serviceId];
        const service = services.find((s) => s.id === serviceId);
        if (!service) return;

        Object.keys(serviceSelections).forEach((itemId) => {
          if (!serviceSelections[itemId]) return;
          const item = service.form.items.find((i) => i.id === itemId);
          if (!item) return;

          const itemOptions =
            formData.selectedOptions?.[serviceId]?.[itemId] || {};
          const submenuOptions = formData.selectedOptions?.[serviceId] || {};
          const priceInfo =
            formData.serviceTotals?.[serviceId]?.items?.[itemId] || {};

          // Collect option/submenu labels
          const selectedOptionLabels = Object.keys(itemOptions)
            .filter((key) => itemOptions[key])
            .map((key) => {
              const opt = item.options?.items?.find((o) => o.id === key);
              return opt?.label || key;
            });

          const submenuLabels = Object.keys(submenuOptions)
            .filter(
              (k) =>
                (typeof submenuOptions[k] === "boolean" && submenuOptions[k]) ||
                (typeof submenuOptions[k] === "number" && submenuOptions[k] > 0)
            )
            .map((k) => {
              const sub = service.form.submenu?.items?.find((i) => i.id === k);
              const val = submenuOptions[k];
              if (!sub) return null;
              if (typeof val === "number" && val > 0)
                return `${sub.label}: ${val}`;
              return sub.label;
            })
            .filter(Boolean);

          const combinedDetails = [
            ...selectedOptionLabels,
            ...submenuLabels,
          ].join(", ");

          lines.push({
            serviceId,
            itemId,
            serviceTitle: service.title,
            itemTitle: item.title,
            details: combinedDetails || null,
            price: priceInfo.discountedPrice ?? item.price,
            type: "a_la_carte", // ✅ mark type
          });
        });
      });
    }

    if (lines.length === 0) return null;

    // 🧮 3️⃣ Removal handlers
    const handleRemoveLine = (line) => {
      if (line.type === "bundle") {
        // Remove from bundle array
        const newBundles = formData.bundles.filter((b) => b.name !== line.name);
        handleChange({ name: "bundles", value: newBundles });

        // Recalculate totals
        const updatedForm = { ...formData, bundles: newBundles };
        calculateCartTotals(updatedForm, services);
      } else if (line.type === "a_la_carte") {
        handleItemSelection(line.serviceId, line.itemId, false);
      }
    };

    return (
      <div className="border-t mt-6 pt-4">
        <h3 className="font-bold text-lg py-1 text-start mb-3 text-primary">
          Items in Cart
        </h3>
        <ul className="space-y-2.5 py-1">
          {lines.map((line, idx) => (
            <li
              key={idx}
              className="flex justify-between items-center text-sm border-b py-2.5 border-gray-100 pb-1 bg-[#e5e9f6] px-4 rounded-4xl"
            >
              <div className="flex flex-col lg:flex-row justify-around">
                <span className="font-bold">{line.itemTitle || line.name}</span>
                {line.details && (
                  <span className="text-gray-600 font-medium ml-2">
                    ({line.details})
                  </span>
                )}
                {/* {line.description && (
                <span className="text-gray-500 font-medium ml-2">({line.description})</span>
              )} */}
              </div>

              <div className="flex items-center gap-3 font-semibold">
                <span>${Number(line.price).toFixed(2)}</span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleRemoveLine(line);
                  }}
                  className="text-gray-400 hover:text-red-500 hover:cursor-pointer transition-colors"
                  aria-label={`Remove ${line.itemTitle || line.name}`}
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="flex justify-between items-center px-6 mt-3 font-semibold text-sm">
          <span>Total:</span>
          <span className="pe-5">
            ${formData.cartTotal?.toFixed(2) || "0.00"}
          </span>
        </div>

        {formData.cartSavings > 0 && (
          <div className="flex justify-between px-6 text-[#0BC88C] text-sm">
            <span>Savings:</span>
            <span className="pe-5">-${formData.cartSavings.toFixed(2)}</span>
          </div>
        )}
      </div>
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
      <div className="w-full max-w-3xl mx-auto">
        <div className="w-5xl"></div>
        <div className="w-full relative">
          {/* Progress Bar Container */}
          <div className="relative w-full h-3 overflow-hidden bg-gray-100">
            {/* Filled portion */}
            <div
              className="h-full bg-[#0BC88C] transition-all duration-300"
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
            <span className="font-semibold text-[#0BC88C]">
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
      <SelectedItemsSummary
        formData={formData}
        services={services}
        handleChange={handleChange}
        handleItemSelection={handleItemSelection}
        calculateCartTotals={calculateCartTotals}
      />
      <div className="w-full bg-white/80 backdrop-blur z-20  px-4 py-3 mt-4 border-t">
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

      <div className="sticky bottom-0 left-0 w-full z-20 bg-[#FAFBFD]/70 backdrop-blur-md shadow-[0_-2px_7px_-3px_rgba(0,0,0,0.25)]  px-4 py-3 mt-4">
        {error && (
          <div className="w-full max-w-2xl mx-auto mb-4">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-center text-sm">
              {error}
            </div>
          </div>
        )}

        <div className="w-full">
          {/* {JSON.stringify(formData?.modalValues, null, 3)}
          <p>modal state: {JSON.stringify(modalOptionState, null, 3)}</p> */}
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
            {/* Left - Order Subtotal */}
            <div className="md:col-span-2 flex flex-col gap-2">
              <div className="flex justify-between text-sm md:text-base font-medium text-gray-800">
                <span>Order Subtotal:</span>
                <span>${formData?.cartTotal}</span>
              </div>

              <div className="flex justify-between text-sm md:text-base font-semibold text-[#0BC88C]">
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
                className="w-full  px-5 py-2 bg-[#00d892] text-white font-semibold hover:bg-[#0BC88C] transition-colors"
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
