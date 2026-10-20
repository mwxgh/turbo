-- CreateTable
CREATE TABLE "hellos" (
    "id" UUID NOT NULL,
    "message" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "hellos_pkey" PRIMARY KEY ("id")
);
