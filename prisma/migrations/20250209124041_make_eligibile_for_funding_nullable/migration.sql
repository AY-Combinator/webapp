-- AlterTable
ALTER TABLE "projects" ALTER COLUMN "eligibleForFunding" DROP NOT NULL,
ALTER COLUMN "eligibleForFunding" DROP DEFAULT;
