/*
  Warnings:

  - Added the required column `product_info_id` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "product_info_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_product_info_id_fkey" FOREIGN KEY ("product_info_id") REFERENCES "products_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
