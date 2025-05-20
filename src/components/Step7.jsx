import React from 'react';
import { Calendar, Clock, User, Phone, Mail } from 'lucide-react';

const Step7 = ({ formData, handleChange, onNext, onPrev, currentStep, stepsLength }) => {
  const isLastStep = currentStep === stepsLength - 1;
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-main mb-8 text-center flex items-center justify-center gap-2">
        <Calendar className="w-7 h-7 text-primary" />
        Schedule Your Appointment
      </h2>
      <div className="mb-8 flex flex-col gap-6 items-center">
        {/* Preferred Date & Time */}
        <div className="w-full max-w-md">
          <label className="font-semibold mb-2 flex items-center gap-2 text-main">
            <Clock className="w-5 h-5 text-primary" />
            Preferred Date & Time
          </label>
          <input
            type="datetime-local"
            name="preferred_datetime"
            value={formData.preferred_datetime || ''}
            onChange={handleChange}
            className="border border-primary rounded p-2 w-full focus:ring-2 focus:ring-primary focus:border-primary text-main"
          />
        </div>
        {/* Point of Contact */}
        <div className="w-full max-w-md bg-card rounded-xl p-4 border border-primary flex flex-col gap-4 mt-4">
          <div className="font-semibold text-main mb-2 flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            Point of Contact for Scheduling
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              <input
                type="text"
                name="contact_name_sched"
                value={formData.contact_name_sched || ''}
                onChange={handleChange}
                placeholder="Full Name"
                className="border border-primary rounded p-2 w-full focus:ring-2 focus:ring-primary focus:border-primary text-main"
              />
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary" />
              <input
                type="tel"
                name="contact_phone_sched"
                value={formData.contact_phone_sched || ''}
                onChange={handleChange}
                placeholder="Phone Number"
                className="border border-primary rounded p-2 w-full focus:ring-2 focus:ring-primary focus:border-primary text-main"
              />
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" />
              <input
                type="email"
                name="contact_email_sched"
                value={formData.contact_email_sched || ''}
                onChange={handleChange}
                placeholder="Email Address"
                className="border border-primary rounded p-2 w-full focus:ring-2 focus:ring-primary focus:border-primary text-main"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-8 gap-2">
        <button
          type="button"
          className={`px-4 py-2 bg-secondary text-inverse rounded-lg hover:bg-primary hover:text-inverse focus:outline-none font-semibold transition-all duration-200 ${currentStep === 0 ? "invisible" : ""}`}
          onClick={onPrev}
        >
          Previous
        </button>
        <button
          type="button"
          className="px-6 py-2 bg-primary text-inverse rounded-lg hover:bg-cyan focus:outline-none font-semibold text-lg shadow"
          onClick={onNext}
        >
          {isLastStep ? 'Submit' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default Step7;
