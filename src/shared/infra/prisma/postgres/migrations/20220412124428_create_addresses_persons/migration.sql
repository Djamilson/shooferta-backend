-- CreateTable
CREATE TABLE "addresses_persons" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "number" INTEGER NOT NULL,
    "street" TEXT NOT NULL,
    "complement" TEXT,
    "zip_code" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,

    CONSTRAINT "addresses_persons_pkey" PRIMARY KEY ("id")
);
