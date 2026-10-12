import type { MetadataRoute } from "next";
import { shop } from "@/data/shop";

const routes = [
  "",
  "/menu",
  "/events",
  "/about",
  "/private-events",
  "/contact",
  "/visit",
  "/crate",
  "/tour",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: `${shop.url}${path}`,
    changeFrequency: path === "/events" || path === "/crate" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
