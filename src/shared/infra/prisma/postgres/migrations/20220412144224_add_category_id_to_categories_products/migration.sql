/*
  Warnings:

  - Added the required column `category_id` to the `categories_products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "categories_products" ADD COLUMN     "category_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "categories_products" ADD CONSTRAINT "categories_products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
