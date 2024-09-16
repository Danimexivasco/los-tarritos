import { ROUTES } from "@/utils/routes";
import Link from "@/components/link";
import { getPath } from "@/utils/getPath";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-10rem)] md:min-h-[calc(100vh-13.5rem)] h-full grid place-content-center">
      <h1 className="text-center text-4xl mb-8">Choose the desired APP</h1>
      <div className="grid gap-4 place-content-center h-full">
        {ROUTES.filter(route => route.onMenu && route.name !== "Home").map(route =>
          <Link
            key={route.name}
            href={getPath(route.name)}
            asButton
            className="text-2xl"
          >{route.name}</Link>)}
      </div>
    </div>
  )
}
