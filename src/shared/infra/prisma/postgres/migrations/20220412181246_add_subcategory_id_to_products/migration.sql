/*
  Warnings:

  - Added the required column `description_id` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subcategory_id` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "description_id" TEXT NOT NULL,
ADD COLUMN     "subcategory_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_subcategory_id_fkey" FOREIGN KEY ("subcategory_id") REFERENCES "subcategories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_description_id_fkey" FOREIGN KEY ("description_id") REFERENCES "descriptions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
