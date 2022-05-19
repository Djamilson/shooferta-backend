/*
  Warnings:

  - The primary key for the `categories_products` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `categories_products` table. All the data in the column will be lost.
  - The primary key for the `users_groups` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `users_groups` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "categories_products_id_product_id_idx";

-- AlterTable
ALTER TABLE "categories_products" DROP CONSTRAINT "categories_products_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "categories_products_pkey" PRIMARY KEY ("category_id", "product_id");

-- AlterTable
ALTER TABLE "users_groups" DROP CONSTRAINT "users_groups_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "users_groups_pkey" PRIMARY KEY ("user_id", "group_id");

-- CreateIndex
CREATE INDEX "categories_products_category_id_product_id_idx" ON "categories_products"("category_id", "product_id");
