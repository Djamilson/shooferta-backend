/*
  Warnings:

  - A unique constraint covering the columns `[product_id]` on the table `prices` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[price_id]` on the table `products` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `price_id` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "price_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "prices_product_id_key" ON "prices"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "products_price_id_key" ON "products"("price_id");
