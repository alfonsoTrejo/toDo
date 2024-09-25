"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function leftSheet() {
  return (
<Sheet>
  <SheetTrigger>{"<<"}</SheetTrigger>
  <SheetContent side="left">
    <SheetHeader>
      <SheetTitle>Historial de ensayo</SheetTitle>
      <SheetDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>
  );
}
