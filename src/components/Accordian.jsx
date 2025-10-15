
import React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "../lib/utils"

function Accordion(props) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />
}

function AccordionItem({ className, ...props }) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("my-3 p-3 bg-white  last:border-b-0", className)}
      {...props}
    />
  )
}


function AccordionTrigger({
  className,
  children,
  actionText = "Configure",
  subText,
  disabled = false,
  ...props
}) {
  // console.log(`In AccordionTrigger ${actionText}`)
  return (
    <AccordionPrimitive.Header className="flex w-full ">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        disabled={disabled}
        className={cn(
          "flex w-full items-center justify-between gap-4 rounded-md py-4 text-left text-sm font-medium outline-none hover:no-underline",
          "focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring",
          "disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
        
          "[&[data-state=open]_.trigger-icon]:rotate-180",
          className
        )}
        {...props}
      >
        {/* left side */}
        <div className="flex flex-col text-left">{children}</div>

        {/* right side (fake button + optional subtext) */}
        <div className="flex flex-col items-end shrink-0">
          <div
            className={cn(
             "flex items-center justify-center gap-2 h-9 w-36 min-w-[120px] px-4 text-sm transition-colors",
              disabled
                ? "bg-gray-200 text-gray-500"
                : "bg-primary text-white hover:bg-blue-800"
            )}
          >
            <span>{actionText}</span>

            {/* ✅ add trigger-icon class */}
            <ChevronDownIcon
              className="trigger-icon h-4 w-4 shrink-0 translate-y-0.5 transition-transform duration-200"
              aria-hidden
            />
          </div>

          {subText && (
            <span className="text-xs text-[#0BC88C] mt-1">{subText}</span>
          )}
        </div>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}



function AccordionContent({
  className,
  children,
  ...props
}) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
      {...props}
    >
      <div className={cn("pt-0 pb-4", className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }