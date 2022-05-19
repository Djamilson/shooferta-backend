-- CreateTable
CREATE TABLE "products_info" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "price_promotion" DECIMAL(10,2) NOT NULL,
    "freight" DECIMAL(10,2) NOT NULL,
    "link" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "company" TEXT NOT NULL,
    "currency" TEXT NOT NULL,

    CONSTRAINT "products_info_pkey" PRIMARY KEY ("id")
);
