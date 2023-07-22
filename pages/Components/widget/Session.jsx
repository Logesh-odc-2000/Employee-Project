import { useSession, signOut } from "next-auth/react"
import { useState } from "react"

export default function Session() {
    let [isOpen, setIsOpen] = useState(true)
    function openModal() {
        setIsOpen(true)
      }
    const { data: session, status } = useSession()
    console.log('Auth', session);
    if (status === "authenticated") {
        return (
            <>
                <p>{session.user.email}</p>
                <button
                    className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-2 text-base font-medium text-white shadow-sm hover:from-purple-700 hover:to-indigo-700"
                    onClick={() => signOut({})}>Sign out</button>
            </>
        )
    }
    return (
        <>
            <a
                href="/auth/signin"
                onClick={openModal}
                className={
                    `whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900`
                }>
                Sign in
            </a>
            <a
                href="#"
                className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-2 text-base font-medium text-white shadow-sm hover:from-purple-700 hover:to-indigo-700"
            >
                Sign up
            </a>
        </>
    )
}