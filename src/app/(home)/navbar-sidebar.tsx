import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Link from "next/link";
import React from "react";

const NavbarSidebar = ({
  items,
  open,
  onOpenChange,
}: {
  items: { href: string; children: React.ReactNode }[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="p-0 transition-none">
        <SheetHeader className="p-4 border-b">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <ScrollArea>
          <div className="flex flex-col overflow-y-auto h-full pb-2">
            {items.map((item) => (
              <Link
                href={item.href}
                key={item.href}
                className="w-full text-left p-4 hover:bg-black hover:text-white items-center
              text-base font-medium"
                onClick={() => onOpenChange(false)}
              >
                {item.children}
              </Link>
            ))}
            <div className="border-t flex flex-col">
              <Link
                href={"/sign-in"}
                className="w-full text-left p-4 hover:bg-black hover:text-white items-center
              text-base font-medium"
                onClick={() => onOpenChange(false)}
              >
                Log in
              </Link>
              <Link
                href={"/sign-up"}
                className="w-full text-left p-4 hover:bg-black hover:text-white items-center
              text-base font-medium"
                onClick={() => onOpenChange(false)}
              >
                Start selling
              </Link>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default NavbarSidebar;
