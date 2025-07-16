import db from "@/infrastructure/database/dbClient";
import { projectSchema } from "@/infrastructure/database/schemas/Project.schema";
import { faker } from "@faker-js/faker";

import { BaseMocker } from "./Base.mocker";


export class ProjectMocker extends BaseMocker {
  /**
   * @returns Generated `Project`' ID.
   */
  public static async generate(amount = 20): Promise<void> {
    const projects = [];
    for (let i = 0; i < amount; i++) {
      projects.push({
        id:             faker.string.uuid(),
        createdAt:      faker.date.past(),
        name:           faker.company.name(),
        description:    faker.lorem.sentence(),
        imageUrl:       faker.image.url({ width: 500, height: 500 }),
        location:       faker.location.city() + ", " + faker.location.state() + ", " + faker.location.country(),
        targetAmount:   faker.number.int({ min: 1000000, max: 10000000 }),
        currentAmount:  faker.number.int({ min: 1000000, max: 10000000 }),
        minInvestment:  faker.number.int({ min: 10000, max: 1000000 }),
        expectedReturn: faker.helpers.arrayElement(["4-6%", "10-12%", "14-16%", "18-20%"]),
        investors:      faker.number.int({ min: 10, max: 100 }),
        status:         faker.helpers.arrayElement(["active", "inactive"])
      });
    }
    await db.insert(projectSchema).values(projects);
  }
}
