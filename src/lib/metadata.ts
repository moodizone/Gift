import { Metadata } from "next";

import { domain } from "@/const";

interface ParamsTypes {
  title: string;
  description: string;
}

export function generateMeta({ title, description }: ParamsTypes): Metadata {
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
      canonical: domain,
    },
    viewport: "width=device-width, initial-scale=1.0",
    robots: "noindex, nofollow",
  };
}
