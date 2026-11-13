import { notFound } from "next/navigation";
import { getCakeById, getAllCakes } from "@/components/cakeData";
import CakeVideoExperience from "@/components/CakeVideoExperience";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const cake = getCakeById(resolvedParams.id);
  if (!cake) return { title: "غير موجود - إيليت بيكس" };

  return {
    title: `${cake.title} - إيليت بيكس`,
    description: cake.description,
    openGraph: {
      title: cake.title,
      description: cake.description,
      images: [cake.wholeImage],
    },
  };
}

export async function generateStaticParams() {
  return getAllCakes().map((cake) => ({
    id: cake.id,
  }));
}

export default async function CakePage({ params }) {
  const resolvedParams = await params;
  const cake = getCakeById(resolvedParams.id);

  if (!cake) notFound();

  return <CakeVideoExperience cake={cake} />;
}