-- CreateTable
CREATE TABLE "Entry" (
    "entryId" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdate" TIMESTAMP(3) NOT NULL,
    "user" VARCHAR(255) NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currencyName" VARCHAR(255) NOT NULL,

    CONSTRAINT "Entry_pkey" PRIMARY KEY ("entryId")
);

-- CreateTable
CREATE TABLE "Currency" (
    "name" VARCHAR(255) NOT NULL,
    "symbol" VARCHAR(255) NOT NULL,

    CONSTRAINT "Currency_pkey" PRIMARY KEY ("name")
);

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_currencyName_fkey" FOREIGN KEY ("currencyName") REFERENCES "Currency"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
