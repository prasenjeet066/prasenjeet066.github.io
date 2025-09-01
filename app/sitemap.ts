import { MetadataRoute } from "next";
//import { getAllPosts } from "./lib/posts"; // your data fetching logic

export default async function sitemap(): Promise < MetadataRoute.Sitemap > {
  const baseUrl = "https://prasenjeet066.github.io";
  //const posts = await getAllPosts();
  
  /**const postUrls = posts.map(post => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: new Date(post.updatedAt),
  }));**/
  
  return [
    { url: baseUrl, lastModified: new Date() },
    {
      url: baseUrl+'/hire',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      
      url: baseUrl+'/project',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    
    }
  ];
}