export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/private/", "/api/"],
    },
    sitemap: `${process.env.NEXT_PUBLIC_BASE_SITE_URL}/sitemap.xml`,
  };
}
