import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1 className="text-6xl font-bold mb-4">Welcome to Estate Pulse</h1>

        <div className="flex flex-row justify-center gap-3">
          <Link href="/ads/queue">
            <Button className="mt-4" size="xxxl">
                Add
            </Button>
          </Link>
          <Link href="/ads">
            <Button className="mt-4" size="xxxl">
              Listings
            </Button>
          </Link>
        </div>
    </>
  );
}
