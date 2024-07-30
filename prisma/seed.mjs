import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

const NUM_USERS = 10;
const NUM_PICTURE_POSTS = 30;
const NUM_POSTS = 20;
const NUM_CONTACTS = 15;
const NUM_CALLS = 20;
const NUM_CHATS = 20;
const NUM_PUBLIC_CALLS = 10;
const NUM_REPLIES = 30;
const NUM_LIKES = 100;
const NUM_VIEWS = 200;
const NUM_SHARES = 50;
const NUM_CATEGORIES = 5;
const NUM_STORIES = 10;
const NUM_VIDEOS = 20;
const NUM_ITEMS = 50;
const NUM_SALES = 20;
const NUM_OFFERS = 20;
const NUM_ORDERS = 30;
const NUM_CART_ITEMS = 30;

async function main() {
  console.log("Seeding database...");

  // Create users
  const users = [];
  for (let i = 0; i < NUM_USERS; i++) {
    const user = await prisma.user.create({
      data: {
        id: uuidv4(), // Generate a unique ID for each user
        email: faker.internet.email(),
        password: faker.internet.password(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        companyName: faker.company.name(),
        profilePic: faker.image.avatar(),
      },
    });
    users.push(user);
  }
  console.log("Created users:", users);

  const specificUserId = "112112600271765376396";
  let specificUser = await prisma.user.findUnique({
    where: { id: specificUserId },
  });

  if (!specificUser) {
    specificUser = await prisma.user.create({
      data: {
        id: specificUserId,
        email: faker.internet.email(),
        password: faker.internet.password(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        companyName: faker.company.name(),
        profilePic: faker.image.avatar(),
      },
    });
    users.push(specificUser);
    console.log(specificUser);
  } else {
    specificUser = users.find((user) => user.id === specificUserId);
  }

  const contacts = [];
  for (let i = 0; i < NUM_CONTACTS; i++) {
    const contact = await prisma.contact.create({
      data: {
        userId: users[faker.number.int({ min: 0, max: users.length - 1 })].id,
        name: faker.name.fullName(),
        phone: faker.phone.number(),
        email: faker.internet.email(),
        address: faker.address.streetAddress(),
        notes: faker.lorem.sentence(),
      },
    });
    contacts.push(contact);
  }
  console.log("Created contacts:", contacts);

  // Create calls for each user
  for (let i = 0; i < NUM_CALLS; i++) {
    const user = users[faker.number.int({ min: 0, max: users.length - 1 })];
    const contact = contacts[faker.number.int({ min: 0, max: contacts.length - 1 })];
    if (user && contact) {
      await prisma.call.create({
        data: {
          userId: user.id,
          contactId: contact.id,
          callType: faker.helpers.arrayElement(["incoming", "outgoing"]),
          callTime: faker.date.recent(),
        },
      });
    }
  }
  console.log("Created calls");

  // Create chats for each user
  for (let i = 0; i < NUM_CHATS; i++) {
    const user = users[faker.number.int({ min: 0, max: users.length - 1 })];
    const contact = contacts[faker.number.int({ min: 0, max: contacts.length - 1 })];
    if (user && contact) {

        await prisma.chat.create({
          data: {
            userId: user.id,
            contactId: contact.id,
            chatId: faker.string.uuid(),
          },
        });
    
      
    }
  }
  console.log("Created chats");

  // Create picture posts
  for (let i = 0; i < NUM_PICTURE_POSTS; i++) {
    await prisma.picturePost.create({
      data: {
        userId: users[faker.number.int({ min: 0, max: users.length - 1 })].id,
        imageUrl: faker.image.url(),
        description: faker.lorem.sentence(),
      },
    });
  }
  console.log("Created picture posts");

  // Create posts
  const postTypes = ["anonymous", "authenticated", "verified", "bot"];
  const posts = [];
  for (let i = 0; i < NUM_POSTS; i++) {
    const randomUser = users[faker.number.int({ min: 0, max: users.length - 1 })];
    const postType = postTypes[faker.number.int({ min: 0, max: postTypes.length - 1 })];
    const post = await prisma.post.create({
      data: {
        userId: randomUser.id,
        userName: `${randomUser.firstName} ${randomUser.lastName}`,
        userProfilePic: randomUser.profilePic,
        content: faker.lorem.paragraph(),
        postType: postType,
      },
    });
    posts.push(post);
  }
  console.log("Created posts:", posts);

  // Create replies
  for (let i = 0; i < NUM_REPLIES; i++) {
    await prisma.reply.create({
      data: {
        postId: posts[faker.number.int({ min: 0, max: posts.length - 1 })].id,
        userId: users[faker.number.int({ min: 0, max: users.length - 1 })].id,
        content: faker.lorem.sentence(),
      },
    });
  }
  console.log("Created replies");

  // Create likes
  for (let i = 0; i < NUM_LIKES; i++) {
    await prisma.like.create({
      data: {
        postId: posts[faker.number.int({ min: 0, max: posts.length - 1 })].id,
        userId: users[faker.number.int({ min: 0, max: users.length - 1 })].id,
      },
    });
  }
  console.log("Created likes");

  // Create views
  for (let i = 0; i < NUM_VIEWS; i++) {
    await prisma.view.create({
      data: {
        postId: posts[faker.number.int({ min: 0, max: posts.length - 1 })].id,
        userId: users[faker.number.int({ min: 0, max: users.length - 1 })].id,
      },
    });
  }
  console.log("Created views");

  // Create shares
  for (let i = 0; i < NUM_SHARES; i++) {
    await prisma.share.create({
      data: {
        postId: posts[faker.number.int({ min: 0, max: posts.length - 1 })].id,
        userId: users[faker.number.int({ min: 0, max: users.length - 1 })].id,
      },
    });
  }
  console.log("Created shares");

  // Create public calls
  for (let i = 0; i < NUM_PUBLIC_CALLS; i++) {
    await prisma.publicCall.create({
      data: {
        callId: faker.string.uuid(),
        hostUserId: users[faker.number.int({ min: 0, max: users.length - 1 })].id,
        startTime: faker.date.recent(),
      },
    });
  }
  console.log("Created public calls");

  // Create categories
  for (let i = 0; i < NUM_CATEGORIES; i++) {
    await prisma.category.create({
      data: {
        name: faker.commerce.department(),
        color: faker.color.human(),
      },
    });
  }
  console.log("Created categories");

  // Create stories
  for (let i = 0; i < NUM_STORIES; i++) {
    const randomUser = users[faker.number.int({ min: 0, max: users.length - 1 })];
    await prisma.story.create({
      data: {
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraphs(),
        image: faker.image.url(),
        userId: randomUser.id,
      },
    });
  }
  console.log("Created stories");

  // Create videos
  for (let i = 1; i <= NUM_VIDEOS; i++) {
    const videoUrl = `/assets/video${i}.mp4`;
    const randomUser = users[faker.number.int({ min: 0, max: users.length - 1 })];
    await prisma.video.create({
      data: {
        userId: randomUser.id,
        videoUrl: videoUrl,
        description: `Description for video ${i}`,
      },
    });
    console.log(`Uploaded: ${videoUrl}`);
  }
  
    // Create items
    const items = [];
    for (let i = 0; i < NUM_ITEMS; i++) {
      const item = await prisma.item.create({
        data: {
          title: faker.commerce.productName(),
          description: faker.lorem.paragraph(),
          size: faker.helpers.arrayElement(["S", "M", "L", "XL"]),
          color: faker.color.human(),
          rating: faker.number.float({ min: 1, max: 5, precision: 0.1 }),
          price: faker.number.float({ min: 10, max: 1000, precision: 0.01 }),
          estimated_delivery_date: faker.date.future(),
          destination_delivery_date: faker.date.future(),
          stock: faker.number.int({ min: 0, max: 100 }),
          image_url: faker.image.url(),
        },
      });
      items.push(item);
    }
    console.log("Created items:", items);
  
    // Create sales
    for (let i = 0; i < NUM_SALES; i++) {
      await prisma.sale.create({
        data: {
          item_id: items[faker.number.int({ min: 0, max: items.length - 1 })].id,
          quantity: faker.number.int({ min: 1, max: 20 }),
          sale_date: faker.date.recent(),
          total_amount: faker.number.float({
            min: 10,
            max: 1000,
            precision: 0.01,
          }),
        },
      });
    }
    console.log("Created sales");
  
    // Create offers
    for (let i = 0; i < NUM_OFFERS; i++) {
      await prisma.offer.create({
        data: {
          item_id: items[faker.number.int({ min: 0, max: items.length - 1 })].id,
          discount_percentage: faker.number.float({
            min: 5,
            max: 50,
            precision: 0.01,
          }),
          start_date: faker.date.past(),
          end_date: faker.date.future(),
        },
      });
    }
    console.log("Created offers");
  
    // Create orders
    for (let i = 0; i < NUM_ORDERS; i++) {
      await prisma.order.create({
        data: {
          item_id: items[faker.number.int({ min: 0, max: items.length - 1 })].id,
          user_id: users[faker.number.int({ min: 0, max: users.length - 1 })].id,
          quantity: faker.number.int({ min: 1, max: 20 }),
          order_date: faker.date.recent(),
          total_amount: faker.number.float({
            min: 10,
            max: 1000,
            precision: 0.01,
          }),
        },
      });
    }
    console.log("Created orders");
  
    // Create cart items
    for (let i = 0; i < NUM_CART_ITEMS; i++) {
      await prisma.cart.create({
        data: {
          userId: users[faker.number.int({ min: 0, max: users.length - 1 })].id,
          itemId: items[faker.number.int({ min: 0, max: items.length - 1 })].id,
          quantity: faker.number.int({ min: 1, max: 5 }),
        },
      });
    }
    console.log("Created cart items");
  
    console.log("Seeding finished.");
  }
  
  main()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
  