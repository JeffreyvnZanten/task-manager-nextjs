import { auth } from "@/lib/auth";

export async function createUsers() {
  await createTestUser();
  await createUsersFromEnv();
}

async function createTestUser() {
  const testUser = {
    name: "TestGebruiker",
    email: "testgebruiker@test.nl",
    password: "password123",
  };

  try {
    const result = await auth.api.signUpEmail({
      body: {
        email: testUser.email,
        password: testUser.password,
        name: testUser.name,
      },
      asResponse: false,
    });

    console.log(`✅ Created test user: ${testUser.name} (${testUser.email})`);
    console.log(result);
  } catch (error: any) {
    if (error.message?.includes("already exists")) {
      console.log(`⚠️ Test User already exists: ${testUser.email}`);
    } else {
      console.log(`❌ Failed to create test user: ${testUser.email}`);
    }
  }
}

async function createUsersFromEnv() {
  try {
    const usersToSeed = parseUsers();
    console.log(`Creating ${usersToSeed} from env...`);

    for (const userData of usersToSeed) {
      console.log(`Creating user: ${userData.email}`);

      try {
        const result = await auth.api.signUpEmail({
          body: {
            email: userData.email,
            password: userData.password,
            name: userData.name,
          },
          asResponse: false,
        });

        console.log(`✅ Created user: ${userData.name} (${userData.email})`);
        console.log(result);
      } catch (error: any) {
        if (error.message?.includes("already exists")) {
          console.log(`⚠️ User already exists: ${userData.email}`);
        } else {
          console.log(`❌ Failed to create user: ${userData.email}`);
        }
      }
    }

    console.log("🎉 create users from env completed successfully!");
  } catch (error) {
    console.error("❌ Create users from env failed:", error);
    throw error;
  }
}

function parseUsers(): Array<{
  name: string;
  email: string;
  password: string;
}> {
  const usersString = process.env.SEED_USERS || "";

  if (!usersString) {
    console.warn("No SEED_USERS found in environment variables");
    return [];
  }

  return usersString
    .split(";")
    .filter((userString) => userString.trim())
    .map((userString) => {
      const [name, email, password] = userString
        .split("|")
        .map((s) => s.trim());

      if (!name || !email || !password) {
        throw new Error(`Invalid user format: ${userString}`);
      }

      return { name, email, password };
    });
}
