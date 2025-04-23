export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const siteUrl =
    process.env.NEXT_PUBLIC_BASE_SITE_URL || "http://localhost:3000";

  const allDoctors = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const res = await fetch(`${baseUrl}/doctors/filter?page=${page}`);
    const result = await res.json();

    if (result?.data?.length > 0) {
      allDoctors.push(...result.data);
      const totalPages = result.pagination?.pages || 1;
      page++;
      hasMore = page <= totalPages;
    } else {
      hasMore = false;
    }
  }

  const doctorEnteries = allDoctors.map((doctor) => ({
    url: `${siteUrl}/doctor-details/${doctor.id}`,
  }));

  return [
    {
      url: `${siteUrl}`,
    },
    {
      url: `${siteUrl}/appointments`,
    },
    {
      url: `${siteUrl}/reviews`,
    },
    {
      url: `${siteUrl}/emergency`,
    },
    ...doctorEnteries,
  ];
}
