/*
  Warnings:

  - You are about to drop the column `list_id` on the `task` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."task" DROP CONSTRAINT "task_list_id_fkey";

-- AlterTable
ALTER TABLE "public"."task" DROP COLUMN "list_id";
