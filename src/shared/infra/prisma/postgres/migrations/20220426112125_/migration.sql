-- DropIndex
DROP INDEX "stocks_id_product_id_idx";

-- CreateIndex
CREATE INDEX "banners_id_type_idx" ON "banners"("id", "type");

-- CreateIndex
CREATE INDEX "descriptions_id_idx" ON "descriptions"("id");

-- CreateIndex
CREATE INDEX "prices_id_product_id_idx" ON "prices"("id", "product_id");

-- CreateIndex
CREATE INDEX "products_info_id_idx" ON "products_info"("id");

-- CreateIndex
CREATE INDEX "stocks_id_product_id_status_idx" ON "stocks"("id", "product_id", "status");
