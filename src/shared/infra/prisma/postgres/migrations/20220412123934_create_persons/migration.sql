-- CreateTable
CREATE TABLE "persons" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT,
    "rg" TEXT,
    "rgss" TEXT,
    "birth_date" TIMESTAMP(3),
    "status" BOOLEAN NOT NULL DEFAULT true,
    "privacy" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "persons_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "persons_email_key" ON "persons"("email");

-- CreateIndex
CREATE UNIQUE INDEX "persons_cpf_key" ON "persons"("cpf");
