import { promises as fs } from "fs";
import path from "path";
import { Metadata } from "next";
import { z } from "zod";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { taskSchema } from "./data/schema";

export const metadata: Metadata = {
  title: "Projects",
};

// Simulate a database read for tasks.
async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/app/(dashboard)/tasks/data/data.json")
  );

  const tasks = JSON.parse(data.toString());

  return z.array(taskSchema).parse(tasks);
}

export default async function TaskPage() {
  const tasks = await getTasks();

  return (
    <div className=" h-full flex-1 flex-col space-y-8 p-4 md:p-8 flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of your tasks for this month!
          </p>
        </div>
        <div className="flex items-center gap-x-2"></div>
      </div>
      <DataTable data={tasks} columns={columns} />
    </div>
  );
}
