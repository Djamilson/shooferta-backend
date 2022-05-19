-- CreateTable
CREATE TABLE "reviews" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "comment" TEXT NOT NULL,
    "status" "ReviewsStatusEnum" NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);
