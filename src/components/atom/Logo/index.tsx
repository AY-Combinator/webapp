import Image from "next/image";
import LogoImage from "@/assets/images/AY-combinator-logo.png";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/dashboard" aria-label="Go to Dashboard">
      <Image
        src={LogoImage}
        alt="AY Combinator Logo"
        width={160}
        height={46}
        priority
      />
    </Link>
  );
};
export default Logo;
