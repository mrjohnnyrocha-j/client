-- CreateTable
CREATE TABLE "Cliente" (
    "idCliente" TEXT NOT NULL,
    "nomeCliente" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nif" TEXT NOT NULL,
    "telemovel" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "prioridade" TEXT NOT NULL,
    "referenciaCliente" TEXT NOT NULL,
    "historicoEncomendas" TEXT NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("idCliente")
);

-- CreateTable
CREATE TABLE "Encomenda" (
    "chaveEncomenda" TEXT NOT NULL,
    "dataPedido" TIMESTAMP(3) NOT NULL,
    "idCliente" TEXT NOT NULL,
    "estadoEntrega" TEXT NOT NULL,
    "produtoComercial" TEXT NOT NULL,
    "referenciaProduto" TEXT NOT NULL,
    "quantidadeRealmenteProduzida" INTEGER NOT NULL,
    "quantidadeEncomendada" INTEGER NOT NULL,
    "quantidadeASerFaturada" INTEGER NOT NULL,
    "quantidadeASerExecutada" INTEGER NOT NULL,
    "prazosEntrega" TEXT NOT NULL,
    "detalhesReplaneamentoEncomenda" TEXT NOT NULL,

    CONSTRAINT "Encomenda_pkey" PRIMARY KEY ("chaveEncomenda")
);

-- CreateTable
CREATE TABLE "Isolador" (
    "idIsolador" TEXT NOT NULL,
    "tipoPasta" TEXT NOT NULL,
    "dimensoesRolo" TEXT NOT NULL,
    "tempoPlaneadoProducao" INTEGER NOT NULL,
    "disponibilidadeMaterial" TEXT NOT NULL,
    "dimensoesIsolador" TEXT NOT NULL,
    "proporcaoMisturaPastaVirgem" TEXT NOT NULL,
    "comprimentoExtrusao" DOUBLE PRECISION NOT NULL,
    "diametroExtrusao" DOUBLE PRECISION NOT NULL,
    "curvaSecagem" TEXT NOT NULL,
    "curvaCozedura" TEXT NOT NULL,

    CONSTRAINT "Isolador_pkey" PRIMARY KEY ("idIsolador")
);

-- CreateTable
CREATE TABLE "Fornecedor" (
    "idFornecedor" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telemovel" TEXT NOT NULL,

    CONSTRAINT "Fornecedor_pkey" PRIMARY KEY ("idFornecedor")
);

-- CreateTable
CREATE TABLE "Operacao" (
    "idOperacao" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "equipamentos" TEXT NOT NULL,
    "duracao" INTEGER NOT NULL,
    "idSeccao" TEXT NOT NULL,

    CONSTRAINT "Operacao_pkey" PRIMARY KEY ("idOperacao")
);

-- CreateTable
CREATE TABLE "Equipamento" (
    "idEquipamento" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "capacidade" INTEGER NOT NULL,
    "estado" TEXT NOT NULL,
    "previsaoCapacidadeDisponivel" TEXT NOT NULL,
    "disponibilidadeMaterial" TEXT NOT NULL,
    "idFornecedor" TEXT NOT NULL,

    CONSTRAINT "Equipamento_pkey" PRIMARY KEY ("idEquipamento")
);

-- CreateTable
CREATE TABLE "CargaFabril" (
    "idCargaFabril" TEXT NOT NULL,
    "idEquipamento" TEXT NOT NULL,
    "idOperacao" TEXT NOT NULL,
    "dataComeco" TIMESTAMP(3) NOT NULL,
    "dataFim" TIMESTAMP(3) NOT NULL,
    "previsaoCargaFabrilDisponivel" TEXT NOT NULL,

    CONSTRAINT "CargaFabril_pkey" PRIMARY KEY ("idCargaFabril")
);

-- CreateTable
CREATE TABLE "Parametro" (
    "idParametro" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "valor" TEXT NOT NULL,

    CONSTRAINT "Parametro_pkey" PRIMARY KEY ("idParametro")
);

-- CreateTable
CREATE TABLE "Seccao" (
    "idSeccao" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Seccao_pkey" PRIMARY KEY ("idSeccao")
);

-- CreateTable
CREATE TABLE "RegistoPercurso" (
    "idRegistoPercurso" TEXT NOT NULL,
    "idSeccao" TEXT NOT NULL,
    "idOperacao" TEXT NOT NULL,
    "idEquipamento" TEXT NOT NULL,
    "dataComeco" TIMESTAMP(3) NOT NULL,
    "dataFim" TIMESTAMP(3) NOT NULL,
    "estado" TEXT NOT NULL,

    CONSTRAINT "RegistoPercurso_pkey" PRIMARY KEY ("idRegistoPercurso")
);

