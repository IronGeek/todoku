-- CreateTable
CREATE TABLE "public"."Todo" (
    "id" VARCHAR(36) NOT NULL,
    "title" VARCHAR(64) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "due" TIMESTAMPTZ(3) NOT NULL,
    "list" VARCHAR(25) NOT NULL,
    "tags" VARCHAR(255) NOT NULL,
    "stared" BOOLEAN NOT NULL,
    "done" BOOLEAN NOT NULL,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);
