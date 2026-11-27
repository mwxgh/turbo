-- CreateEnum
CREATE TYPE "StudioLevel" AS ENUM ('BASIC', 'INTERMEDIATE', 'ADVANCED');

-- AlterTable
ALTER TABLE "studio_lessons" ADD COLUMN     "level" "StudioLevel" NOT NULL DEFAULT 'BASIC';
