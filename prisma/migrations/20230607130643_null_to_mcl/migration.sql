-- DropForeignKey
ALTER TABLE "menus_menu_categories_locations" DROP CONSTRAINT "menus_menu_categories_locations_locations_id_fkey";

-- AlterTable
ALTER TABLE "menus_menu_categories_locations" ALTER COLUMN "locations_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "menus_menu_categories_locations" ADD CONSTRAINT "menus_menu_categories_locations_locations_id_fkey" FOREIGN KEY ("locations_id") REFERENCES "locations"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
