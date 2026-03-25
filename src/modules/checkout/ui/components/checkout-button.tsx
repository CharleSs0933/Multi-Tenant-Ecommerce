import { Button } from "@/components/ui/button";
import { cn, generateTenantUrl } from "@/lib/utils";

import { useCart } from "../../hooks/use-cart";
import Link from "next/link";
import { ShoppingCartIcon } from "lucide-react";

interface CheckoutButtonProps {
  className?: string;
  hideIfEmpty?: boolean;
  tenantSlug: string;
}

const CheckoutButton = ({
  className,
  hideIfEmpty,
  tenantSlug,
}: CheckoutButtonProps) => {
  const { totalItems } = useCart(tenantSlug);

  if (hideIfEmpty && totalItems === 0) return null;

  return (
    <Button variant={"elevated"} asChild className={cn("bg-white", className)}>
      <Link
        href={`${generateTenantUrl(tenantSlug)}/checkout`}
        className="flex items-center justify-center gap-1"
      >
        <ShoppingCartIcon /> {totalItems > 0 ? totalItems : ""}
      </Link>
    </Button>
  );
};

export default CheckoutButton;
