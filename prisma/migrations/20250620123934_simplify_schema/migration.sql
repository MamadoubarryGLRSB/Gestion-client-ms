/*
  Warnings:

  - You are about to drop the column `date_of_birth` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `is_verified` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `loyalty_points` on the `clients` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "clients" DROP COLUMN "date_of_birth",
DROP COLUMN "is_verified",
DROP COLUMN "loyalty_points";
