/*
  Warnings:

  - A unique constraint covering the columns `[category_id,product_id]` on the table `categories_products` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "categories_products_category_id_product_id_key" ON "categories_products"("category_id", "product_id");
