/*
  Warnings:

  - You are about to drop the `Word` table. If the table is not empty, all the data it contains will be lost.

*/
-- Renaming table Word to Dictionary

ALTER TABLE IF EXISTS "Word" RENAME TO "Dictionary";
