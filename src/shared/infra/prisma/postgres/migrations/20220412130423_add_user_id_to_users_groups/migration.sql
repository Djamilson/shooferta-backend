/*
  Warnings:

  - Added the required column `user_id` to the `users_groups` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users_groups" ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "users_groups" ADD CONSTRAINT "users_groups_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
