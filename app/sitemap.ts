import fs from "fs";
import path from "path";

const baseUrl = 'https://prasenjeet066.github.io';
const baseDir = "app"; // your app directory
const excludeDirs = ["api", "fonts"];

async function getRoutes() {
  const fullPath = path.join(process.cwd(), baseDir);
  const entries = fs.readdirSync(fullPath, { withFileTypes: true });
  
  let routes: string[] = ["/"]; // root route
  
  // Add static directories
  entries.forEach((entry) => {
    if (entry.isDirectory() && !excludeDirs.includes(entry.name)) {
      routes.push(`/${entry.name}`);
    }
  });
  
  // Add dynamic routes from API
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  const todos = await res.json();
  const todoRoutes = todos.map((todo: any) => `/todo/${todo.id}`);
  routes = [...routes];
  
  return routes;
}

// Convert routes to XML
export default async function sitemap() {
  const routes = await getRoutes();
  
  const urls = routes.map((route) => `
  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  `).join("");
  
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
  
  // Optional: write to public folder so GitHub Pages can serve it
  fs.writeFileSync(path.join(process.cwd(), "public", "sitemap.xml"), xml);
  
  return xml;
}