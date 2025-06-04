import React, { useEffect,useState } from "react";
import { CheckCircle, MapPin, User } from "lucide-react";
import logo from "../assets/logo_color_black.png";
import api from "../apis/interceptors/axios";

const Data = {
  status: "paid",
  discount: {
    type: "percentage",
    value: 0,
  },
  liveMode: false,
  amountPaid: 1153,
  attachments: [],
  _id: "683ee94247fb86598cecbbae",
  altId: "n7iGMwfy1T5lZZacxygj",
  altType: "location",
  companyId: "vTgLF7Brb7ZWZlyIdAPd",
  name: "Invoice for A La Carte Order",
  invoiceNumber:
    "cs_test_b1aPvMVToXgnvWRHvy1gmUDSKX44z7rB1o4XMd07NFl7P9ZhDDOW4TZff3",
  currency: "USD",
  contactDetails: {
    id: "Ad2xLrfD0zRotCWWTeKG",
    name: "Lani Test",
    phoneNo: "+17493723585",
    email: "kuxywo@mailinator.com",
    additionalEmails: [],
    address: {
      addressLine1: "",
      addressLine2: "Consectetur omnis m",
      city: "Quasi quod officia u",
      state: "Louisiana",
      countryCode: "US",
      postalCode: "Nostrud nisi repelle",
    },
    customFields: [],
  },
  issueDate: "2025-06-03T07:00:00.000Z",
  dueDate: "2025-06-04T06:59:59.999Z",
  sentTo: {
    phoneNo: [],
    email: [],
    emailBcc: [],
    emailCc: [],
  },
  termsNotes: "<p>This is a default terms.</p>",
  invoiceItems: [
    {
      taxes: [],
      taxInclusive: true,
      _id: "683ee94247fb864b10ecbbaf",
      name: "Licensed Home Inspection",
      description: "Licensed home inspection. Choose type and price.",
      currency: "USD",
      amount: 0,
      qty: 1,
    },
    {
      taxes: [],
      taxInclusive: true,
      _id: "683ee94247fb86f613ecbbb0",
      name: "Licensed Home Inspection - Basic",
      description: "basic",
      currency: "USD",
      amount: 250,
      qty: 1,
    },
    {
      taxes: [],
      taxInclusive: true,
      _id: "683ee94247fb868699ecbbb1",
      name: "Licensed Home Inspection - notarized_doc",
      description: "Addon for Licensed Home Inspection",
      currency: "USD",
      amount: 40,
      qty: 1,
    },
    {
      taxes: [],
      taxInclusive: true,
      _id: "683ee94247fb86f72decbbb2",
      name: "Licensed Home Inspection - additional_doc",
      description: "Addon for Licensed Home Inspection",
      currency: "USD",
      amount: 15,
      qty: 1,
    },
    {
      taxes: [],
      taxInclusive: true,
      _id: "683ee94247fb86ddabecbbb3",
      name: "Document Recording Service",
      description: "Service for recording documents.",
      currency: "USD",
      amount: 85,
      qty: 1,
    },
    {
      taxes: [],
      taxInclusive: true,
      _id: "683ee94247fb8677baecbbb4",
      name: "Document Recording Service - Recording Fee Required?",
      description: "yes",
      currency: "USD",
      amount: 123,
      qty: 1,
    },
    {
      taxes: [],
      taxInclusive: true,
      _id: "683ee94247fb86a4edecbbb5",
      name: "Document Recording Service - notarized_doc",
      description: "Addon for Document Recording Service",
      currency: "USD",
      amount: 40,
      qty: 1,
    },
    {
      taxes: [],
      taxInclusive: true,
      _id: "683ee94247fb86fb40ecbbb6",
      name: "Document Recording Service - additional_doc",
      description: "Addon for Document Recording Service",
      currency: "USD",
      amount: 15,
      qty: 1,
    },
    {
      taxes: [],
      taxInclusive: true,
      _id: "683ee94247fb86ec34ecbbb7",
      name: "Move-In/Move-Out Photo Inspection",
      description: "Photo inspection for move-in or move-out.",
      currency: "USD",
      amount: 165,
      qty: 1,
    },
    {
      taxes: [],
      taxInclusive: true,
      _id: "683ee94247fb866f8fecbbb8",
      name: "Move-In/Move-Out Photo Inspection - notarized_doc",
      description: "Addon for Move-In/Move-Out Photo Inspection",
      currency: "USD",
      amount: 40,
      qty: 1,
    },
    {
      taxes: [],
      taxInclusive: true,
      _id: "683ee94247fb86fcf7ecbbb9",
      name: "LandView Photos",
      description: "Specialized LandView photography.",
      currency: "USD",
      amount: 130,
      qty: 1,
    },
    {
      taxes: [],
      taxInclusive: true,
      _id: "683ee94247fb86427becbbba",
      name: "LandView Photos - additional_doc",
      description: "Addon for LandView Photos",
      currency: "USD",
      amount: 15,
      qty: 1,
    },
    {
      taxes: [],
      taxInclusive: true,
      _id: "683ee94247fb86974eecbbbb",
      name: "LandView Photos - measurements",
      description: "Addon for LandView Photos",
      currency: "USD",
      amount: 30,
      qty: 1,
    },
    {
      taxes: [],
      taxInclusive: true,
      _id: "683ee94247fb860b71ecbbbc",
      name: "Bandit Signage Placement",
      description: "Place bandit signs at the property.",
      currency: "USD",
      amount: 0,
      qty: 1,
    },
    {
      taxes: [],
      taxInclusive: true,
      _id: "683ee94247fb86188becbbbd",
      name: "Bandit Signage Placement - 15 Signs",
      description: "15",
      currency: "USD",
      amount: 25,
      qty: 1,
    },
    {
      taxes: [],
      taxInclusive: true,
      _id: "683ee94247fb86ceccecbbbe",
      name: "Bandit Signage Placement - additional_doc",
      description: "Addon for Bandit Signage Placement",
      currency: "USD",
      amount: 15,
      qty: 1,
    },
    {
      taxes: [],
      taxInclusive: true,
      _id: "683ee94247fb860b97ecbbbf",
      name: "Premium MLS Photography",
      description: "Premium MLS-ready photography packages.",
      currency: "USD",
      amount: 0,
      qty: 1,
    },
    {
      taxes: [],
      taxInclusive: true,
      _id: "683ee94247fb865ac1ecbbc0",
      name: "Premium MLS Photography - 50 Photo Package",
      description: "50",
      currency: "USD",
      amount: 50,
      qty: 1,
    },
    {
      taxes: [],
      taxInclusive: true,
      _id: "683ee94247fb86342becbbc1",
      name: "Premium MLS Photography - additional_doc",
      description: "Addon for Premium MLS Photography",
      currency: "USD",
      amount: 15,
      qty: 1,
    },
    {
      taxes: [],
      taxInclusive: true,
      _id: "683ee94247fb86a125ecbbc2",
      name: "Wellness Check",
      description: "A wellness check on the property.",
      currency: "USD",
      amount: 70,
      qty: 1,
    },
    {
      taxes: [],
      taxInclusive: true,
      _id: "683ee94247fb86e575ecbbc3",
      name: "Wellness Check - measurements",
      description: "Addon for Wellness Check",
      currency: "USD",
      amount: 30,
      qty: 1,
    },
  ],
  total: 1153,
  invoiceTotal: 1153,
  amountDue: 0,
  title: "INVOICE",
  automaticTaxesCalculated: false,
  invoiceNumberPrefix: "INV-",
  paymentMethods: {
    stripe: {
      enableBankDebitOnly: false,
    },
  },
};

