import Link from "next/link";
import React from "react";

interface User {
    avatar_url: string;
    name: string;
    location: string;
    bio: string;
    twitter_username: string;
    public_repos: number;
    followers: number;
    html_url: string;
    message?: string;
}

const User = async ({
    params: { username },
}: {
    params: { username: string };
}) => {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const user: User = await res.json();
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="border w-full max-w-4xl px-7 py-7 flex gap-5 relative">
                <Link
                    href="/"
                    className="absolute -left-5 -top-4 bg-white px-3 py-2 rounded-lg border border-blue-400"
                >
                    Go Back
                </Link>
                {!user.message ? (
                    <>
                        <a
                            href={user.html_url}
                            target="_blank"
                            className="absolute -right-4 -top-4 bg-white px-3 py-2 rounded-lg border border-blue-400"
                        >
                            Link
                        </a>
                        <img
                            src={user.avatar_url}
                            alt=""
                            className="w-[100px] rounded-full"
                        />
                        <div className="w-full flex flex-col justify-between">
                            <div>
                                <h1 className="text-2xl">{user.name}</h1>
                                <p className="text-sm">{user.bio}</p>
                            </div>
                            <div className="flex w-full items-center justify-between">
                                <p>Location: {user.location}</p>
                                <p>
                                    Twitter:{" "}
                                    <a
                                        target="_blank"
                                        href={`https://twitter.com/${user.twitter_username}`}
                                        className="hover:underline"
                                    >
                                        {user.twitter_username}
                                    </a>
                                </p>
                            </div>
                        </div>
                    </>
                ) : (
                    <h1 className="text-center w-full text-2xl">
                        User not found.
                    </h1>
                )}
            </div>
        </div>
    );
};

export default User;
