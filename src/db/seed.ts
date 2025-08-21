import { auth } from "@/lib/auth";

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

  return usersString.split(";").map((userString) => {
    const [name, email, password] = userString.split("|").map((s) => s.trim());

    if (!name || !email || !password) {
      throw new Error(`Invalid user format: ${userString}`);
    }

    return { name, email, password };
  });
}

async function seed() {
  console.log("🌱 Starting seed process...");

  try {
    const usersToSeed = parseUsers();

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
          throw error;
        }
      }
    }

    console.log("🎉 Seed completed successfully!");
  } catch (error) {
    console.error("❌ Seed failed:", error);
    throw error;
  }
}

async function main() {
  try {
    await seed();
  } catch (error) {
    console.error("Main process failed:", error);
    process.exit(1);
  }
}

main();
