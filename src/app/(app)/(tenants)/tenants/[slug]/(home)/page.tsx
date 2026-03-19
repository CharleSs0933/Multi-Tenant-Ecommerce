import type { SearchParams } from "nuqs/server";

import { DEFAULT_LIMIT } from "@/contants";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { loadProductFilters } from "@/modules/products/search-params";
import ProdictListView from "@/modules/products/ui/views/product-list-view";

interface Props {
  searchParams: Promise<SearchParams>;
  params: Promise<{ slug: string }>;
}

const TenantPage = async ({ params, searchParams }: Props) => {
  const { slug } = await params;
  const filters = await loadProductFilters(searchParams);

  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions(
      {
        ...filters,
        tenantSlug: slug,
        limit: DEFAULT_LIMIT,
      },
      {
        getNextPageParam: (lastPage) => {
          return lastPage.docs.length > 0 ? lastPage.nextPage : undefined;
        },
      },
    ),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProdictListView tenantSlug={slug} narrowView={true} />
    </HydrationBoundary>
  );
};

export default TenantPage;
