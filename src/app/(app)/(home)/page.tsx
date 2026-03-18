import type { SearchParams } from "nuqs/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getQueryClient, trpc } from "@/trpc/server";

import { loadProductFilters } from "@/modules/products/search-params";
import ProdictListView from "@/modules/products/ui/views/product-list-view";
import { DEFAULT_LIMIT } from "@/contants";

interface Props {
  searchParams: Promise<SearchParams>;
}

const HomePage = async ({ searchParams }: Props) => {
  const filters = await loadProductFilters(searchParams);

  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions(
      {
        ...filters,
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
      <ProdictListView />
    </HydrationBoundary>
  );
};

export default HomePage;
