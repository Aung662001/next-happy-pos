/*
  Warnings:

  - You are about to drop the `menus_locations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `menus_menu_categories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "menus_locations" DROP CONSTRAINT "menus_locations_locations_id_fkey";

-- DropForeignKey
ALTER TABLE "menus_locations" DROP CONSTRAINT "menus_locations_menus_id_fkey";

-- DropForeignKey
ALTER TABLE "menus_menu_categories" DROP CONSTRAINT "menus_menu_categories_menu_categories_id_fkey";

-- DropForeignKey
ALTER TABLE "menus_menu_categories" DROP CONSTRAINT "menus_menu_categories_menus_id_fkey";

-- DropTable
DROP TABLE "menus_locations";

-- DropTable
DROP TABLE "menus_menu_categories";

-- CreateTable
CREATE TABLE "menus_menu_categories_locations" (
    "id" SERIAL NOT NULL,
    "menus_id" INTEGER NOT NULL,
    "locations_id" INTEGER NOT NULL,
    "menu_categories_id" INTEGER NOT NULL,
    "is_avaiable" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "menus_menu_categories_locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tables" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "location_id" INTEGER NOT NULL,

    CONSTRAINT "tables_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discount" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "discount_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "menus_menu_categories_locations" ADD CONSTRAINT "menus_menu_categories_locations_locations_id_fkey" FOREIGN KEY ("locations_id") REFERENCES "locations"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "menus_menu_categories_locations" ADD CONSTRAINT "menus_menu_categories_locations_menus_id_fkey" FOREIGN KEY ("menus_id") REFERENCES "menus"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "menus_menu_categories_locations" ADD CONSTRAINT "menus_menu_categories_locations_menu_categories_id_fkey" FOREIGN KEY ("menu_categories_id") REFERENCES "menu_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tables" ADD CONSTRAINT "tables_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
