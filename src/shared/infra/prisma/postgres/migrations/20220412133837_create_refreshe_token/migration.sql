-- CreateTable
CREATE TABLE "refreshes_tokens" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "refresh_token" TEXT NOT NULL,
    "device" TEXT NOT NULL,
    "expires_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "refreshes_tokens_pkey" PRIMARY KEY ("id")
);
