import { CheckSquare } from "lucide-react";
import ModalWrapper from "../components/ModalWrapper";
export default function OrderProtectionModal({ handleClose }) {
  return (
    <ModalWrapper handleClose={ handleClose }>
      <div className="space-y-4 text-start">
        <h2 className="text-lg font-semibold">
          Don’t worry – we’ll finish the job.
        </h2>

        <p className="text-gray-700">
          Sometimes gates don’t open, tenants no-show, or schedules collide. Add
          Deal-Saver™ Protection and we’ll manage the hiccups and see it
          through.*
        </p>

        <h3 className="font-semibold">You’ll receive:</h3>
        <ul className="space-y-2">
          <li className="flex items-start">
             <CheckSquare className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0 mr-2" />
            <span>
              One re-dispatch on us if access/safety/scheduling issues prevent
              completion.
            </span>
          </li>
          <li className="flex items-start">
             <CheckSquare className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0 mr-2" />
            <span>
              Priority rescheduling & coordination with everyone involved.
            </span>
          </li>
          <li className="flex items-start">
             <CheckSquare className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0 mr-2" />
            <span>
              Our completion guarantee once access and safety requirements are
              met.
            </span>
          </li>
        </ul>

        <h3 className="font-semibold">Great for situations like:</h3>
        <ul className="space-y-2">
          <li className="flex items-start">
             <CheckSquare className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0 mr-2" />
            <span>
              Property accessibility or safety issues preventing service
              completion, including gate/lockbox issues, HOA or security holds,
              occupant no-shows, weather delays, or last-minute calendar
              conflicts.
            </span>
          </li>
        </ul>

        <p className="text-xs text-gray-500">
          *Order Protection does not extend the cancellation window. Re-dispatch
          without order protection ranges from $40-60.
        </p>
      </div>
    </ModalWrapper>
  );
}
