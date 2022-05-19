-- CreateTable
CREATE TABLE "prices" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "price_promotion" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "prices_pkey" PRIMARY KEY ("id")
);
