-- CreateTable
CREATE TABLE "EntryMember" (
    "entryId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "EntryMember_pkey" PRIMARY KEY ("entryId","userId")
);

-- AddForeignKey
ALTER TABLE "EntryMember" ADD CONSTRAINT "EntryMember_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "Entry"("entryId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EntryMember" ADD CONSTRAINT "EntryMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;
