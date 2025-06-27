import { MapPin, Building, Users } from 'lucide-react';
import { useState } from 'react';

const Step2 = ({ formData, handleChange, onNext, onPrev }) => {
  const [nextClicked, setNextClicked] = useState(false);

  // Only allow up to 10 characters for postal code
  const handlePostalCodeChange = (e) => {
    if (e.target.value.length <= 10) {
      handleChange(e);
    }
  };

 const handleValidation = () => {
  setNextClicked(true);
  const errors = [];
  if (!formData.company_name || formData.company_name.trim() === '') {
    errors.push('Company name is required.');
  }
  if (!formData.city || formData.city.trim() === '') {
    errors.push('City is required.');
  }
  if (!formData.state || formData.state.trim() === '') {
    errors.push('State is required.');
  }
  if (!formData.postalCode || formData.postalCode.trim() === '') {
    errors.push('Postal code is required.');
  } else if ((formData.postalCode || '').length > 10) {
    errors.push('Postal code cannot be more than 10 characters.');
  }
  if (errors.length === 0) {
    onNext();
  }
};

  return (
    <>
      <div className="mb-6">
        <div className="mb-2 text-sm font-medium text-gray-700 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-500" />
          <span className="text-lg font-semibold">Address</span>
        </div>
       
      </div>
     
        

       <div className="mb-6">
        <label htmlFor="streetAddress" className="mb-2 text-sm font-medium text-main flex items-center gap-2">
          Company Name
        </label>
        <div className="relative">
          <input
            type="text"
            id="company_name"
            name="company_name"
            value={formData.company_name || ''}
            onChange={handleChange}
            placeholder="Enter Company Name"
            className="bg-card border border-primary text-main text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 pl-10 transition-all duration-200 shadow-sm focus:shadow-md"
            required
          />
          <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary pointer-events-none" />
        </div>
        {nextClicked && (
  <div className="mt-2">
    {!formData.company_name && <div className="text-red-600 text-xs">Company name is required.</div>}
   
  </div>
)}
      </div>
       <div className="mb-6">
        <label htmlFor="city" className="mb-2 text-sm font-medium text-main flex items-center gap-2">
          City
        </label>
        <div className="relative">
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city || ''}
            onChange={handleChange}
            placeholder="Enter city"
            className="bg-card border border-primary text-main text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 pl-10 transition-all duration-200 shadow-sm focus:shadow-md"
            required
          />
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary pointer-events-none" />
        </div>
        {nextClicked && (
  <div className="mt-2">
   
    {!formData.city && <div className="text-red-600 text-xs">City is required.</div>}
   
  </div>
)}
      </div>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="state" className="mb-2 text-sm font-medium text-main flex items-center gap-2">
            State
          </label>
          <div className="relative">
            <select
              id="state"
              name="state"
              value={formData.state || ''}
              onChange={handleChange}
              className="bg-card border border-primary text-main text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 transition-all duration-200 shadow-sm focus:shadow-md"
              required
              autoComplete="address-level1"
            >
              <option value="" disabled>Select state</option>
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AS">American Samoa</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="DC">District of Columbia</option>
              <option value="FM">Federated States Of Micronesia</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="GU">Guam</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MH">Marshall Islands</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="MP">Northern Mariana Islands</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PW">Palau</option>
              <option value="PA">Pennsylvania</option>
              <option value="PR">Puerto Rico</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VI">Virgin Islands</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
              <option value="AE">Armed Forces Africa / Canada / Europe / Middle East</option>
              <option value="AA">Armed Forces America (Except Canada)</option>
              <option value="AP">Armed Forces Pacific</option>
            </select>
          </div>
          {nextClicked && (
  <div className="mt-2">
   
    {!formData.state && <div className="text-red-600 text-xs">State is required.</div>}
    
  </div>
)}
        </div>

        <div>
          <label htmlFor="postalCode" className="mb-2 text-sm font-medium text-main flex items-center gap-2">
            Postal Code
          </label>
          <div className="relative">
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={formData.postalCode || ''}
              onChange={handlePostalCodeChange}
              placeholder="Enter postal code"
              className="bg-card border border-primary text-main text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 pl-10 transition-all duration-200 shadow-sm focus:shadow-md"
              required
              maxLength={10}
            />
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary pointer-events-none" />
          </div>
         
           {nextClicked && (
  <div className="mt-2">
   
    {(!formData.postalCode || formData.postalCode.length > 10) && (
      <div className="text-red-600 text-xs">
        {(!formData.postalCode) ? 'Postal code is required.' : 'Postal code cannot be more than 10 characters.'}
      </div>
    )}
  </div>
)}
        </div>
      </div>
      <div className="mb-6">
        <label htmlFor="unit" className="mb-2 text-sm font-medium text-main flex items-center gap-2">
          Unit/Apt/Suite <span className="text-main text-xs opacity-60">(optional)</span>
        </label>
        <div className="relative">
          <input
            type="text"
            id="unit"
            name="unit"
            value={formData.unit || ''}
            onChange={handleChange}
            placeholder="e.g. Apt 2B, Suite 101"
            className="bg-card border border-primary text-main text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 pl-10 transition-all duration-200 shadow-sm focus:shadow-md"
          />
          <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary pointer-events-none" />
        </div>
      </div>
     
 <div className="sticky bottom-0 left-0 w-full bg-white/90 backdrop-blur z-20 shadow-[0_-2px_8px_0_rgba(0,0,0,0.04)] flex flex-col md:flex-row justify-between items-center px-4 py-3 mt-4 border-t">
                <button
                  type="button"
                  className={`w-full md:w-auto px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 focus:outline-none font-semibold transition-all duration-200`}
                  onClick={onPrev}
                >
                  Previous
                </button>
               
                  <button
                    type="button"
                    className={
                      "w-full md:w-auto mt-2 md:mt-0 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 focus:outline-none font-semibold transition-all duration-200 "
                    }
                    onClick={handleValidation}
                  >
                    Next
                  </button>
                
              </div>
      
    </>
  );
};

export default Step2;
