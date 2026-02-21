import {
  InputGroup as InputGroupUI,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";
import * as React from "react";

// expose value/onChange so callers can control the input
export interface SearchInputGroupProps extends React.ComponentProps<
  typeof InputGroupUI
> {
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  resultsText?: React.ReactNode; // optional text shown at the end
}

export function InputGroup({
  value,
  onChange,
  resultsText,
  ...props
}: SearchInputGroupProps) {
  return (
    <InputGroupUI className="max-w-xs" {...props}>
      <InputGroupInput
        placeholder="Search..."
        value={value}
        onChange={onChange}
      />
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">
        {resultsText || "12 results"}
      </InputGroupAddon>
    </InputGroupUI>
  );
}
