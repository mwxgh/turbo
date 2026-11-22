-- CreateEnum
CREATE TYPE "LingoBatchStatus" AS ENUM ('RUNNING', 'DONE', 'FAILED');

-- CreateEnum
CREATE TYPE "LingoTestKind" AS ENUM ('FULL', 'MINI');

-- AlterTable
ALTER TABLE "lingo_attempts" ADD COLUMN     "test_id" UUID;

-- AlterTable
ALTER TABLE "lingo_batches" ADD COLUMN     "message" VARCHAR(1000),
ADD COLUMN     "request" JSONB,
ADD COLUMN     "status" "LingoBatchStatus" NOT NULL DEFAULT 'DONE';

-- CreateTable
CREATE TABLE "lingo_tests" (
    "id" UUID NOT NULL,
    "exam" VARCHAR(32) NOT NULL,
    "title" VARCHAR(150) NOT NULL,
    "kind" "LingoTestKind" NOT NULL,
    "description" VARCHAR(1000),
    "status" "LingoContentStatus" NOT NULL DEFAULT 'DRAFT',
    "created_by_id" UUID,
    "batch_id" UUID,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "lingo_tests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lingo_test_items" (
    "test_id" UUID NOT NULL,
    "item_id" UUID NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "lingo_test_items_pkey" PRIMARY KEY ("test_id","item_id")
);

-- CreateIndex
CREATE INDEX "lingo_tests_exam_status_created_at_idx" ON "lingo_tests"("exam", "status", "created_at");

-- CreateIndex
CREATE INDEX "lingo_tests_created_at_id_idx" ON "lingo_tests"("created_at", "id");

-- CreateIndex
CREATE INDEX "lingo_test_items_item_id_idx" ON "lingo_test_items"("item_id");

-- CreateIndex
CREATE INDEX "lingo_attempts_test_id_idx" ON "lingo_attempts"("test_id");

-- AddForeignKey
ALTER TABLE "lingo_attempts" ADD CONSTRAINT "lingo_attempts_test_id_fkey" FOREIGN KEY ("test_id") REFERENCES "lingo_tests"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lingo_tests" ADD CONSTRAINT "lingo_tests_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lingo_tests" ADD CONSTRAINT "lingo_tests_batch_id_fkey" FOREIGN KEY ("batch_id") REFERENCES "lingo_batches"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lingo_test_items" ADD CONSTRAINT "lingo_test_items_test_id_fkey" FOREIGN KEY ("test_id") REFERENCES "lingo_tests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lingo_test_items" ADD CONSTRAINT "lingo_test_items_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "lingo_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;
