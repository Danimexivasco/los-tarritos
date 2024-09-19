import { ROUTES } from "@/utils/routes";
import { getPath } from "@/utils/getPath";
import Link from "@/components/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-10rem)] md:min-h-[calc(100vh-13.5rem)] h-full grid place-content-center">
      <Image
        src={"/images/matrix_pill_choice.gif"}
        alt="matrix pill choice" width={1204}
        height={300}
        className="rounded mb-10 shadow-black shadow-md"
      />
      <div className="grid md:flex gap-4 h-full">
        {ROUTES.filter(route => route.onMenu && route.name !== "Home").map(route =>
          <Link
            key={route.name}
            href={getPath(route.name)}
            asButton
            className="text-2xl text-center"
          >
            {route.name}
          </Link>)
        }
      </div>
    </div>
  )
}
