/*
  Warnings:

  - The `type` column on the `clients` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ClientEntityType" AS ENUM ('INDIVIDUAL', 'COMPANY');

-- AlterTable
ALTER TABLE "clients" ADD COLUMN     "clientType" "ClientType" NOT NULL DEFAULT 'BOTH',
DROP COLUMN "type",
ADD COLUMN     "type" "ClientEntityType" NOT NULL DEFAULT 'INDIVIDUAL';

-- CreateIndex
CREATE INDEX "clients_type_idx" ON "clients"("type");

-- CreateIndex
CREATE INDEX "clients_clientType_idx" ON "clients"("clientType");
