-- CreateTable
CREATE TABLE "Veiculos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "placa" TEXT NOT NULL,
    "marca" TEXT,
    "modelo" TEXT,
    "ano" INTEGER
);

-- CreateIndex
CREATE UNIQUE INDEX "Veiculos_placa_key" ON "Veiculos"("placa");
