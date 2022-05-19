/*
  Warnings:

  - A unique constraint covering the columns `[phone_id]` on the table `persons` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "persons" ADD COLUMN     "phone_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "persons_phone_id_key" ON "persons"("phone_id");
