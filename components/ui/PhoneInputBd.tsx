import React, { use, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Image from "next/image";

interface BangladeshPhoneInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onValueChange: (value: string) => void;
  value?: string;
}

const BangladeshPhoneInput = React.forwardRef<
  HTMLInputElement,
  BangladeshPhoneInputProps
>(({ className, onValueChange, value = "", ...props }, ref) => {
  // Ensure input value excludes +880 but is passed correctly to parent

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    onValueChange(value); // Update parent with full number including country code

    // Update parent with full number including country code
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="phone">Phone Number</Label>
      <div className="flex items-center gap-2">
        {/* Bangladesh Flag */}
        <div className="flex h-10 w-14 items-center justify-center rounded-md border bg-[#006a4e] p-2">
          <Image
            src="https://purecatamphetamine.github.io/country-flag-icons/3x2/BD.svg"
            alt="Bangladesh Flag"
            width={24}
            height={24}
            className="h-5 w-5"
          />
        </div>

        {/* Phone number input with visual country code prefix */}
        <div className="relative flex-1">
          <Input
            {...props}
            ref={ref}
            type="text"
            id="phone"
            value={value}
            placeholder="01XXXXXXXXXX"
            className={cn("pl-1", className)}
            maxLength={11}
            onChange={handleInput}
            inputMode="numeric"
          />
        </div>
      </div>
    </div>
  );
});

BangladeshPhoneInput.displayName = "BangladeshPhoneInput";

export { BangladeshPhoneInput };
