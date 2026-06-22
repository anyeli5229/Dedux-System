import { ReactNode } from "react";

interface ErrorMessageProps {
    children: ReactNode
}

export default function ErrorMessage({ children }: ErrorMessageProps) {
    return (
        <>
            <p className="text-xs font-semibold text-red-600 mt-1 flex items-center gap-1">
                <span className="inline-block w-1 h-1 rounded-full bg-red-600"></span>
                {children}
            </p>
        </>
    )
}