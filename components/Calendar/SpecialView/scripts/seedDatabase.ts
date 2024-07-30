import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

interface Event {
  id: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  orderStatus: string;
  element: string;
  workCenter: string;
  isoKey: string;
  batchKey: string;
  productKey: string;
  stockIn31A: number;
  orderAmount: number;
  orderNumber: string;
  pathRecords: PathRecords;
  [key: string]: any; // Allows additional properties if needed
}

interface PathRecords {
  tanks: PathRecord;
  mixing: PathRecord;
  filtration: PathRecord;
  preExtrusion: PathRecord;
  rollDrying: PathRecord;
  turning: PathRecord;
  isolatedDrying: PathRecord;
  glazing: PathRecord;
  isolatorBaking: PathRecord;
  assembly: PathRecord;
  mechanicalTests: PathRecord;
  packing: PathRecord;
  shipping: PathRecord;
}

interface PathRecord {
  startDate: string;
  endDate: string;
  status: string;
  details: string;
}

const generatePathRecords = (): PathRecords => ({
  tanks: {
    startDate: faker.date.past().toISOString().split("T")[0],
    endDate: faker.date.future().toISOString().split("T")[0],
    status: faker.helpers.arrayElement([
      "Pending",
      "Completed",
      "Needs review",
    ]),
    details: faker.lorem.sentence(),
  },
  mixing: {
    startDate: faker.date.past().toISOString().split("T")[0],
    endDate: faker.date.future().toISOString().split("T")[0],
    status: faker.helpers.arrayElement([
      "Pending",
      "Completed",
      "Needs review",
    ]),
    details: faker.lorem.sentence(),
  },
  filtration: {
    startDate: faker.date.past().toISOString().split("T")[0],
    endDate: faker.date.future().toISOString().split("T")[0],
    status: faker.helpers.arrayElement([
      "Pending",
      "Completed",
      "Needs review",
    ]),
    details: faker.lorem.sentence(),
  },
  preExtrusion: {
    startDate: faker.date.past().toISOString().split("T")[0],
    endDate: faker.date.future().toISOString().split("T")[0],
    status: faker.helpers.arrayElement([
      "Pending",
      "Completed",
      "Needs review",
    ]),
    details: faker.lorem.sentence(),
  },
  rollDrying: {
    startDate: faker.date.past().toISOString().split("T")[0],
    endDate: faker.date.future().toISOString().split("T")[0],
    status: faker.helpers.arrayElement([
      "Pending",
      "Completed",
      "Needs review",
    ]),
    details: faker.lorem.sentence(),
  },
  turning: {
    startDate: faker.date.past().toISOString().split("T")[0],
    endDate: faker.date.future().toISOString().split("T")[0],
    status: faker.helpers.arrayElement([
      "Pending",
      "Completed",
      "Needs review",
    ]),
    details: faker.lorem.sentence(),
  },
  isolatedDrying: {
    startDate: faker.date.past().toISOString().split("T")[0],
    endDate: faker.date.future().toISOString().split("T")[0],
    status: faker.helpers.arrayElement([
      "Pending",
      "Completed",
      "Needs review",
    ]),
    details: faker.lorem.sentence(),
  },
  glazing: {
    startDate: faker.date.past().toISOString().split("T")[0],
    endDate: faker.date.future().toISOString().split("T")[0],
    status: faker.helpers.arrayElement([
      "Pending",
      "Completed",
      "Needs review",
    ]),
    details: faker.lorem.sentence(),
  },
  isolatorBaking: {
    startDate: faker.date.past().toISOString().split("T")[0],
    endDate: faker.date.future().toISOString().split("T")[0],
    status: faker.helpers.arrayElement([
      "Pending",
      "Completed",
      "Needs review",
    ]),
    details: faker.lorem.sentence(),
  },
  assembly: {
    startDate: faker.date.past().toISOString().split("T")[0],
    endDate: faker.date.future().toISOString().split("T")[0],
    status: faker.helpers.arrayElement([
      "Pending",
      "Completed",
      "Needs review",
    ]),
    details: faker.lorem.sentence(),
  },
  mechanicalTests: {
    startDate: faker.date.past().toISOString().split("T")[0],
    endDate: faker.date.future().toISOString().split("T")[0],
    status: faker.helpers.arrayElement([
      "Pending",
      "Completed",
      "Needs review",
    ]),
    details: faker.lorem.sentence(),
  },
  packing: {
    startDate: faker.date.past().toISOString().split("T")[0],
    endDate: faker.date.future().toISOString().split("T")[0],
    status: faker.helpers.arrayElement([
      "Pending",
      "Completed",
      "Needs review",
    ]),
    details: faker.lorem.sentence(),
  },
  shipping: {
    startDate: faker.date.past().toISOString().split("T")[0],
    endDate: faker.date.future().toISOString().split("T")[0],
    status: faker.helpers.arrayElement([
      "Pending",
      "Completed",
      "Needs review",
    ]),
    details: faker.lorem.sentence(),
  },
});

const generateEvent = (): Event => ({
  id: uuidv4(),
  title: `Produto ${faker.commerce.productName()}`,
  description: faker.lorem.sentence(),
  startTime: faker.date.past(),
  endTime: faker.date.future(),
  element: faker.helpers.arrayElement(["Forno TS", "Forno 1", "Forno 2"]),
  workCenter: faker.helpers.arrayElement(["Oven TS", "Oven 1", "Oven 2"]),
  isoKey: `Iso${faker.number.int({ min: 1, max: 10 })}`,
  batchKey: `Batch${faker.number.int({ min: 1, max: 10 })}`,
  productKey: `Prod${faker.number.int({ min: 1, max: 10 })}`,
  stockIn31A: faker.number.int({ min: 0, max: 100 }),
  orderAmount: faker.number.int({ min: 0, max: 100 }),
  orderNumber: `Order${faker.number.int({ min: 1, max: 1000 })}`,
  orderStatus: faker.helpers.arrayElement(["Pending", "Completed", "In Progress"]),
  pathRecords: generatePathRecords(),
});

const insertEvents = async (events: Event[]) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const insertPromises = events.map((event: Event) =>
      client.query(
        "INSERT INTO events (id, title, description, start_time, end_time, element, work_center, iso_key, batch_key, product_key, stock_in_31a, order_amount, order_number, order_status, path_records) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)",
        [
          event.id,
          event.title,
          event.description,
          event.startTime,
          event.endTime,
          event.element,
          event.workCenter,
          event.isoKey,
          event.batchKey,
          event.productKey,
          event.stockIn31A,
          event.orderAmount,
          event.orderNumber,
          event.orderStatus,
          JSON.stringify(event.pathRecords),
        ]
      )
    );
    await Promise.all(insertPromises);
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error inserting events:", error);
  } finally {
    client.release();
  }
};

const main = async () => {
  const events: Event[] = Array.from({ length: 50 }, generateEvent);
  await insertEvents(events);
  console.log("Events inserted successfully");
};

main().catch(console.error);
