-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "sku" TEXT,
    "bar_code" TEXT,
    "other" JSON,
    "canceled_at" TIMESTAMP(3),
    "status" "StatusOrderEnum" NOT NULL,
    "status_freight" BOOLEAN NOT NULL DEFAULT true,
    "status_product" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);
