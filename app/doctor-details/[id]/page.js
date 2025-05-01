import DoctorDetails from "@/app/components/DoctorDetails/DoctorDetails";

export async function generateStaticParams() {
  const allDoctors = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/doctors/filter?page=${page}`
    );
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

  return allDoctors.map((doctor) => ({
    id: doctor.id.toString(),
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/doctors/${id}`,
    { next: { revalidate: 3600 } }
  );
  const data = await res.json();
  const doctor = data.data;

  if (!doctor) {
    return {
      title: "Doctor Details | MedCare",
      description: "Find doctor information on MedCare.",
    };
  }

  return {
    title: `${doctor.name} | ${doctor.specialty}`,
    description:
      doctor.bio ||
      `Book an appointment with ${doctor.name}, ${doctor.specialty}.`,
    keywords: [
      doctor.name,
      doctor.specialty,
      "doctors",
      "healthcare",
      "medical services",
      "book appointment",
    ],
    openGraph: {
      title: `${doctor.name} | ${doctor.specialty} | MedCare`,
      description: doctor.bio || `Book an appointment with ${doctor.name}`,
      images: [doctor.photo_path],
    },
  };
}

const DoctorDetailsPage = async ({ params }) => {
  const { id } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/doctors/${id}`,
    { next: { revalidate: 3600 } }
  );
  const data = await res.json();
  const doctor = data.data;

  return <DoctorDetails doctor={doctor} />;
};

export default DoctorDetailsPage;
