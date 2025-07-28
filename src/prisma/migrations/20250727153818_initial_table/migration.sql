-- CreateTable
CREATE TABLE "user" (
    "id" VARCHAR(36) NOT NULL,
    "name" VARCHAR(64) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(60) NOT NULL,
    "verified_at" TIMESTAMPTZ(3),
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3),
    "deleted_at" TIMESTAMPTZ(3),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "otp" (
    "id" VARCHAR(36) NOT NULL,
    "user_id" VARCHAR(36) NOT NULL,
    "code" VARCHAR(60) NOT NULL,
    "note" VARCHAR(255),
    "expired_at" TIMESTAMPTZ(3),
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "otp_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "otp_user_id_key" ON "otp"("user_id");

-- AddForeignKey
ALTER TABLE "otp" ADD CONSTRAINT "otp_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
