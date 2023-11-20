// Generated by Xata Codegen 0.26.4. Please do not edit.
import { buildClient } from "@xata.io/client";
import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";

const tables = [
  {
    name: "deals",
    columns: [
      { name: "name", type: "string", notNull: true, defaultValue: "null" },
      { name: "link", type: "string", notNull: true, defaultValue: "null" },
      { name: "coupon", type: "string" },
      { name: "approved", type: "bool", defaultValue: "false" },
      {
        name: "description",
        type: "text",
        notNull: true,
        defaultValue: "null",
      },
      { name: "couponPercent", type: "int" },
      { name: "startDate", type: "datetime" },
      { name: "endDate", type: "datetime" },
      { name: "email", type: "email" },
      { name: "category", type: "string" },
      { name: "featured", type: "bool", notNull: true, defaultValue: "false" },
    ],
  },
  { name: "adminUser", columns: [] },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type Deals = InferredTypes["deals"];
export type DealsRecord = Deals & XataRecord;

export type AdminUser = InferredTypes["adminUser"];
export type AdminUserRecord = AdminUser & XataRecord;

export type DatabaseSchema = {
  deals: DealsRecord;
  adminUser: AdminUserRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL:
    "https://James-Q-Quick-s-workspace-l5kbra.us-east-1.xata.sh/db/developer-black-friday-deals",
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient();
  return instance;
};
