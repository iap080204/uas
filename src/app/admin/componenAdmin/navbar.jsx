'use client';

import { useRouter } from "next/navigation";

export default function NavbarAdmin() {
  const router = useRouter();

  return (
    <nav className="bg-yellow-100 shadow-md fixed w-full p-1 top-0 z-50">
      <div className="container px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <img
          src="https://res.cloudinary.com/dsxte6o6s/image/upload/v1736059252/foto5_drbzgu.png"
          alt="Laundry Service Logo"
          className="h-16 w-auto"
        />
        {/* Nama Brand */}
        <div className="text-xl font-bold text-purple-600 cursor-pointer text-left flex-1">
          Laundry Fragrant
        </div>
        {/* Navigasi */}
        <ul className="flex items-center space-x-6 font-bold text-gray-700">
          {/* Ikon Profil */}
          <li className="relative flex items-center">
            <div
              className="cursor-pointer flex items-center"
              onClick={() => router.push("/admin/profilAdmin")}
            >
              <img
                src="https://res.cloudinary.com/dsxte6o6s/image/upload/v1736063560/user-avatar-placeholder.png"
                alt="Profil Admin"
                className="w-10 h-10 rounded-full object-cover border-2 border-purple-600"
              />
              <span className="ml-2 text-purple-600 font-medium">Admin</span>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}
