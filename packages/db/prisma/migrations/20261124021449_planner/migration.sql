-- CreateEnum
CREATE TYPE "PlannerStatus" AS ENUM ('TODO', 'DOING', 'DONE');

-- CreateEnum
CREATE TYPE "PlannerPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateTable
CREATE TABLE "planner_tasks" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "note" VARCHAR(2000),
    "status" "PlannerStatus" NOT NULL DEFAULT 'TODO',
    "priority" "PlannerPriority" NOT NULL DEFAULT 'MEDIUM',
    "date" DATE,
    "start_minute" INTEGER,
    "duration_minutes" INTEGER NOT NULL DEFAULT 60,
    "color" VARCHAR(16) NOT NULL DEFAULT 'sky',
    "position" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "planner_tasks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "planner_tasks_user_id_date_idx" ON "planner_tasks"("user_id", "date");

-- CreateIndex
CREATE INDEX "planner_tasks_user_id_status_position_idx" ON "planner_tasks"("user_id", "status", "position");

-- AddForeignKey
ALTER TABLE "planner_tasks" ADD CONSTRAINT "planner_tasks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
