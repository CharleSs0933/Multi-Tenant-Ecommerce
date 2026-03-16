import React from "react";

interface Props {
  params: Promise<{ category: string }>;
}

const CategoryPage = async ({ params }: Props) => {
  const { category } = await params;

  return <div>CategoryPage</div>;
};

export default CategoryPage;
