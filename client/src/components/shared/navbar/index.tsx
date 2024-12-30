import Icons from "../icons";
import MaxWidthWrapper from "../max-width-wrapper";

export default function Navbar() {
  return (
    <MaxWidthWrapper>
      <nav className="pt-4">
        <Icons.Burger className="cursor-pointer" />
      </nav>
    </MaxWidthWrapper>
  );
}
