"use client"

import { User as UserIcon, Settings, LogOut, CreditCard, HelpCircle, Moon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut  } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { getInitials } from "@/lib/utils"

import { User } from "better-auth"

interface UserDropdownProps {
    user: User,
}

export function UserDropdown({ user }: UserDropdownProps) {
    const router = useRouter()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full">
                    <Avatar className="h-6 w-6 cursor-pointer">
                        <AvatarImage src={user.image || "/placeholder.svg?height=24&width=24"} />
                        <AvatarFallback className="bg-green-500 text-white text-xs font-medium">
                            {getInitials(user.name)}
                        </AvatarFallback>
                    </Avatar>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white border-gray-200" align="end">
                <div className="px-3 py-2">
                    <p className="text-sm font-medium text-black">{user.name}</p>
                    <p className="text-xs text-gray-600">{user.email}</p>
                </div>
                <DropdownMenuSeparator className="bg-gray-200" />
                <DropdownMenuItem
                    className="text-black hover:bg-gray-100 cursor-pointer"
                    onClick={() => router.push("/app/dashboard")}
                >
                    <UserIcon className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-black hover:bg-gray-100 cursor-pointer">
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-black hover:bg-gray-100 cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-black hover:bg-gray-100 cursor-pointer">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    <span>Help & Support</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-black hover:bg-gray-100 cursor-pointer">
                    <Moon className="mr-2 h-4 w-4" />
                    <span>Theme</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-200" />
                <DropdownMenuItem
                    className="text-red-600 hover:bg-red-50 cursor-pointer"
                    onClick={() => {
                        return signOut({
                            fetchOptions: {
                                onSuccess: () => {
                                    router.push("/signin")
                                }
                            }
                        })
                    }}
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
