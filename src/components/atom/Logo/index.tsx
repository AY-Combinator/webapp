import Image from "next/image";
import LogoImage from "@/assets/images/temporary-logo.svg";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" aria-label="Go to Homepage">
      <Image
        src={LogoImage}
        alt="AY Combinator Logo"
        width={154}
        height={28}
        priority
      />
    </Link>
  );
};
export default Logo;
