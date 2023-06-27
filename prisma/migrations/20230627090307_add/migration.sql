/*
  Warnings:

  - You are about to drop the `discount` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'PREPARING', 'COMPLETE');

-- DropTable
DROP TABLE "discount";

-- CreateTable
CREATE TABLE "orders" (
    "id" SERIAL NOT NULL,
    "location_id" INTEGER NOT NULL,
    "table_id" INTEGER NOT NULL,
    "order_status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
    "is_paid" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orderLine" (
    "id" SERIAL NOT NULL,
    "orders_id" INTEGER NOT NULL,
    "menus_id" INTEGER NOT NULL,
    "addons_id" INTEGER NOT NULL,

    CONSTRAINT "orderLine_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_table_id_fkey" FOREIGN KEY ("table_id") REFERENCES "tables"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderLine" ADD CONSTRAINT "orderLine_orders_id_fkey" FOREIGN KEY ("orders_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderLine" ADD CONSTRAINT "orderLine_menus_id_fkey" FOREIGN KEY ("menus_id") REFERENCES "menus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderLine" ADD CONSTRAINT "orderLine_addons_id_fkey" FOREIGN KEY ("addons_id") REFERENCES "addons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
