import { MapPin, Building } from 'lucide-react';

const Step2 = ({ formData, handleChange }) => {
  return (
    <>
      <div className="mb-6">
        <div className="mb-2 text-sm font-medium text-gray-700 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-500" />
          <span className="text-lg font-semibold">Address</span>
        </div>
        {/* <div className="relative">
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address || ''}
            onChange={handleChange}
            placeholder="Enter street address"
            className="bg-white border border-gray-300 text-gray-800 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 pl-12 transition-all duration-200 shadow-md hover:shadow-lg"
            required
          />
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-500 pointer-events-none" />
        </div> */}
      </div>
      

       <div className="mb-6">
        <label htmlFor="streetAddress" className="mb-2 text-sm font-medium text-main flex items-center gap-2">
          Street Address
        </label>
        <div className="relative">
          <input
            type="text"
            id="streetAddress"
            name="streetAddress"
            value={formData.streetAddress || ''}
            onChange={handleChange}
            placeholder="Enter street address"
            className="bg-card border border-primary text-main text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 pl-10 transition-all duration-200 shadow-sm focus:shadow-md"
            required
          />
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary pointer-events-none" />
        </div>
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
              <option value="Alabama">Alabama</option>
              <option value="Alaska">Alaska</option>
              <option value="American Samoa">American Samoa</option>
              <option value="Arizona">Arizona</option>
              <option value="Arkansas">Arkansas</option>
              <option value="California">California</option>
              <option value="Colorado">Colorado</option>
              <option value="Connecticut">Connecticut</option>
              <option value="Delaware">Delaware</option>
              <option value="District of Columbia">District of Columbia</option>
              <option value="Florida">Florida</option>
              <option value="Georgia">Georgia</option>
              <option value="Guam">Guam</option>
              <option value="Hawaii">Hawaii</option>
              <option value="Idaho">Idaho</option>
              <option value="Illinois">Illinois</option>
              <option value="Indiana">Indiana</option>
              <option value="Iowa">Iowa</option>
              <option value="Kansas">Kansas</option>
              <option value="Kentucky">Kentucky</option>
              <option value="Louisiana">Louisiana</option>
              <option value="Maine">Maine</option>
              <option value="Maryland">Maryland</option>
              <option value="Massachusetts">Massachusetts</option>
              <option value="Michigan">Michigan</option>
              <option value="Minnesota">Minnesota</option>
              <option value="Mississippi">Mississippi</option>
              <option value="Missouri">Missouri</option>
              <option value="Montana">Montana</option>
              <option value="Nebraska">Nebraska</option>
              <option value="Nevada">Nevada</option>
              <option value="New Hampshire">New Hampshire</option>
              <option value="New Jersey">New Jersey</option>
              <option value="New Mexico">New Mexico</option>
              <option value="New York">New York</option>
              <option value="North Carolina">North Carolina</option>
              <option value="North Dakota">North Dakota</option>
              <option value="Northern Mariana Islands">Northern Mariana Islands</option>
              <option value="Ohio">Ohio</option>
              <option value="Oklahoma">Oklahoma</option>
              <option value="Oregon">Oregon</option>
              <option value="Pennsylvania">Pennsylvania</option>
              <option value="Puerto Rico">Puerto Rico</option>
              <option value="Rhode Island">Rhode Island</option>
              <option value="South Carolina">South Carolina</option>
              <option value="South Dakota">South Dakota</option>
              <option value="Tennessee">Tennessee</option>
              <option value="Texas">Texas</option>
              <option value="Utah">Utah</option>
              <option value="U.S. Virgin Islands">U.S. Virgin Islands</option>
              <option value="Vermont">Vermont</option>
              <option value="Virginia">Virginia</option>
              <option value="Washington">Washington</option>
              <option value="West Virginia">West Virginia</option>
              <option value="Wisconsin">Wisconsin</option>
              <option value="Wyoming">Wyoming</option>
              <option value="Armed Forces Americas">Armed Forces Americas</option>
              <option value="Armed Forces Europe">Armed Forces Europe</option>
              <option value="Armed Forces Pacific">Armed Forces Pacific</option>
            </select>
          </div>
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
            onChange={handleChange}
            placeholder="Enter postal code"
            className="bg-card border border-primary text-main text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 pl-10 transition-all duration-200 shadow-sm focus:shadow-md"
            required
          />
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary pointer-events-none" />
        </div>
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
     

      
    </>
  );
};

export default Step2;