export default function Success({ session_id }) {
  const [invoiceData, setInvoiceData] = useState({});

  const companyDetails = {
    name: "InvestorBootz",
    address: "123 Business Street, Suite 456, Cityville, ST 78910",
    contact: "Phone: (123) 456-7890 | Email: support@investorbootz.com",
  };

  useEffect(() => {
    console.log("Session ID:", session_id);
    api
      .get(`/submit-order/${session_id}/`)
      .then((response) => {
        console.log("Invoice data:", response.data);
        setInvoiceData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching invoice data:", error);
      });
  }, [session_id]);

  const customerDetails = invoiceData?.contactDetails || {};

  const items = invoiceData?.invoiceItems?.map((item) => ({
    name: item.name,
    description: item.description,
    price: item.amount,
  })) || [];

  const total = invoiceData?.total || 0;;
  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl mx-auto flex-grow flex flex-col">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <img src={logo} alt="Company Logo" className="h-16 mb-4 md:mb-0" />
          <div className="text-center md:text-right">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Order Summary
            </h1>
            <p className="text-gray-600">Date: {new Date().toLocaleDateString()}</p>
            <p className="text-green-600 font-semibold">Payment Status: {invoiceData?.status?.toUpperCase()}</p>
            {!invoiceData?.liveMode && (
              <p className="text-red-600 font-semibold">Test Mode</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="md:col-span-1 text-left">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <User className="w-6 h-6 text-blue-500" /> Customer Details
            </h2>
            <p className="text-gray-600 mt-2">{customerDetails.name}</p>
            <p className="text-gray-600">
              {/* {customerDetails.address?.addressLine1}, */}
               {customerDetails.address?.addressLine2}
            </p>
            <p className="text-gray-600">
              {customerDetails.address?.city}, {customerDetails.address?.state} {customerDetails.address?.postalCode}
            </p>
          </div>
          <div className="md:col-span-1 text-left">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-blue-500" /> Company Details
            </h2>
            <p className="text-gray-600 mt-2">{companyDetails.name}</p>
            <p className="text-gray-600">{companyDetails.address}</p>
            <p className="text-gray-600">{companyDetails.contact}</p>
          </div>
        </div>

        <div className="flex-grow overflow-y-auto">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-blue-500" /> Items
            </h2>
            <ul className="mt-4 space-y-4">
              {items.map((item, index) => (
                <li
                  key={index}
                  className="flex flex-col bg-gray-100 p-4 rounded-lg shadow-sm"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-gray-800 font-medium">{item.name}</span>
                    <span className="text-gray-800 font-semibold">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-sm text-left text-gray-600 mt-2">{item.description}</p>
                </li>
              ))}
            </ul>
          </div>

          <hr className="my-6" />

          <div className="flex justify-between text-xl font-bold text-gray-800">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-800">Order Notes</h2>
            <p className="text-gray-600 mt-2">
              Thank you for your order! If you have any questions, please contact us at support@investorbootz.com.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}