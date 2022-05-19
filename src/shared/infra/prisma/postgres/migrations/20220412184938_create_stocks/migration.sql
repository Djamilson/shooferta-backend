-- CreateTable
CREATE TABLE "stocks" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "stock" INTEGER NOT NULL,
    "status" "StocksStatusEnum" NOT NULL,
    "action" "StockActionEnum" NOT NULL,

    CONSTRAINT "stocks_pkey" PRIMARY KEY ("id")
);
