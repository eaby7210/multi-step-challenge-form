import React, {
  useState,
   useEffect
} from "react";
import { PlusCircle, CheckSquare } from "lucide-react";
import { ChevronRight , ShieldCheck, Shield } from "lucide-react";
import AlaCartePage from "./AlaCartePage";
import ModalWrapper from "./ModalWrapper";

import OrderProtectionModal from "../config/OrderProtectionModal";
const BundlesHeaders = {
  header:"Pre-built packages with built-in savings",
  subheader:"Our most popular products, at the lowest available prices",
}
const BUNDLES = [
  {
    name: "Deal Accelerator",
    description: "Exterior and Interior photos + video walk through",
    basePrice: 240,
    price: 180,
  },
  {
    name: "Quantum Max",
    description: "Exterior and Interior photos + Document Signed/Notarized",
    basePrice: 285,
    price: 200,
  },
  {
    name: "Access Plus",
    description: "Exterior and Interior photos + Lockbox",
    basePrice: 255,
    price: 210,
  },
  {
    name: "Clearview Ultra",
    description: "Fully licensed home inspection + a 2D floor plan",
    basePrice: 435,
    price: 399,
  },
];

// const ORDER_PROTECTION_PRICE = 15;

const OrderConfig = ({ formData = {}, handleChange, onNext, onPrev }) => {
  const bundles = formData?.bundles || [];

  const [orderProtection, setOrderProtection] = useState(
    !!formData.order_protection
  );
  const [Bundles, setBundles] = useState(BUNDLES);
  const [error, setError] = useState("");
  const [bundleModal, setBundleModal] = useState(false);
  const [indSerivceModal, setIndServiceModal] = useState(false);
  const [learnModal, setLearnModal] = useState(false);

useEffect(() => {
  if (formData?.unitType === "multiple" && formData?.numberOfUnits > 1) {
    // multiply all bundle prices by numberOfUnits
    const updatedBundles = BUNDLES.map((bundle) => ({
      ...bundle,
      basePrice: bundle.basePrice * formData.numberOfUnits,
      price: bundle.price * formData.numberOfUnits,
    }));
    setBundles(updatedBundles);
  } else {
    // if not multiple, reset to default bundle pricing
    setBundles(BUNDLES);
  }
}, [formData.unitType, formData.numberOfUnits]);


  const handlelearnModal = () => {
    return setLearnModal((state) => !state);
  };

  const handlebundleModal = () => {
    return setBundleModal((state) => !state);
  };
  const handleindServiceModal = () => {
    return setIndServiceModal((state) => !state);
  };



  const total =
    formData?.cartTotal || 0

console.log(JSON.stringify(formData,null,3))
  const savings =
    formData.cartSaving ??
    (bundles.length
      ? bundles.reduce((sum, b) => sum + (b.basePrice - b.price), 0)
      : formData.bundleSavings || 0);

const updateCartValues = (bundles, protectionChecked) => {
  if (!handleChange) return;

  // --- Normalize existing a la carte values ---
  const alaCarteTotal = Number(formData.alaCarteTotal) || 0;
  const alaCarteSavings = Number(formData.alaCarteSavings) || 0;
  const alaCarteProtection = Number(formData.alaCarteOrderProtection) || 0;

  // --- Calculate bundle values safely ---
  const bundleSubtotal = (bundles || []).reduce(
    (sum, b) => sum + (Number(b.price) || 0),
    0
  );
  const bundleBase = (bundles || []).reduce(
    (sum, b) => sum + (Number(b.basePrice) || 0),
    0
  );
  const bundleSavings = bundleBase - bundleSubtotal;
  const bundleProtection = protectionChecked
    ? Number((bundleSubtotal * 0.04).toFixed(2))
    : 0;

  // --- Combine both parts ---
  const totalBeforeProtection = alaCarteTotal + bundleSubtotal;
  const totalProtection = alaCarteProtection + bundleProtection;
  const totalSavings = alaCarteSavings + bundleSavings;
  const grandTotal = totalBeforeProtection + totalProtection;

  // --- Update all fields in formData ---
  handleChange({ name: "bundleTotal", value: Number(bundleSubtotal.toFixed(2)) });
  handleChange({ name: "bundleSavings", value: Number(bundleSavings.toFixed(2)) });
  handleChange({ name: "bundleOrderProtection", value: Number(bundleProtection.toFixed(2)) });
  handleChange({ name: "bundleOrderProtectionCheck", value: protectionChecked });

  handleChange({ name: "cartSubtotal", value: Number(totalBeforeProtection.toFixed(2)) });
  handleChange({ name: "cartProtection", value: Number(totalProtection.toFixed(2)) });
  handleChange({ name: "cartSavings", value: Number(totalSavings.toFixed(2)) });
  handleChange({ name: "cartTotal", value: Number(grandTotal.toFixed(2)) });

  handleChange({ name: "order_protection", value: protectionChecked });
  handleChange({ name: "order_protection_price", value: Number(totalProtection.toFixed(2)) });

  // --- Determine service type (combined logic) ---
  const hasBundles = bundles.length > 0;
  const hasAlaCarte = alaCarteTotal > 0;
  handleChange({
    name: "serviceType",
    value: hasBundles && hasAlaCarte
      ? "mixed"
      : hasBundles
      ? "bundled"
      : "a_la_carte",
  });
};



  const handleSelectionLogic = (bundle) => {
    const bundles = formData.bundles || [];

    let newSelection;
    if (bundles.some((b) => b?.name === bundle.name)) {
      // remove
      newSelection = bundles.filter((b) => b?.name !== bundle.name);
    } else {
      // add
      newSelection = [...bundles, bundle];
    }
let nextType = formData.serviceType;
if (nextType === "a_la_carte") nextType = "mixed";
else nextType = "bundled";

handleChange({ name: "serviceType", value: nextType });


    handleChange({ name: "bundles", value: newSelection });
    // updateCartValues(newSelection, orderProtection);
    handleProtectionToggle(true);
    updateCartValues(newSelection, true);
  };

  const handleProtectionToggle = (checked) => {
    const bundles = formData?.bundles || [];

    setOrderProtection(checked);
    // handleChange({ name: "order_protection", value: checked });
    // handleChange({
    //   name: "order_protection_price",
    //   value: checked ? ORDER_PROTECTION_PRICE : 0,
    // });

    updateCartValues(bundles, checked);
  };
const validations =()=>{
  const bundles = formData?.bundles || [];
  let msgs=[]
   if (!bundles.length) {
    const msg= "Please select at least one bundled option to continue"
      setError(msg);
      msgs.push(msg)
      return msgs;
    }
    setError("");
    return msgs;

}
  const handleValidation = () => {
    const msgs = validations();
    if( msgs.length>0) {
      return};
    onNext();
  };

const handleGoAlaCarte = () => {
  if (!handleChange) return;

  const hasBundles = Array.isArray(formData.bundles) && formData.bundles.length > 0;

  if (hasBundles) {

    handleChange({ name: "serviceType", value: "mixed" });
  } else {

    handleChange({ name: "serviceType", value: "a_la_carte" });
  }


  handleChange({ name: "cartTotal", value: Number(formData.cartTotal) || 0 });
  handleChange({ name: "cartSavings", value: Number(formData.cartSavings) || 0 });

  onNext("a_la_carte");
};


  return (
    <>
      {bundleModal && (
        <ModalWrapper handleClose={handlebundleModal}>
          <div className="space-y-6 text-sm text-start">
            {/* Title */}
            <h2 className="text-lg font-semibold text-center">
              What's Included in Your Bundled Services
            </h2>

            {/* Section: We Handle Everything */}
            <div>
              <h3 className="font-semibold mb-2">We Handle Everything</h3>
              <ul className="space-y-1">
                <li className="flex items-start gap-2">
                  <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  Professional vendors delivered to your address (+ remote
                  notarizations)
                </li>
                <li className="flex items-start gap-2">
                  <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  Contract coordination & scheduling
                </li>
                <li className="flex items-start gap-2">
                  <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  All travel fees included – no hidden costs
                </li>
              </ul>
            </div>

            {/* Section: Bundle Perks */}
            <div>
              <h3 className="font-semibold mb-2">Bundle Perks</h3>
              <ul className="space-y-1">
                <li className="flex items-start gap-2">
                  <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  One trip, multiple services — faster turnaround, fewer delays
                </li>
                <li className="flex items-start gap-2">
                  <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  Automatic bundle savings compared to a-la-carte
                </li>
              </ul>
            </div>

            {/* Section: Onsite Excellence */}
            <div>
              <h3 className="font-semibold mb-2">Onsite Excellence</h3>
              <ul className="space-y-1">
                <li className="flex items-start gap-2">
                  <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  Safety & access verification before work begins
                </li>
                <li className="flex items-start gap-2">
                  <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  Professional work exactly as ordered
                </li>
              </ul>
            </div>

            {/* Section: Quality Guaranteed */}
            <div>
              <h3 className="font-semibold mb-2">Quality Guaranteed</h3>
              <ul className="space-y-1">
                <li className="flex items-start gap-2">
                  <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  Quality control review of services
                </li>
                <li className="flex items-start gap-2">
                  <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  Exception handling for any special requests
                </li>
              </ul>
            </div>

            {/* Footer note */}
            <p className="font-semibold">
              One order. One trip. Professional results delivered.*
            </p>
            <p className="text-xs text-muted-foreground">
              *Properties must be safe and accessible for service completion.
              Price includes one trip fee only. See Order Protection for
              additional options.
            </p>
          </div>
        </ModalWrapper>
      )}
      {learnModal && <OrderProtectionModal handleClose={handlelearnModal} />}
      {indSerivceModal && (
        <ModalWrapper handleClose={handleindServiceModal}>
          <div className="space-y-6 text-sm text-start w-full">
            {/* Title */}
            <h2 className="text-lg font-semibold text-center">
              What's Included in Your Individual Services
            </h2>

            {/* Section: We Handle Everything */}
            <div>
              <h3 className="font-semibold mb-2">We Handle Everything</h3>
              <ul className="space-y-1">
                <li className="flex items-start gap-2">
                  <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  Professional vendors delivered to your address (+ remote
                  notarizations)
                </li>
                <li className="flex items-start gap-2">
                  <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  Contract coordination & scheduling
                </li>
                <li className="flex items-start gap-2">
                  <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  All travel fees included – no hidden costs
                </li>
              </ul>
            </div>

            {/* Section: Customizeable Savings */}
            <div>
              <h3 className="font-semibold mb-2">Customizeable Savings</h3>
              <ul className="space-y-1">
                <li className="flex items-start gap-2">
                  <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  Multiple services available — faster turnaround, fewer delays
                </li>
                <li className="flex items-start gap-2">
                  <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  Huge discounts available on many of our most popular products
                </li>
              </ul>
            </div>

            {/* Section: Onsite Excellence */}
            <div>
              <h3 className="font-semibold mb-2">Onsite Excellence</h3>
              <ul className="space-y-1">
                <li className="flex items-start gap-2">
                  <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  Safety & access verification before work begins
                </li>
                <li className="flex items-start gap-2">
                  <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  Professional work exactly as ordered
                </li>
              </ul>
            </div>

            {/* Section: Quality Guaranteed */}
            <div>
              <h3 className="font-semibold mb-2">Quality Guaranteed</h3>
              <ul className="space-y-1">
                <li className="flex items-start gap-2">
                  <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  Quality control review of services
                </li>
                <li className="flex items-start gap-2">
                  <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  Exception handling for any special requests
                </li>
              </ul>
            </div>

            {/* Footer note */}
            <p className="font-semibold">
              Save big on your favorite orders. Professional results delivered.*
            </p>
            <p className="text-xs text-muted-foreground">
              *Properties must be safe and accessible for service completion.
              Price includes one trip fee only. See Order Protection for
              additional options.
            </p>
          </div>
        </ModalWrapper>
      )}

      <div className="flex flex-col flex-1 mb-8">
        {/* Order Individual Services */}
                <h3 className="text-lg text-start font-bold text-primary mt-6 mb-3 ">
          Build your order
        </h3>
        <div className="flex flex-col sm:flex-row sm:gap-1 border-2 border-gray-200 bg-card p-4 items-center justify-between shadow-sm">
          <div className="flex w-full flex-col">
            <div className="col-span-1 md:col-span-2 flex flex-col h-full w-full items-center justify-between mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Left Title */}
                <h3 className="text-md font-bold text-start text-main lg:text-nowrap">
                  Order Individual Services
                </h3>

                {/* Right Link */}
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 text-gray-700 hover:text-primary hover:cursor-pointer transition-colors"
                  onClick={handleindServiceModal}
                >
                  <PlusCircle className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">What’s Included</span>
                </button>
              </div>

              <span className="text-xs text-start pe-3 text-gray-600">
                Custom build your order and experience even greater savings when
                you add services.
              </span>
            </div>
          </div>
          <button
            type="button"
            className="flex w-full sm:w-auto items-center justify-center gap-2 px-4 text-nowrap py-3 bg-primary text-white font-semibold hover:bg-blue-700 transition-all"
            onClick={handleGoAlaCarte}
          >
            Build My Order
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Bundle and Save */}
        <h3 className="text-lg text-start font-bold text-primary mt-6 mb-3 ">
          Bundle and Save
        </h3>
        {/* Grid section */}
        <div className="flex flex-col min-h-0 border-2 border-gray-200 bg-[#fafbfd] flex-1">
          <div className=" grid grid-cols-1 gap-1 md:gap-1.5 md:grid-cols-3 p-4 h-full w-full ">
            {/* Bundle and Protection section */}
            <div className="col-span-1 md:col-span-2 flex flex-col h-full w-full items-center justify-between mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 w-full">
                {/* Left Title */}
                <h3 className="text-md text-start w-full font-bold text-main">
                  Bundled Order Options
                </h3>

                {/* Right Link */}
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 text-gray-700 hover:text-primary hover:cursor-pointer transition-colors"
                  onClick={handlebundleModal}
                >
                  <PlusCircle className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">What's Included</span>
                </button>
              </div>
               
              {BundlesHeaders &&
              <div className="text-start my-2 pt-1 pb-4 w-full">
              <h2 className="font-extrabold text-xl py-1">{BundlesHeaders?.header}</h2>
              <p className="text-sm font-medium">{BundlesHeaders?.subheader}</p>
              </div>}
              {/* Bundles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {Bundles.map((b) => {
                  // console.log(JSON.stringify(b, null, 3))
                  const isSelected = formData?.bundles?.some(
                    (sel) => sel?.name === b?.name
                  );
                  return (
                    <button
                      key={b?.name}
                      type="button"
                      className={`text-left p-4 border transition-all shadow-sm bg-card hover:cursor-pointer hover:text-inverse ${
                        isSelected
                          ? "border-primary ring-2 ring-primary label-active-gradient text-inverse"
                          : "border-gray-200"
                      }`}
                      onClick={() => handleSelectionLogic(b)}
                    >
                      <div className="font-semibold mb-1">{b.name}</div>
                      <div
                        className={`text-xs mb-2 ${
                          isSelected ? "text-inverse/90" : "text-gray-600"
                        }`}
                      >
                        {b.description}
                      </div>
                      <div className="flex items-baseline gap-3">
                        <span
                          className={`text-sm line-through ${
                            isSelected ? "text-inverse/80" : "text-gray-400"
                          }`}
                        >
                          ${b.basePrice}
                        </span>
                        <span
                          className={`text-lg font-bold ${
                            isSelected ? "text-inverse" : "text-primary"
                          }`}
                        >
                          ${b.price}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
              {/* Order Protection row */}
              <label className="w-full mt-auto flex items-center justify-between gap-2 cursor-pointer border-2 px-3 py-3 bg-card border-[#0BC88C]">
                <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="accent-primary"
                  checked={orderProtection}
                  onChange={(e) => handleProtectionToggle(e.target.checked)}
                />
                <span className="text-main font-medium">Order Protection</span>
                </div>
                { (formData?.order_protection
                  ) ? (
                  <ShieldCheck className="w-5 h-5 text-[#0BC88C] flex-shrink-0" />
                ) : (
                  <Shield className="w-5 h-5 text-[#0BC88C] flex-shrink-0" />
                )}
                <span className="font-semibold ml-1 text-[#0bc88c]">
                  {formData?.order_protection_price &&
                  formData.order_protection_price > 0
                    ? `+$${formData.order_protection_price.toFixed(2)}`
                    : ""}
                </span>
                <button
                  type="button"
                  className="flex items-center justify-end gap-2 text-gray-700 hover:text-primary transition-colors"
                  onClick={handlelearnModal}
                >
                  <span className="text-sm font-medium hover:cursor-pointer">Learn More</span>
                </button>
              </label>
            </div>

            {/* Totals cart section */}
            <div className=" flex w-full flex-col justify-end">
              <div className=" border-t pt-4">
                <div className="flex flex-col justify-between w-full">
                  <div className="w-full text-sm">
                    <div className="flex justify-between text-green-600 font-semibold">
                      Savings <span className="text-end">${savings}</span>
                    </div>
                    <div className="flex justify-between text-main font-bold">
                      Total <span className="text-end">${total}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="w-full px-4 py-2 bg-emerald-500 text-white font-semibold hover:bg-emerald-600"
                    onClick={()=>{
                      const msgs = validations()
                      if( msgs.length>0) {
                        return};
                      handleGoAlaCarte()
                    }}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
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
      </div>
    </>
  );
};

export default OrderConfig;
