/*
  Warnings:

  - Added the required column `price_id` to the `orders_products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders_products" ADD COLUMN     "price_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "orders_products" ADD CONSTRAINT "orders_products_price_id_fkey" FOREIGN KEY ("price_id") REFERENCES "prices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
