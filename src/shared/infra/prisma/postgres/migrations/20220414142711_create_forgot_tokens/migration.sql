-- CreateTable
CREATE TABLE "forgot_tokens" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "token" VARCHAR NOT NULL,
    "code" VARCHAR NOT NULL,
    "expires_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "forgot_tokens_pkey" PRIMARY KEY ("id")
);
