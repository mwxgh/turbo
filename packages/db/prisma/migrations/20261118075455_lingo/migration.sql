-- CreateEnum
CREATE TYPE "LingoContentStatus" AS ENUM ('DRAFT', 'NEEDS_REVIEW', 'PUBLISHED', 'REJECTED');

-- CreateEnum
CREATE TYPE "LingoDifficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- CreateEnum
CREATE TYPE "LingoBatchSource" AS ENUM ('MANUAL', 'IMPORT', 'AI');

-- CreateEnum
CREATE TYPE "LingoAttemptMode" AS ENUM ('QUICK', 'PRACTICE', 'FULL_TEST');

-- CreateTable
CREATE TABLE "lingo_batches" (
    "id" UUID NOT NULL,
    "source" "LingoBatchSource" NOT NULL,
    "exam" VARCHAR(32) NOT NULL,
    "part" VARCHAR(16),
    "file_name" VARCHAR(255),
    "succeeded" INTEGER NOT NULL DEFAULT 0,
    "failed" INTEGER NOT NULL DEFAULT 0,
    "errors" JSONB,
    "created_by_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lingo_batches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lingo_items" (
    "id" UUID NOT NULL,
    "exam" VARCHAR(32) NOT NULL,
    "section" VARCHAR(16) NOT NULL,
    "part" VARCHAR(16) NOT NULL,
    "difficulty" "LingoDifficulty" NOT NULL,
    "topic" VARCHAR(100),
    "content" JSONB NOT NULL DEFAULT '{}',
    "audio_key" VARCHAR(255),
    "image_key" VARCHAR(255),
    "status" "LingoContentStatus" NOT NULL DEFAULT 'DRAFT',
    "batch_id" UUID,
    "content_hash" CHAR(64) NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "lingo_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lingo_questions" (
    "id" UUID NOT NULL,
    "item_id" UUID NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "type" VARCHAR(32) NOT NULL,
    "prompt" JSONB NOT NULL,
    "answer" JSONB NOT NULL,
    "explanation_vi" TEXT NOT NULL DEFAULT '',
    "translation_vi" TEXT,
    "skill_tags" TEXT[],

    CONSTRAINT "lingo_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lingo_attempts" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "exam" VARCHAR(32) NOT NULL,
    "mode" "LingoAttemptMode" NOT NULL,
    "parts" TEXT[],
    "time_limit_sec" INTEGER,
    "total" INTEGER NOT NULL,
    "correct" INTEGER,
    "scores" JSONB,
    "started_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "submitted_at" TIMESTAMPTZ(3),

    CONSTRAINT "lingo_attempts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lingo_answers" (
    "id" UUID NOT NULL,
    "attempt_id" UUID NOT NULL,
    "question_id" UUID NOT NULL,
    "order" INTEGER NOT NULL,
    "response" JSONB,
    "correct" BOOLEAN,
    "time_ms" INTEGER,
    "flagged" BOOLEAN NOT NULL DEFAULT false,
    "answered_at" TIMESTAMPTZ(3),

    CONSTRAINT "lingo_answers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lingo_goals" (
    "user_id" UUID NOT NULL,
    "exam" VARCHAR(32) NOT NULL,
    "target_score" INTEGER,
    "exam_date" DATE,
    "new_cards_per_day" INTEGER NOT NULL DEFAULT 20,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "lingo_goals_pkey" PRIMARY KEY ("user_id","exam")
);

-- CreateTable
CREATE TABLE "lingo_decks" (
    "id" UUID NOT NULL,
    "exam" VARCHAR(32),
    "owner_id" UUID,
    "title" VARCHAR(100) NOT NULL,
    "description" VARCHAR(500),
    "language" VARCHAR(8) NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "lingo_decks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lingo_cards" (
    "id" UUID NOT NULL,
    "deck_id" UUID NOT NULL,
    "term" VARCHAR(100) NOT NULL,
    "pos" VARCHAR(20),
    "reading" VARCHAR(100),
    "meaning_vi" VARCHAR(500) NOT NULL,
    "example" VARCHAR(500),
    "example_vi" VARCHAR(500),
    "topic" VARCHAR(50),
    "audio_key" VARCHAR(255),
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lingo_cards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lingo_card_states" (
    "user_id" UUID NOT NULL,
    "card_id" UUID NOT NULL,
    "due" TIMESTAMPTZ(3) NOT NULL,
    "stability" DOUBLE PRECISION NOT NULL,
    "difficulty" DOUBLE PRECISION NOT NULL,
    "elapsed_days" INTEGER NOT NULL,
    "scheduled_days" INTEGER NOT NULL,
    "learning_steps" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "lapses" INTEGER NOT NULL,
    "state" INTEGER NOT NULL,
    "last_review" TIMESTAMPTZ(3),
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lingo_card_states_pkey" PRIMARY KEY ("user_id","card_id")
);

-- CreateIndex
CREATE INDEX "lingo_batches_created_at_id_idx" ON "lingo_batches"("created_at", "id");

-- CreateIndex
CREATE INDEX "lingo_items_exam_part_status_idx" ON "lingo_items"("exam", "part", "status");

-- CreateIndex
CREATE INDEX "lingo_items_created_at_id_idx" ON "lingo_items"("created_at", "id");

-- CreateIndex
CREATE UNIQUE INDEX "lingo_items_exam_content_hash_key" ON "lingo_items"("exam", "content_hash");

-- CreateIndex
CREATE INDEX "lingo_questions_item_id_order_idx" ON "lingo_questions"("item_id", "order");

-- CreateIndex
CREATE INDEX "lingo_attempts_user_id_started_at_idx" ON "lingo_attempts"("user_id", "started_at");

-- CreateIndex
CREATE INDEX "lingo_answers_question_id_idx" ON "lingo_answers"("question_id");

-- CreateIndex
CREATE UNIQUE INDEX "lingo_answers_attempt_id_question_id_key" ON "lingo_answers"("attempt_id", "question_id");

-- CreateIndex
CREATE INDEX "lingo_decks_exam_idx" ON "lingo_decks"("exam");

-- CreateIndex
CREATE INDEX "lingo_decks_owner_id_idx" ON "lingo_decks"("owner_id");

-- CreateIndex
CREATE UNIQUE INDEX "lingo_cards_deck_id_term_key" ON "lingo_cards"("deck_id", "term");

-- CreateIndex
CREATE INDEX "lingo_card_states_user_id_due_idx" ON "lingo_card_states"("user_id", "due");

-- AddForeignKey
ALTER TABLE "lingo_batches" ADD CONSTRAINT "lingo_batches_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lingo_items" ADD CONSTRAINT "lingo_items_batch_id_fkey" FOREIGN KEY ("batch_id") REFERENCES "lingo_batches"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lingo_questions" ADD CONSTRAINT "lingo_questions_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "lingo_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lingo_attempts" ADD CONSTRAINT "lingo_attempts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lingo_answers" ADD CONSTRAINT "lingo_answers_attempt_id_fkey" FOREIGN KEY ("attempt_id") REFERENCES "lingo_attempts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lingo_answers" ADD CONSTRAINT "lingo_answers_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "lingo_questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lingo_goals" ADD CONSTRAINT "lingo_goals_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lingo_decks" ADD CONSTRAINT "lingo_decks_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lingo_cards" ADD CONSTRAINT "lingo_cards_deck_id_fkey" FOREIGN KEY ("deck_id") REFERENCES "lingo_decks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lingo_card_states" ADD CONSTRAINT "lingo_card_states_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lingo_card_states" ADD CONSTRAINT "lingo_card_states_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "lingo_cards"("id") ON DELETE CASCADE ON UPDATE CASCADE;
