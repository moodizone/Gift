import { Metadata } from "next";

interface ParamsTypes {
  title: string;
  description: string;
  privateMode?: boolean;
}

export function basedMeta({
  title,
  description,
  privateMode = false,
}: ParamsTypes): Metadata {
  if (privateMode) {
    return {
      title,
      description,
      alternates: {
        canonical: process.env.NEXT_PUBLIC_DOMAIN,
      },
    };
  }

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
