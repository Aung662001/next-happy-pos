-- DropForeignKey
ALTER TABLE "orderLine" DROP CONSTRAINT "orderLine_addons_id_fkey";

-- AlterTable
ALTER TABLE "orderLine" ALTER COLUMN "addons_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "orderLine" ADD CONSTRAINT "orderLine_addons_id_fkey" FOREIGN KEY ("addons_id") REFERENCES "addons"("id") ON DELETE SET NULL ON UPDATE CASCADE;
