import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">Welcome to Estate Pulse</h1>

          <div className="flex flex-row gap-3">
            <Link href="/ads/enqueue">
              <Button className="mt-4" size="xxxl">
                  Enqueue new listing
              </Button>
            </Link>
            <Link href="/ads">
              <Button className="mt-4" size="xxxl">
                    Listings
                </Button>
            </Link>
          </div>
    </div>
  );
}
