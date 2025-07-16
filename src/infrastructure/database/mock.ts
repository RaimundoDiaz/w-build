// -------------------------------------------------------------------------------------------------
// Generates fake data for testing on dev-like runtimes.
// -------------------------------------------------------------------------------------------------

import { ProjectMocker } from "./mocks/Project.mocker";

const main = async (): Promise<void> => {
  await ProjectMocker.generate();
};

main();
