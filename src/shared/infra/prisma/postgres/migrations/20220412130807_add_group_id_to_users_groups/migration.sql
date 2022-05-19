/*
  Warnings:

  - Added the required column `group_id` to the `users_groups` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users_groups" ADD COLUMN     "group_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "users_groups" ADD CONSTRAINT "users_groups_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
