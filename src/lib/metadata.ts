import { Metadata } from "next";

interface ParamsTypes {
  title: string;
  description: string;
}

export function basedMeta({ title, description }: ParamsTypes): Metadata {
  return {
    title,
    description,
    openGraph: {
      type: "website",
      title,
      description,
    },
    twitter: {
      title,
      description,
    },
    alternates: {
      canonical: process.env.NEXT_PUBLIC_DOMAIN,
    },
  };
}
