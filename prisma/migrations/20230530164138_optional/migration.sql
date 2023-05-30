-- DropForeignKey
ALTER TABLE "menus_menu_categories_locations" DROP CONSTRAINT "menus_menu_categories_locations_menus_id_fkey";

-- AlterTable
ALTER TABLE "menus_menu_categories_locations" ALTER COLUMN "menus_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "menus_menu_categories_locations" ADD CONSTRAINT "menus_menu_categories_locations_menus_id_fkey" FOREIGN KEY ("menus_id") REFERENCES "menus"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
