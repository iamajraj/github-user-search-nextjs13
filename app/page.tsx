"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
    const [username, setUsername] = useState("");
    const router = useRouter();
    return (
        <main className="h-screen flex-col w-full flex items-center justify-center">
            <h1 className="text-2xl">Search Github Users</h1>
            <form
                onSubmit={(e) => e.preventDefault()}
                className="mt-5 space-x-5"
            >
                <input
                    type="text"
                    placeholder="e.g iamajraj"
                    className="border outline-none rounded-lg py-3 px-3 w-[400px]"
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                />
                <button
                    onClick={() => {
                        router.push(`/users/${username}`);
                    }}
                    className="px-3 rounded-lg border h-full cursor-pointer hover:border-blue-400 transition-[border]"
                >
                    Search
                </button>
            </form>
        </main>
    );
}
