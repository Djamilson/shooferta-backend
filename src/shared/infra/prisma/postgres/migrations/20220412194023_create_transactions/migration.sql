-- CreateTable
CREATE TABLE "transactions" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "transaction_id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "authorization_code" TEXT NOT NULL,
    "authorized_amount" DECIMAL(10,2) NOT NULL,
    "tid" TEXT NOT NULL,
    "installments" TEXT NOT NULL,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);
