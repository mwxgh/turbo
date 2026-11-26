-- CreateEnum
CREATE TYPE "StudioCategory" AS ENUM ('LANGUAGE', 'FRAMEWORK', 'PATTERN', 'FUNDAMENTAL', 'TOOL');

-- CreateEnum
CREATE TYPE "StudioStatus" AS ENUM ('DRAFT', 'PUBLISHED');

-- CreateTable
CREATE TABLE "studio_tracks" (
    "id" UUID NOT NULL,
    "slug" VARCHAR(80) NOT NULL,
    "category" "StudioCategory" NOT NULL,
    "title" VARCHAR(120) NOT NULL,
    "summary" VARCHAR(500) NOT NULL DEFAULT '',
    "order" INTEGER NOT NULL DEFAULT 0,
    "status" "StudioStatus" NOT NULL DEFAULT 'DRAFT',
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "studio_tracks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "studio_lessons" (
    "id" UUID NOT NULL,
    "track_id" UUID NOT NULL,
    "slug" VARCHAR(80) NOT NULL,
    "title" VARCHAR(160) NOT NULL,
    "summary" VARCHAR(500) NOT NULL DEFAULT '',
    "content" TEXT NOT NULL DEFAULT '',
    "minutes" INTEGER NOT NULL DEFAULT 10,
    "order" INTEGER NOT NULL DEFAULT 0,
    "status" "StudioStatus" NOT NULL DEFAULT 'DRAFT',
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "studio_lessons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "studio_quiz_questions" (
    "id" UUID NOT NULL,
    "lesson_id" UUID NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "prompt" VARCHAR(1000) NOT NULL,
    "choices" TEXT[],
    "answer" INTEGER NOT NULL,
    "explanation" VARCHAR(2000) NOT NULL DEFAULT '',

    CONSTRAINT "studio_quiz_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "studio_roadmaps" (
    "id" UUID NOT NULL,
    "slug" VARCHAR(80) NOT NULL,
    "title" VARCHAR(120) NOT NULL,
    "summary" VARCHAR(500) NOT NULL DEFAULT '',
    "order" INTEGER NOT NULL DEFAULT 0,
    "status" "StudioStatus" NOT NULL DEFAULT 'DRAFT',
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "studio_roadmaps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "studio_roadmap_steps" (
    "id" UUID NOT NULL,
    "roadmap_id" UUID NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "title" VARCHAR(160) NOT NULL,
    "description" VARCHAR(1000) NOT NULL DEFAULT '',
    "track_id" UUID,

    CONSTRAINT "studio_roadmap_steps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "studio_progress" (
    "user_id" UUID NOT NULL,
    "lesson_id" UUID NOT NULL,
    "completed_at" TIMESTAMPTZ(3),
    "quiz_score" INTEGER,
    "quiz_total" INTEGER,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "studio_progress_pkey" PRIMARY KEY ("user_id","lesson_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "studio_tracks_slug_key" ON "studio_tracks"("slug");

-- CreateIndex
CREATE INDEX "studio_tracks_category_status_order_idx" ON "studio_tracks"("category", "status", "order");

-- CreateIndex
CREATE INDEX "studio_lessons_track_id_order_idx" ON "studio_lessons"("track_id", "order");

-- CreateIndex
CREATE UNIQUE INDEX "studio_lessons_track_id_slug_key" ON "studio_lessons"("track_id", "slug");

-- CreateIndex
CREATE INDEX "studio_quiz_questions_lesson_id_order_idx" ON "studio_quiz_questions"("lesson_id", "order");

-- CreateIndex
CREATE UNIQUE INDEX "studio_roadmaps_slug_key" ON "studio_roadmaps"("slug");

-- CreateIndex
CREATE INDEX "studio_roadmaps_status_order_idx" ON "studio_roadmaps"("status", "order");

-- CreateIndex
CREATE INDEX "studio_roadmap_steps_roadmap_id_order_idx" ON "studio_roadmap_steps"("roadmap_id", "order");

-- CreateIndex
CREATE INDEX "studio_progress_user_id_updated_at_idx" ON "studio_progress"("user_id", "updated_at");

-- AddForeignKey
ALTER TABLE "studio_lessons" ADD CONSTRAINT "studio_lessons_track_id_fkey" FOREIGN KEY ("track_id") REFERENCES "studio_tracks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studio_quiz_questions" ADD CONSTRAINT "studio_quiz_questions_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "studio_lessons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studio_roadmap_steps" ADD CONSTRAINT "studio_roadmap_steps_roadmap_id_fkey" FOREIGN KEY ("roadmap_id") REFERENCES "studio_roadmaps"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studio_roadmap_steps" ADD CONSTRAINT "studio_roadmap_steps_track_id_fkey" FOREIGN KEY ("track_id") REFERENCES "studio_tracks"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studio_progress" ADD CONSTRAINT "studio_progress_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studio_progress" ADD CONSTRAINT "studio_progress_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "studio_lessons"("id") ON DELETE CASCADE ON UPDATE CASCADE;
