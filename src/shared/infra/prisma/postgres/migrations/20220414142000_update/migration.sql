/*
  Warnings:

  - You are about to drop the column `avatar` on the `addresses_persons` table. All the data in the column will be lost.
  - The `type` column on the `categories` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `products` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[name]` on the table `politics` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "TypeCategoryEnum" AS ENUM ('menu', 'slide');

-- DropIndex
DROP INDEX "prices_product_id_key";

-- AlterTable
ALTER TABLE "addresses_persons" DROP COLUMN "avatar",
ALTER COLUMN "street" SET DATA TYPE VARCHAR,
ALTER COLUMN "zip_code" SET DATA TYPE VARCHAR,
ALTER COLUMN "city" SET DATA TYPE VARCHAR,
ALTER COLUMN "state" SET DATA TYPE VARCHAR;

-- AlterTable
ALTER TABLE "banners" ALTER COLUMN "name" SET DATA TYPE VARCHAR,
ALTER COLUMN "type" SET DATA TYPE VARCHAR;

-- AlterTable
ALTER TABLE "categories" ALTER COLUMN "name" SET DATA TYPE VARCHAR,
DROP COLUMN "type",
ADD COLUMN     "type" "TypeCategoryEnum" NOT NULL DEFAULT E'menu',
ALTER COLUMN "slug" SET DATA TYPE VARCHAR,
ALTER COLUMN "photo" SET DATA TYPE VARCHAR;

-- AlterTable
ALTER TABLE "groups" ALTER COLUMN "name" SET DATA TYPE VARCHAR;

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "name" SET DATA TYPE VARCHAR,
ALTER COLUMN "status" SET DEFAULT E'awaiting';

-- AlterTable
ALTER TABLE "orders_products" ALTER COLUMN "status" SET DEFAULT E'awaiting';

-- AlterTable
ALTER TABLE "persons" ADD COLUMN     "avatar" VARCHAR,
ALTER COLUMN "rg" SET DATA TYPE VARCHAR,
ALTER COLUMN "rgss" SET DATA TYPE VARCHAR;

-- AlterTable
ALTER TABLE "phones_persons" ALTER COLUMN "phone" SET DATA TYPE VARCHAR;

-- AlterTable
ALTER TABLE "photos" ALTER COLUMN "name" SET DATA TYPE VARCHAR;

-- AlterTable
ALTER TABLE "politics" ALTER COLUMN "name" SET DATA TYPE VARCHAR,
ALTER COLUMN "slug" SET DATA TYPE VARCHAR;

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "sku" SET DATA TYPE VARCHAR,
ALTER COLUMN "bar_code" SET DATA TYPE VARCHAR,
DROP COLUMN "status",
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "products_info" ALTER COLUMN "company" SET DATA TYPE VARCHAR,
ALTER COLUMN "currency" SET DATA TYPE VARCHAR;

-- AlterTable
ALTER TABLE "refreshes_tokens" ALTER COLUMN "refresh_token" SET DATA TYPE VARCHAR,
ALTER COLUMN "device" SET DATA TYPE VARCHAR;

-- AlterTable
ALTER TABLE "reviews" ALTER COLUMN "status" SET DEFAULT E'awaiting analysis';

-- AlterTable
ALTER TABLE "stocks" ALTER COLUMN "status" SET DEFAULT E'stockIn',
ALTER COLUMN "action" SET DEFAULT E'sale';

-- AlterTable
ALTER TABLE "subcategories" ALTER COLUMN "name" SET DATA TYPE VARCHAR;

-- AlterTable
ALTER TABLE "transactions" ALTER COLUMN "transaction_id" SET DATA TYPE VARCHAR,
ALTER COLUMN "status" SET DATA TYPE VARCHAR,
ALTER COLUMN "brand" SET DATA TYPE VARCHAR,
ALTER COLUMN "authorization_code" SET DATA TYPE VARCHAR,
ALTER COLUMN "tid" SET DATA TYPE VARCHAR,
ALTER COLUMN "installments" SET DATA TYPE VARCHAR;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "password" SET DATA TYPE VARCHAR;

-- AlterTable
ALTER TABLE "videos" ALTER COLUMN "name" SET DATA TYPE VARCHAR,
ALTER COLUMN "slug" SET DATA TYPE VARCHAR;

-- CreateIndex
CREATE INDEX "categories_products_id_product_id_idx" ON "categories_products"("id", "product_id");

-- CreateIndex
CREATE INDEX "orders_id_user_id_idx" ON "orders"("id", "user_id");

-- CreateIndex
CREATE INDEX "orders_products_id_user_id_idx" ON "orders_products"("id", "user_id");

-- CreateIndex
CREATE INDEX "photos_id_product_id_idx" ON "photos"("id", "product_id");

-- CreateIndex
CREATE UNIQUE INDEX "politics_name_key" ON "politics"("name");

-- CreateIndex
CREATE INDEX "reviews_id_product_id_idx" ON "reviews"("id", "product_id");

-- CreateIndex
CREATE INDEX "stocks_id_product_id_idx" ON "stocks"("id", "product_id");

-- CreateIndex
CREATE INDEX "transactions_id_order_id_idx" ON "transactions"("id", "order_id");

-- CreateIndex
CREATE INDEX "videos_id_product_id_idx" ON "videos"("id", "product_id");
