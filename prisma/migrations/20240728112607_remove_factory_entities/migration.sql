/*
  Warnings:

  - You are about to drop the `Autor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CargaFabril` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Cliente` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DetalhesRegistoPercurso` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Encomenda` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Equipamento` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Estadio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Event` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Evento` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Fornecedor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Isolador` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Operacao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Parametro` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RegistoPercurso` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Seccao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Stage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Autor" DROP CONSTRAINT "Autor_idIsolador_fkey";

-- DropForeignKey
ALTER TABLE "CargaFabril" DROP CONSTRAINT "CargaFabril_idEquipamento_fkey";

-- DropForeignKey
ALTER TABLE "CargaFabril" DROP CONSTRAINT "CargaFabril_idOperacao_fkey";

-- DropForeignKey
ALTER TABLE "DetalhesRegistoPercurso" DROP CONSTRAINT "DetalhesRegistoPercurso_idRegistoPercurso_fkey";

-- DropForeignKey
ALTER TABLE "Encomenda" DROP CONSTRAINT "Encomenda_idCliente_fkey";

-- DropForeignKey
ALTER TABLE "Equipamento" DROP CONSTRAINT "Equipamento_idFornecedor_fkey";

-- DropForeignKey
ALTER TABLE "Estadio" DROP CONSTRAINT "Estadio_idEvento_fkey";

-- DropForeignKey
ALTER TABLE "Evento" DROP CONSTRAINT "Evento_idIsolador_fkey";

-- DropForeignKey
ALTER TABLE "Operacao" DROP CONSTRAINT "Operacao_idSeccao_fkey";

-- DropForeignKey
ALTER TABLE "RegistoPercurso" DROP CONSTRAINT "RegistoPercurso_idEquipamento_fkey";

-- DropForeignKey
ALTER TABLE "RegistoPercurso" DROP CONSTRAINT "RegistoPercurso_idOperacao_fkey";

-- DropForeignKey
ALTER TABLE "RegistoPercurso" DROP CONSTRAINT "RegistoPercurso_idSeccao_fkey";

-- DropForeignKey
ALTER TABLE "Stage" DROP CONSTRAINT "Stage_eventId_fkey";

-- DropTable
DROP TABLE "Autor";

-- DropTable
DROP TABLE "CargaFabril";

-- DropTable
DROP TABLE "Cliente";

-- DropTable
DROP TABLE "DetalhesRegistoPercurso";

-- DropTable
DROP TABLE "Encomenda";

-- DropTable
DROP TABLE "Equipamento";

-- DropTable
DROP TABLE "Estadio";

-- DropTable
DROP TABLE "Event";

-- DropTable
DROP TABLE "Evento";

-- DropTable
DROP TABLE "Fornecedor";

-- DropTable
DROP TABLE "Isolador";

-- DropTable
DROP TABLE "Operacao";

-- DropTable
DROP TABLE "Parametro";

-- DropTable
DROP TABLE "RegistoPercurso";

-- DropTable
DROP TABLE "Seccao";

-- DropTable
DROP TABLE "Stage";
