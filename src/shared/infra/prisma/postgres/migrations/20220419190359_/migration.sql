/*
  Warnings:

  - You are about to drop the column `name` on the `orders` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[person_id]` on the table `addresses_persons` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[person_id]` on the table `phones_persons` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[product_id]` on the table `prices` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "categories" ALTER COLUMN "slug" DROP NOT NULL,
ALTER COLUMN "photo" DROP NOT NULL;

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "name";

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "price_id" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "addresses_persons_person_id_key" ON "addresses_persons"("person_id");

-- CreateIndex
CREATE UNIQUE INDEX "phones_persons_person_id_key" ON "phones_persons"("person_id");

-- CreateIndex
CREATE UNIQUE INDEX "prices_product_id_key" ON "prices"("product_id");

-- AddForeignKey
ALTER TABLE "persons" ADD CONSTRAINT "persons_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "addresses_persons"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "persons" ADD CONSTRAINT "persons_phone_id_fkey" FOREIGN KEY ("phone_id") REFERENCES "phones_persons"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_price_id_fkey" FOREIGN KEY ("price_id") REFERENCES "prices"("id") ON DELETE SET NULL ON UPDATE CASCADE;
