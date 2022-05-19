/*
  Warnings:

  - Added the required column `person_id` to the `addresses_persons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "addresses_persons" ADD COLUMN     "person_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "addresses_persons" ADD CONSTRAINT "addresses_persons_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "persons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
