/*
  Warnings:

  - Added the required column `user_id` to the `products_info` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products_info" ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "products_info" ADD CONSTRAINT "products_info_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
