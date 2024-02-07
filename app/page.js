import Form from "@/components/Form";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 gap-4">
            <Link href="/expenses">
                <Button>Go to expenses List</Button>
            </Link>
            <Form />
        </main>
    );
}
