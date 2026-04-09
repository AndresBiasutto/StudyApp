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

const DEFAULT_ROLES = ["student", "teacher", "admin"] as const;
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

  if (missingTables.length === 0) {
    console.log(
      "Automatic schema sync disabled. Apply migrations manually before starting the app.",
    );
    return;
  }

  console.warn(
    `Missing tables detected (${missingTables.join(", ")}). Creating base schema with sequelize.sync().`,
  );
  await sequelize.sync();
  console.log("Base schema created");
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

export const initDb = async (): Promise<void> => {
  await sequelize.authenticate();
  console.log("Database connected");
  await ensureSchema();
  await ensureDefaultGrades();
  await ensureDefaultRolesAndAdmin();
};
