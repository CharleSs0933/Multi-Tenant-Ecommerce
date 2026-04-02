import z from "zod";

import { DEFAULT_LIMIT } from "@/contants";
import { Media, Tenant } from "@/payload-types";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

export const libraryRouter = createTRPCRouter({
  getMany: protectedProcedure
    .input(
      z.object({
        cursor: z.number().default(1),
        limit: z.number().default(DEFAULT_LIMIT),
      }),
    )
    .query(async ({ ctx, input }) => {
      const data = await ctx.db.find({
        collection: "orders",
        depth: 0, // We want to just get ids, without populating
        limit: input.limit,
        page: input.cursor,
        where: {
          user: {
            equals: ctx.session.user.id,
          },
        },
      });

      const productsIds = data.docs.map((order) => order.product);

      const productsData = await ctx.db.find({
        collection: "products",
        depth: 2, // Populate "category", "image", "tenant" & "tenant.image"
        pagination: false,
        where: {
          id: {
            in: productsIds,
          },
        },
      });

      return {
        ...productsData,
        docs: productsData.docs.map((doc) => ({
          ...doc,
          image: doc.image as Media | null,
          tenant: doc.tenant as Tenant & {
            image: Media | null;
          },
        })),
      };
    }),
});
