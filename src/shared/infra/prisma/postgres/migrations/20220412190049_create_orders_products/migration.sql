-- CreateTable
CREATE TABLE "orders_products" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "subtotal" DECIMAL(10,2) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "status" "StatusOrderEnum" NOT NULL,

    CONSTRAINT "orders_products_pkey" PRIMARY KEY ("id")
);
