// app/sitemap.ts
import fs from "fs";
import path from "path";
import { MetadataRoute } from "next";

const baseUrl = 'https://prasenjeet066.github.io';
const baseDir = "app"; // your app directory
const excludeDirs = ["api", "fonts"];

export const revalidate = 3600; // revalidate at most every hour

async function getRoutes(): Promise < MetadataRoute.Sitemap > {
  const fullPath = path.join(process.cwd(), baseDir);
  const entries = fs.readdirSync(fullPath, { withFileTypes: true });
  
  let routes: string[] = ["/"]; // root route
  
  // Add static directories
  entries.forEach((entry) => {
    if (entry.isDirectory() && !excludeDirs.includes(entry.name)) {
      routes.push(`/${entry.name}`);
    }
  });
  
  // Add dynamic routes from API (example: todos)
  async function getDynamicRoutes() {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos");
    const todos = await res.json();
    const todoRoutes = todos.map((todo: any) => `/todo/${todo.id}`);
    routes = [...routes, ...todoRoutes];
  }
  
  await getDynamicRoutes();
  
  // Map all routes to sitemap format
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1.0,
  }));
}

export default function sitemap() {
  return getRoutes();
}