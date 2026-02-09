-- CreateTable
CREATE TABLE "specilaties" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "icon" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "idDeleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAtd" TIMESTAMP(3),

    CONSTRAINT "specilaties_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_specialty_isDeleted" ON "specilaties"("idDeleted");

-- CreateIndex
CREATE INDEX "idx_specialty_title" ON "specilaties"("title");
