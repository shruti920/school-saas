import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const DEMO_SCHOOL_ID = "639ff7af-412d-475b-a5e8-bb71ed43fe5b";

const users = [
  {
    email: "codewithshruti29@gmail.com",
    password: "Shruti",
    full_name: "Shruti",
    role: "super_admin",
    school_id: null,
  },
  {
    email: "secyweb.sg@iitbbs.ac.in",
    password: "Kittu27",
    full_name: "Kittu27",
    role: "admin",
    school_id: DEMO_SCHOOL_ID,
  },
  {
    email: "24mm01029@iitbbs.ac.in",
    password: "Gupta28",
    full_name: "Gupta28",
    role: "teacher",
    school_id: DEMO_SCHOOL_ID,
  },
  {
    email: "gupta420shruti@gmail.com",
    password: "Aditi29",
    full_name: "Aditi29",
    role: "student",
    school_id: DEMO_SCHOOL_ID,
  },
];

async function createUsers() {
  for (const user of users) {
    console.log(`Creating ${user.role}: ${user.email}`);

    const { data, error } = await supabase.auth.admin.createUser({
      email: user.email,
      password: user.password,
      email_confirm: true,

      user_metadata: {
        full_name: user.full_name,
        role: user.role,
        school_id: user.school_id,
      },
    });

    if (error) {
      console.error(`❌ ${user.email}`);
      console.error(error.message);
      continue;
    }

    console.log(`✅ Created ${user.email}`);
  }

  console.log("\nBootstrap complete.");
}

createUsers();