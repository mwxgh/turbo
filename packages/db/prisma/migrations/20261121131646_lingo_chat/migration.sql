-- CreateEnum
CREATE TYPE "LingoChatRole" AS ENUM ('USER', 'ASSISTANT');

-- CreateTable
CREATE TABLE "lingo_chats" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "lingo_chats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lingo_chat_messages" (
    "id" UUID NOT NULL,
    "chat_id" UUID NOT NULL,
    "role" "LingoChatRole" NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lingo_chat_messages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "lingo_chats_user_id_updated_at_idx" ON "lingo_chats"("user_id", "updated_at");

-- CreateIndex
CREATE INDEX "lingo_chat_messages_chat_id_created_at_idx" ON "lingo_chat_messages"("chat_id", "created_at");

-- AddForeignKey
ALTER TABLE "lingo_chats" ADD CONSTRAINT "lingo_chats_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lingo_chat_messages" ADD CONSTRAINT "lingo_chat_messages_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "lingo_chats"("id") ON DELETE CASCADE ON UPDATE CASCADE;
