/*
  Warnings:

  - Added the required column `product_id` to the `categories_products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "categories_products" ADD COLUMN     "product_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "categories_products" ADD CONSTRAINT "categories_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
