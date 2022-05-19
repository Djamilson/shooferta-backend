/*
  Warnings:

  - Added the required column `person_id` to the `phones_persons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "phones_persons" ADD COLUMN     "person_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "phones_persons" ADD CONSTRAINT "phones_persons_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "persons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