-- CreateTable
CREATE TABLE "DetalhesRegistoPercurso" (
    "idDetalhesRegistoPercurso" TEXT NOT NULL,
    "idRegistoPercurso" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "dadosDetalhe" TEXT NOT NULL,

    CONSTRAINT "DetalhesRegistoPercurso_pkey" PRIMARY KEY ("idDetalhesRegistoPercurso")
);

-- CreateTable
CREATE TABLE "Evento" (
    "idEvento" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "tempoComeco" TIMESTAMP(3) NOT NULL,
    "tempoFim" TIMESTAMP(3) NOT NULL,
    "equipamento" TEXT NOT NULL,
    "centroTrabalho" TEXT NOT NULL,
    "chaveIsolador" TEXT NOT NULL,
    "chaveLote" TEXT NOT NULL,
    "chaveProduto" TEXT NOT NULL,
    "quantidadeLote" INTEGER NOT NULL,
    "stock31A" INTEGER NOT NULL,
    "chaveEncomenda" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "detalhes" TEXT NOT NULL,
    "ajustesPlanoProducao" TEXT NOT NULL,
    "embalamentoPlanoProducao" TEXT NOT NULL,
    "taxaAtacagem" TEXT NOT NULL,
    "criteriosOtimizacaoPlanoProducao" TEXT NOT NULL,
    "disponibilidadeEspacoExtrusao" TEXT NOT NULL,
    "disponibilidadeGavetas" TEXT NOT NULL,
    "disponiibilidadeCavaletes" TEXT NOT NULL,
    "disponibilidadeEstufas" TEXT NOT NULL,
    "disponibilidadeFornos" TEXT NOT NULL,
    "tempoSecagem" INTEGER NOT NULL,
    "tempoCozedura" INTEGER NOT NULL,
    "capacidadeMaximaFornos" INTEGER NOT NULL,
    "capacidadeMaximaEstufas" INTEGER NOT NULL,
    "capacidadeRequeridaFornos" INTEGER NOT NULL,
    "idIsolador" TEXT NOT NULL,

    CONSTRAINT "Evento_pkey" PRIMARY KEY ("idEvento")
);

-- CreateTable
CREATE TABLE "Estadio" (
    "idEstadio" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "tempoComeco" TIMESTAMP(3) NOT NULL,
    "tempoFim" TIMESTAMP(3) NOT NULL,
    "tempoTolerancia" INTEGER NOT NULL,
    "capacidade" INTEGER NOT NULL,
    "opcaoOutsourcing" BOOLEAN NOT NULL,
    "idEvento" TEXT NOT NULL,

    CONSTRAINT "Estadio_pkey" PRIMARY KEY ("idEstadio")
);

-- AddForeignKey
ALTER TABLE "Encomenda" ADD CONSTRAINT "Encomenda_idCliente_fkey" FOREIGN KEY ("idCliente") REFERENCES "Cliente"("idCliente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Operacao" ADD CONSTRAINT "Operacao_idSeccao_fkey" FOREIGN KEY ("idSeccao") REFERENCES "Seccao"("idSeccao") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipamento" ADD CONSTRAINT "Equipamento_idFornecedor_fkey" FOREIGN KEY ("idFornecedor") REFERENCES "Fornecedor"("idFornecedor") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CargaFabril" ADD CONSTRAINT "CargaFabril_idEquipamento_fkey" FOREIGN KEY ("idEquipamento") REFERENCES "Equipamento"("idEquipamento") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CargaFabril" ADD CONSTRAINT "CargaFabril_idOperacao_fkey" FOREIGN KEY ("idOperacao") REFERENCES "Operacao"("idOperacao") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegistoPercurso" ADD CONSTRAINT "RegistoPercurso_idSeccao_fkey" FOREIGN KEY ("idSeccao") REFERENCES "Seccao"("idSeccao") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegistoPercurso" ADD CONSTRAINT "RegistoPercurso_idOperacao_fkey" FOREIGN KEY ("idOperacao") REFERENCES "Operacao"("idOperacao") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegistoPercurso" ADD CONSTRAINT "RegistoPercurso_idEquipamento_fkey" FOREIGN KEY ("idEquipamento") REFERENCES "Equipamento"("idEquipamento") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalhesRegistoPercurso" ADD CONSTRAINT "DetalhesRegistoPercurso_idRegistoPercurso_fkey" FOREIGN KEY ("idRegistoPercurso") REFERENCES "RegistoPercurso"("idRegistoPercurso") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evento" ADD CONSTRAINT "Evento_idIsolador_fkey" FOREIGN KEY ("idIsolador") REFERENCES "Isolador"("idIsolador") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Estadio" ADD CONSTRAINT "Estadio_idEvento_fkey" FOREIGN KEY ("idEvento") REFERENCES "Evento"("idEvento") ON DELETE RESTRICT ON UPDATE CASCADE;
