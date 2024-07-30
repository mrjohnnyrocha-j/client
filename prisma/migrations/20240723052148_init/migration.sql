-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "companyName" TEXT,
    "profilePic" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Video" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "videoUrl" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Call" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "contactId" TEXT NOT NULL,
    "callType" TEXT NOT NULL,
    "callTime" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Call_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chat" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "contactId" TEXT NOT NULL,
    "chatId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PublicCall" (
    "id" TEXT NOT NULL,
    "callId" TEXT NOT NULL,
    "hostUserId" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PublicCall_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "userProfilePic" TEXT,
    "content" TEXT NOT NULL,
    "postType" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reply" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reply_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Like" (
    "id" TEXT NOT NULL,
    "postId" TEXT,
    "userId" TEXT NOT NULL,
    "videoId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "View" (
    "id" TEXT NOT NULL,
    "postId" TEXT,
    "userId" TEXT NOT NULL,
    "videoId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "View_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Share" (
    "id" TEXT NOT NULL,
    "postId" TEXT,
    "userId" TEXT NOT NULL,
    "videoId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Share_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bio" TEXT,
    "avatar" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Story" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "image" TEXT,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Story_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "size" TEXT,
    "color" TEXT,
    "rating" DOUBLE PRECISION,
    "price" DOUBLE PRECISION NOT NULL,
    "estimated_delivery_date" TIMESTAMP(3),
    "destination_delivery_date" TIMESTAMP(3),
    "stock" INTEGER NOT NULL,
    "image_url" TEXT,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sale" (
    "id" SERIAL NOT NULL,
    "item_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "sale_date" TIMESTAMP(3) NOT NULL,
    "total_amount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Offer" (
    "id" SERIAL NOT NULL,
    "item_id" INTEGER NOT NULL,
    "discount_percentage" DOUBLE PRECISION NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Offer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "item_id" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "order_date" TIMESTAMP(3) NOT NULL,
    "total_amount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BrowsingHistory" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "itemId" INTEGER NOT NULL,
    "viewedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BrowsingHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cart" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "itemId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "element" TEXT NOT NULL,
    "workCenter" TEXT NOT NULL,
    "isoKey" TEXT NOT NULL,
    "batchKey" TEXT NOT NULL,
    "productKey" TEXT NOT NULL,
    "stockIn31A" INTEGER NOT NULL,
    "orderAmount" INTEGER NOT NULL,
    "orderNumber" TEXT NOT NULL,
    "orderStatus" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "clientOrderNumber" TEXT NOT NULL,
    "clientReference" TEXT NOT NULL,
    "productCommercial" TEXT NOT NULL,
    "productReference" TEXT NOT NULL,
    "actualQuantityProduced" INTEGER NOT NULL,
    "quantityOrdered" INTEGER NOT NULL,
    "toBeInvoiced" INTEGER NOT NULL,
    "toBeExecuted" INTEGER NOT NULL,
    "deliveryStatus" TEXT NOT NULL,
    "manufacturingLeadTime" TEXT NOT NULL,
    "availableCapacityForecast" TEXT NOT NULL,
    "materialAvailability" TEXT NOT NULL,
    "deliveryDeadlines" TEXT NOT NULL,
    "orderReplanningDetails" TEXT NOT NULL,
    "purchasePlanFittings" TEXT NOT NULL,
    "purchasePlanPackaging" TEXT NOT NULL,
    "pasteType" TEXT NOT NULL,
    "mixRatio" TEXT NOT NULL,
    "scrapRates" TEXT NOT NULL,
    "productionPlanOptimization" TEXT NOT NULL,
    "constraints" TEXT NOT NULL,
    "extrusionLength" DOUBLE PRECISION NOT NULL,
    "extrusionDiameter" DOUBLE PRECISION NOT NULL,
    "extrusionSpaceRequired" INTEGER NOT NULL,
    "extrusionShelvesRequired" INTEGER NOT NULL,
    "requiredCavaletes" INTEGER NOT NULL,
    "availableCavaletes" INTEGER NOT NULL,
    "requiredEstufas" INTEGER NOT NULL,
    "availableEstufas" INTEGER NOT NULL,
    "requiredFornos" INTEGER NOT NULL,
    "availableFornos" INTEGER NOT NULL,
    "dryingCurve" TEXT NOT NULL,
    "dryingTime" INTEGER NOT NULL,
    "dryingSpaceRequired" INTEGER NOT NULL,
    "dryingShelvesRequired" INTEGER NOT NULL,
    "firingCurve" TEXT NOT NULL,
    "firingTime" INTEGER NOT NULL,
    "maxFiringCapacity" INTEGER NOT NULL,
    "requiredFiringCapacity" INTEGER NOT NULL,
    "tanksStartDate" TIMESTAMP(3),
    "tanksEndDate" TIMESTAMP(3),
    "tanksStatus" TEXT,
    "tanksDetails" TEXT,
    "mixingStartDate" TIMESTAMP(3),
    "mixingEndDate" TIMESTAMP(3),
    "mixingStatus" TEXT,
    "mixingDetails" TEXT,
    "filtrationStartDate" TIMESTAMP(3),
    "filtrationEndDate" TIMESTAMP(3),
    "filtrationStatus" TEXT,
    "filtrationDetails" TEXT,
    "preExtrusionStartDate" TIMESTAMP(3),
    "preExtrusionEndDate" TIMESTAMP(3),
    "preExtrusionStatus" TEXT,
    "preExtrusionDetails" TEXT,
    "rollDryingStartDate" TIMESTAMP(3),
    "rollDryingEndDate" TIMESTAMP(3),
    "rollDryingStatus" TEXT,
    "rollDryingDetails" TEXT,
    "turningStartDate" TIMESTAMP(3),
    "turningEndDate" TIMESTAMP(3),
    "turningStatus" TEXT,
    "turningDetails" TEXT,
    "isolatedDryingStartDate" TIMESTAMP(3),
    "isolatedDryingEndDate" TIMESTAMP(3),
    "isolatedDryingStatus" TEXT,
    "isolatedDryingDetails" TEXT,
    "glazingStartDate" TIMESTAMP(3),
    "glazingEndDate" TIMESTAMP(3),
    "glazingStatus" TEXT,
    "glazingDetails" TEXT,
    "isolatorBakingStartDate" TIMESTAMP(3),
    "isolatorBakingEndDate" TIMESTAMP(3),
    "isolatorBakingStatus" TEXT,
    "isolatorBakingDetails" TEXT,
    "assemblyStartDate" TIMESTAMP(3),
    "assemblyEndDate" TIMESTAMP(3),
    "assemblyStatus" TEXT,
    "assemblyDetails" TEXT,
    "mechanicalTestsStartDate" TIMESTAMP(3),
    "mechanicalTestsEndDate" TIMESTAMP(3),
    "mechanicalTestsStatus" TEXT,
    "mechanicalTestsDetails" TEXT,
    "packingStartDate" TIMESTAMP(3),
    "packingEndDate" TIMESTAMP(3),
    "packingStatus" TEXT,
    "packingDetails" TEXT,
    "shippingStartDate" TIMESTAMP(3),
    "shippingEndDate" TIMESTAMP(3),
    "shippingStatus" TEXT,
    "shippingDetails" TEXT,
    "fullCycleDryingLoadStartDate" TIMESTAMP(3),
    "fullCycleDryingLoadEndDate" TIMESTAMP(3),
    "fullCycleDryingLoadStatus" TEXT,
    "fullCycleDryingLoadDetails" TEXT,
    "fullCycleDryingUnloadStartDate" TIMESTAMP(3),
    "fullCycleDryingUnloadEndDate" TIMESTAMP(3),
    "fullCycleDryingUnloadStatus" TEXT,
    "fullCycleDryingUnloadDetails" TEXT,
    "conditionedDryingStartDate" TIMESTAMP(3),
    "conditionedDryingEndDate" TIMESTAMP(3),
    "conditionedDryingStatus" TEXT,
    "conditionedDryingDetails" TEXT,
    "airDryingStartDate" TIMESTAMP(3),
    "airDryingEndDate" TIMESTAMP(3),
    "airDryingStatus" TEXT,
    "airDryingDetails" TEXT,
    "whiteDryingStartDate" TIMESTAMP(3),
    "whiteDryingEndDate" TIMESTAMP(3),
    "whiteDryingStatus" TEXT,
    "whiteDryingDetails" TEXT,
    "firingStartDate" TIMESTAMP(3),
    "firingEndDate" TIMESTAMP(3),
    "firingStatus" TEXT,
    "firingDetails" TEXT,
    "inTheKilnStartDate" TIMESTAMP(3),
    "inTheKilnEndDate" TIMESTAMP(3),
    "inTheKilnStatus" TEXT,
    "inTheKilnDetails" TEXT,
    "unloadingStartDate" TIMESTAMP(3),
    "unloadingEndDate" TIMESTAMP(3),
    "unloadingStatus" TEXT,
    "unloadingDetails" TEXT,
    "selectionStartDate" TIMESTAMP(3),
    "selectionEndDate" TIMESTAMP(3),
    "selectionStatus" TEXT,
    "selectionDetails" TEXT,
    "secondFiringStartDate" TIMESTAMP(3),
    "secondFiringEndDate" TIMESTAMP(3),
    "secondFiringStatus" TEXT,
    "secondFiringDetails" TEXT,
    "rectificationStartDate" TIMESTAMP(3),
    "rectificationEndDate" TIMESTAMP(3),
    "rectificationStatus" TEXT,
    "rectificationDetails" TEXT,
    "matStartDate" TIMESTAMP(3),
    "matEndDate" TIMESTAMP(3),
    "matStatus" TEXT,
    "matDetails" TEXT,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Chat_chatId_key" ON "Chat"("chatId");

-- CreateIndex
CREATE UNIQUE INDEX "PublicCall_callId_key" ON "PublicCall"("callId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Call" ADD CONSTRAINT "Call_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Call" ADD CONSTRAINT "Call_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PublicCall" ADD CONSTRAINT "PublicCall_hostUserId_fkey" FOREIGN KEY ("hostUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "View" ADD CONSTRAINT "View_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "View" ADD CONSTRAINT "View_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "View" ADD CONSTRAINT "View_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Share" ADD CONSTRAINT "Share_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Share" ADD CONSTRAINT "Share_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Share" ADD CONSTRAINT "Share_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Story" ADD CONSTRAINT "Story_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BrowsingHistory" ADD CONSTRAINT "BrowsingHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BrowsingHistory" ADD CONSTRAINT "BrowsingHistory_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
