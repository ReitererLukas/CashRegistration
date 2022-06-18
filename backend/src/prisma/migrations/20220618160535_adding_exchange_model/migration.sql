-- CreateTable
CREATE TABLE "Exchange" (
    "exchangeId" SERIAL NOT NULL,
    "amountFrom" DOUBLE PRECISION NOT NULL,
    "currencyNameFrom" VARCHAR(255) NOT NULL,
    "amountTo" DOUBLE PRECISION NOT NULL,
    "currencyNameTo" VARCHAR(255) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Exchange_pkey" PRIMARY KEY ("exchangeId")
);

-- AddForeignKey
ALTER TABLE "Exchange" ADD CONSTRAINT "Exchange_currencyNameFrom_fkey" FOREIGN KEY ("currencyNameFrom") REFERENCES "Currency"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exchange" ADD CONSTRAINT "Exchange_currencyNameTo_fkey" FOREIGN KEY ("currencyNameTo") REFERENCES "Currency"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exchange" ADD CONSTRAINT "Exchange_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;
