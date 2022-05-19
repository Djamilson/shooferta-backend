-- CreateEnum
CREATE TYPE "StatusOrderEnum" AS ENUM ('awaiting', 'processing', 'processed', 'canceled');

-- DropEnum
DROP TYPE "StatusEnum";

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "total" DECIMAL(10,2) NOT NULL,
    "freight" DECIMAL(10,2) NOT NULL,
    "canceled_at" TIMESTAMP(3),
    "status" "StatusOrderEnum" NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);
