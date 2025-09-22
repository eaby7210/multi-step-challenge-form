import { CheckSquare } from "lucide-react";
const IndModals = [
  {
    id: "photos",
    title: "Property Photos",
    subtitle: "Send a photographer to a property to take pictures",
    modal: (
      <div className="space-y-6 text-sm text-start">
        {/* Title */}
        <h2 className="text-lg font-semibold">
          What's Included in Your Photography Service
        </h2>

        {/* Section: We Handle Everything */}
        <div>
          <h3 className="font-semibold mb-2">We Handle Everything</h3>
          <ul className="space-y-1">
            <li className="flex items-start gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              Professional photographer selection & dispatch for premium
              photos**
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
              Professional photography exactly as ordered
            </li>
          </ul>
        </div>

        {/* Section: Quality Guaranteed */}
        <div>
          <h3 className="font-semibold mb-2">Quality Guaranteed</h3>
          <ul className="space-y-1">
            <li className="flex items-start gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              Quality control review of every image
            </li>
            <li className="flex items-start gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              Only approved photos delivered to you
            </li>
            <li className="flex items-start gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              Exception handling for any special requests
            </li>
          </ul>
        </div>

        {/* Footer */}
        <p className="font-semibold">
          One order. One trip. Professional results delivered.*
        </p>

        <p className="text-xs text-muted-foreground">
          *Properties must be safe and accessible for service completion. Price
          includes one trip fee only. See Order Protection for additional
          options.
        </p>
        <p className="text-xs text-muted-foreground">
          **Order protection not available for premium photos offering
        </p>
      </div>
    ),
  },
  {
    id: "lockboxes",
    title: "LockBoxes",
    subtitle: "Have a lockbox installed at the property",
    modal: (
      <div className="space-y-6 text-sm text-start">
        {/* Title */}
        <h2 className="text-lg font-semibold">
          What's Included in Your LockBox Service
        </h2>

        {/* Section: We Handle Everything */}
        <div>
          <h3 className="font-semibold mb-2">We Handle Everything</h3>
          <ul className="space-y-1">
            <li className="flex items-start gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              Professional BootzForce™ Rep selection & dispatch
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
              Professional service delivery with photo proof
            </li>
          </ul>
        </div>

        {/* Section: Quality Guaranteed */}
        <div>
          <h3 className="font-semibold mb-2">Quality Guaranteed</h3>
          <ul className="space-y-1">
            <li className="flex items-start gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              Quality control review for completeness & standards
            </li>
            <li className="flex items-start gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              Detailed reporting delivered to you
            </li>
          </ul>
        </div>

        {/* Footer */}
        <p className="font-semibold">
          One order. One trip. Professional results delivered.
        </p>

        <p className="text-xs text-muted-foreground">
          *Properties must be safe and accessible for service completion. Price
          includes one trip fee only. See Order Protection for additional
          options.
        </p>
      </div>
    ),
  },
  {
    id: "notary",
    title: "Notarizations & Signings",
    subtitle: "Have documents signed or notarized",
    modal: (
      <div className="space-y-6 text-sm text-start">
        {/* Title */}
        <h2 className="text-lg font-semibold">
          What's Included in Your Notary Service
        </h2>

        {/* Section: We Handle Everything */}
        <div>
          <h3 className="font-semibold mb-2">We Handle Everything</h3>
          <ul className="space-y-1">
            <li className="flex items-start gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              Commissioned, insured, background-checked notary selection &
              dispatch
            </li>
            <li className="flex items-start gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              Contract coordination & scheduling
            </li>
            <li className="flex items-start gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              In-person OR remote options nationwide
            </li>
            <li className="flex items-start gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              All travel fees included for in-person visits; no hidden costs
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
              Professional notarization & document review
            </li>
            <li className="flex items-start gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              Scans included for quality review (PDF)
            </li>
          </ul>
        </div>

        {/* Section: Quality Guaranteed */}
        <div>
          <h3 className="font-semibold mb-2">Quality Guaranteed</h3>
          <ul className="space-y-1">
            <li className="flex items-start gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              Quality control review of scan-backs; we fix issues before final
              delivery
            </li>
            <li className="flex items-start gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              FedEx/courier coordination for originals when requested
            </li>
            <li className="flex items-start gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              Exception handling for any special requests
            </li>
            <li className="flex items-start gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              Digital copies delivered to you and stored permanently in your
              order
            </li>
          </ul>
        </div>

        {/* Section: Delivery & Records */}
        <div>
          <h3 className="font-semibold mb-2">Delivery & Records</h3>
          <ul className="space-y-1">
            <li className="flex items-start gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              Digital copy delivered to you and saved in your order
            </li>
            <li className="flex items-start gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              Mail/courier coordination for originals when required
            </li>
          </ul>
        </div>

        {/* Footer */}
        <p className="font-semibold">
          One order. Flexible delivery. Professional notarization completed.
        </p>

        <p className="text-xs text-muted-foreground">
          *Properties must be safe and accessible for service completion. Price
          includes one trip fee only. See Order Protection for additional
          options.
        </p>
      </div>
    ),
  },
  {
    id: "videos",
    title: "Property Videos",
    subtitle: "Send a videographer to a property to record video",
    modal: (
      <div className="space-y-6 text-sm text-start">
        {/* Title */}
        <h2 className="text-lg font-semibold">
          What's Included in Your Videography Service
        </h2>

        {/* Section: We Handle Everything */}
        <div>
          <h3 className="font-semibold mb-2">We Handle Everything</h3>
          <ul className="space-y-1">
            <li className="flex items-start gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              BootzForce™ Rep selection & dispatch
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
              Walk-through video recording meeting our standards of excellence
            </li>
            <li className="flex items-start gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              Shot in landscape on a modern smartphone; steady pace, no pro
              lighting/editing
            </li>
          </ul>
        </div>

        {/* Section: Quality Guaranteed */}
        <div>
          <h3 className="font-semibold mb-2">Quality Guaranteed</h3>
          <ul className="space-y-1">
            <li className="flex items-start gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              QC review to confirm required areas are covered
            </li>
            <li className="flex items-start gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              Only approved videos delivered to you
            </li>
            <li className="flex items-start gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              Exception handling for special requests
            </li>
          </ul>
        </div>

        {/* Footer */}
        <p className="font-semibold">
          One order. One trip. Clear property videos delivered fast.
        </p>

        <p className="text-xs text-muted-foreground">
          *Properties must be safe and accessible for service completion. Price
          includes one trip fee only. See Order Protection for additional
          options.
        </p>
      </div>
    ),
  },
  {
    id: "repairs",
    title: "Home Maintenance & Repairs",
    subtitle: "Receive and approve bids for repair work on a property",
    modal: (
      <div className="space-y-6 text-sm text-start">
        {/* Title */}
        <h2 className="text-lg font-semibold">
          Bids and contract work scheduling
        </h2>

        {/* Section: Get Bids Only */}
        <div>
          <h3 className="font-semibold mb-2">Get Bids Only*</h3>
          <ul className="space-y-1">
            <li className="flex items-start gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              Vendor outreach & quote coordination
            </li>
            <li className="flex items-start gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              Vetted, comparable bids delivered to you
            </li>
            <li className="flex items-start gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              You choose who to hire, and coordinate repairs
            </li>
            <li className="flex items-start gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              Includes a bid comparison summary
            </li>
          </ul>
          <p className="text-xs text-muted-foreground mt-2 italic">
            *You hire and pay the vendor directly
          </p>
        </div>

        {/* Section: Managed Completion */}
        <div>
          <h3 className="font-semibold mb-2">
            Managed Completion (We Get It Done)
          </h3>
          <ul className="space-y-1">
            <li className="flex items-start gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              Everything in bids plus work approval, scheduling
            </li>
            <li className="flex items-start gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              Management of job status updates handled for you
            </li>
            <li className="flex items-start gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              Before & after documentation (images or video)
            </li>
            <li className="flex items-start gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              Quality standards verification
            </li>
            <li className="flex items-start gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              One change-order coordination included
            </li>
            <li className="flex items-start gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              Vendor invoice processed via your approved payment method
            </li>
          </ul>
        </div>

        {/* Footer */}
        <p className="font-semibold">
          Choose your level. We handle the complexity. You get results.
        </p>
      </div>
    ),
  },
  {
    id: "inspections",
    title: "Home Inspections",
    subtitle: "Send a licensed home inspector to a property",
    modal: (
      <div className="space-y-6 text-sm text-start">
        {/* Title */}
        <h2 className="text-lg font-semibold">Home Inspections</h2>

        {/* Section: We Handle Everything */}
        <div>
          <h3 className="font-semibold mb-2">We Handle Everything</h3>
          <ul className="space-y-1">
            <li className="flex items-start gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              Licensed home inspector dispatch (48-hour minimum)
            </li>
            <li className="flex items-start gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              One comprehensive onsite visit – travel fees included
            </li>
            <li className="flex items-start gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              Full property inspection following industry standards
            </li>
          </ul>
        </div>

        {/* Section: On-Site Scope */}
        <div>
          <h3 className="font-semibold mb-2">On-Site Scope</h3>
          <ul className="space-y-1">
            <li className="flex items-start gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              Major systems: roof, exterior, structure, electrical, plumbing,
              HVAC, interior
            </li>
            <li className="flex items-start gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              Photo documentation of material conditions & safety items
            </li>
            <li className="flex items-start gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              2D floor plan measured and created (PDF + image)
            </li>
          </ul>
        </div>

        {/* Section: Quality & Delivery */}
        <div>
          <h3 className="font-semibold mb-2">Quality & Delivery</h3>
          <ul className="space-y-1">
            <li className="flex items-start gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              Quality review by our team before delivery
            </li>
            <li className="flex items-start gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              Full inspection report + floor plan delivered to your order portal
            </li>
          </ul>
        </div>

        {/* Section: Why it Helps */}
        <div>
          <h3 className="font-semibold mb-2">Why it Helps</h3>
          <ul className="space-y-1">
            <li className="flex items-start gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              Clear go / no-go summary for buyers
            </li>
            <li className="flex items-start gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              Negotiation leverage with documented findings
            </li>
          </ul>
        </div>

        {/* Footer */}
        <p className="font-semibold">
          One order. Licensed expertise. Confident property decisions.
        </p>

        <p className="text-xs text-muted-foreground">
          *Properties must be safe and accessible for service completion. Price
          includes one trip fee only. Order Protection is not available for this
          service.
        </p>
      </div>
    ),
  },
  {
    id: "onDemand",
    title: "On Demand Services",
    subtitle: "Send a representative to the property for onsite purposes",
    modal: (
      <div className="space-y-6 text-sm text-start">
        {/* Title */}
        <h2 className="text-lg font-semibold">On Demand Service</h2>

        {/* Section: We Handle Everything */}
        <div>
          <h3 className="font-semibold mb-2">We Handle Everything</h3>
          <ul className="space-y-1">
            <li className="flex items-start gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              BootzForce™ Rep scheduled & dispatched for you
            </li>
            <li className="flex items-start gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              One onsite visit – all travel fees covered
            </li>
            <li className="flex items-start gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              Safety & access confirmation before work begins
            </li>
          </ul>
        </div>

        {/* Section: Professional Service Delivery */}
        <div>
          <h3 className="font-semibold mb-2">Professional Service Delivery</h3>
          <ul className="space-y-1">
            <li className="flex items-start gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              Service completed exactly as ordered (letters, checks, access,
              etc.)
            </li>
            <li className="flex items-start gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              Photo proof provided for verification when applicable
            </li>
          </ul>
        </div>

        {/* Section: Quality Guaranteed */}
        <div>
          <h3 className="font-semibold mb-2">Quality Guaranteed</h3>
          <ul className="space-y-1">
            <li className="flex items-start gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              QC review to ensure order accuracy
            </li>
            <li className="flex items-start gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              Completion receipt + media delivered directly to you
            </li>
          </ul>
        </div>

        {/* Footer */}
        <p className="font-semibold">
          One order. One visit. Exactly as requested.
        </p>

        <p className="text-xs text-muted-foreground">
          *Properties must be safe and accessible for service completion. Price
          includes one trip fee only. See Order Protection for additional
          options.
        </p>
      </div>
    ),
  },
];

export default IndModals
