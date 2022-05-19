/*
  Warnings:

  - Added the required column `user_id` to the `prices` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "prices" ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "prices" ADD CONSTRAINT "prices_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
