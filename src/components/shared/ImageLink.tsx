import Image from "next/image";
import Link from "next/link";

interface ImageLinkProps {
  source: string;
  alt: string;
  href: string;
  width?: number;
  height?: number;
}

export default function ImageLink({ source, alt, href, width = 32, height = 32 }: ImageLinkProps) {
  return (
    <Link href={href}>
      <Image 
        src={source} 
        alt={alt} 
        width={width} 
        height={height} 
      />
    </Link>
  );
}