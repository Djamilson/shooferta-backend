/*
  Warnings:

  - A unique constraint covering the columns `[address_id]` on the table `persons` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "persons" ADD COLUMN     "address_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "persons_address_id_key" ON "persons"("address_id");
