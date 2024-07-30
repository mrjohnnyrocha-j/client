-- CreateTable
CREATE TABLE "Autor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "details" TEXT,
    "idIsolador" TEXT NOT NULL,

    CONSTRAINT "Autor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idIsolador" ON "Autor"("idIsolador");

-- AddForeignKey
ALTER TABLE "Autor" ADD CONSTRAINT "Autor_idIsolador_fkey" FOREIGN KEY ("idIsolador") REFERENCES "Isolador"("idIsolador") ON DELETE RESTRICT ON UPDATE CASCADE;
