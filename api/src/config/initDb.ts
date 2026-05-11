import { sequelize } from "./database";
import { env } from "./env";
import hashPassword from "../utils/hashPassword";

const REQUIRED_TABLES = [
  "Users",
  "Roles",
  "Subjects",
  "Units",
  "Chapters",
  "Grades",
  "Exams",
  "ExamResults",
];

const DEFAULT_ROLES = ["c-level", "student", "teacher", "admin"] as const;
const DEFAULT_GRADES = [
  "1º año",
  "2º año",
  "3º año",
  "4º año",
  "5º año",
  "6º año",
] as const;
const DEFAULT_ADMIN = {
  email: "aquiandres1@outlook.com",
  password: "mono1nteligente",
  name: "Andres",
  lastName: "Admin",
} as const;
const DEMO_PASSWORD = "demo123456" as const;
const DEMO_USERS = [
  {
    email: "demo.student@monosapiens.app",
    role: "student",
    name: "Demo",
    lastName: "Student",
    description: "Cuenta demo de alumno para entrevistas",
  },
  {
    email: "demo.teacher@monosapiens.app",
    role: "teacher",
    name: "Demo",
    lastName: "Teacher",
    description: "Cuenta demo de profesor para entrevistas",
  },
  {
    email: "demo.admin@monosapiens.app",
    role: "admin",
    name: "Demo",
    lastName: "Admin",
    description: "Cuenta demo administrativa para entrevistas",
  },
] as const;

const normalizeTableName = (table: unknown): string | null => {
  if (typeof table === "string") {
    return table;
  }

  if (
    table &&
    typeof table === "object" &&
    "tableName" in table &&
    typeof (table as { tableName?: unknown }).tableName === "string"
  ) {
    return (table as { tableName: string }).tableName;
  }

  return null;
};

const ensureSchema = async (): Promise<void> => {
  const queryInterface = sequelize.getQueryInterface();
  const existingTables = await queryInterface.showAllTables();
  const normalizedTables = new Set(
    existingTables
      .map(normalizeTableName)
      .filter((tableName): tableName is string => Boolean(tableName))
      .map((tableName) => tableName.toLowerCase()),
  );

  const missingTables = REQUIRED_TABLES.filter(
    (tableName) => !normalizedTables.has(tableName.toLowerCase()),
  );

  if (env.db.syncMode === "alter") {
    console.warn(
      "DB_SYNC_MODE=alter habilitado. Esto es temporal hasta migrar a migraciones explicitas.",
    );
    await sequelize.sync({ alter: true });
    console.log("Models synced with alter");
    return;
  }

  if (env.db.syncMode === "init") {
    if (missingTables.length === 0) {
      console.log("Database schema already initialized");
      return;
    }

    console.warn(
      `Missing tables detected (${missingTables.join(", ")}). Creating base schema with sequelize.sync().`,
    );
    await sequelize.sync();
    console.log("Base schema created");
    return;
  }

  if (missingTables.length === 0) {
    console.log(
      "Automatic schema sync disabled. Existing schema detected.",
    );
    return;
  }

  throw new Error(
    `Missing tables detected (${missingTables.join(
      ", ",
    )}). Set DB_SYNC_MODE=init for a one-time bootstrap or import an existing database before starting the app.`,
  );
};

const ensureDefaultRolesAndAdmin = async (): Promise<void> => {
  const { Role, User } = sequelize.models;

  if (!Role || !User) {
    console.warn("Roles or Users model unavailable for bootstrap seeding.");
    return;
  }

  for (const roleName of DEFAULT_ROLES) {
    const existingRole = await Role.findOne({ where: { name: roleName } });

    if (!existingRole) {
      await Role.create({ name: roleName });
      console.log(`Bootstrap role created: ${roleName}`);
    }
  }

  const userCount = await User.count();

  if (userCount > 0) {
    return;
  }

  const adminRole = await Role.findOne({ where: { name: "admin" } });

  if (!adminRole) {
    throw new Error("Admin role missing after bootstrap seeding");
  }

  const adminRoleData = adminRole.get({ plain: true }) as { id_role?: string };

  if (!adminRoleData.id_role) {
    throw new Error("Admin role ID missing after bootstrap seeding");
  }

  const passwordHash = await hashPassword(DEFAULT_ADMIN.password);

  await User.create({
    name: DEFAULT_ADMIN.name,
    last_name: DEFAULT_ADMIN.lastName,
    e_mail: DEFAULT_ADMIN.email,
    password: passwordHash,
    e_mail_verified: true,
    verification_token: null,
    provider: "local",
    id_role: adminRoleData.id_role,
  });

  console.log(`Bootstrap admin created: ${DEFAULT_ADMIN.email}`);
};

const ensureDefaultGrades = async (): Promise<void> => {
  const { Grade } = sequelize.models;

  if (!Grade) {
    console.warn("Grade model unavailable for bootstrap seeding.");
    return;
  }

  const gradeCount = await Grade.count();

  if (gradeCount > 0) {
    return;
  }

  await Grade.bulkCreate(DEFAULT_GRADES.map((name) => ({ name })));
  console.log(`Bootstrap grades created: ${DEFAULT_GRADES.join(", ")}`);
};

const ensureDemoUsers = async (): Promise<void> => {
  const { Role, User } = sequelize.models;

  if (!Role || !User) {
    console.warn("Roles or Users model unavailable for demo bootstrap seeding.");
    return;
  }

  const passwordHash = await hashPassword(DEMO_PASSWORD);

  for (const demoUser of DEMO_USERS) {
    const existingUser = await User.findOne({
      where: { e_mail: demoUser.email },
    });

    if (existingUser) {
      continue;
    }

    const role = await Role.findOne({ where: { name: demoUser.role } });

    if (!role) {
      throw new Error(`Missing role for demo user bootstrap: ${demoUser.role}`);
    }

    const roleData = role.get({ plain: true }) as { id_role?: string };

    if (!roleData.id_role) {
      throw new Error(`Invalid role ID for demo user bootstrap: ${demoUser.role}`);
    }

    await User.create({
      name: demoUser.name,
      last_name: demoUser.lastName,
      description: demoUser.description,
      e_mail: demoUser.email,
      password: passwordHash,
      e_mail_verified: true,
      verification_token: null,
      provider: "local",
      is_demo_user: true,
      id_role: roleData.id_role,
    });

    console.log(`Bootstrap demo user created: ${demoUser.email}`);
  }
};

export const initDb = async (): Promise<void> => {
  await sequelize.authenticate();
  console.log("Database connected");
  await ensureSchema();
  await ensureDefaultGrades();
  await ensureDefaultRolesAndAdmin();
  await ensureDemoUsers();
};
