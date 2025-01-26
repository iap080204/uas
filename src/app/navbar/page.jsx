'use client';

import { useRouter } from "next/navigation";

export default function LaundryHome() {
  const router = useRouter();

  return (
    <div className="w-full bg-gray-100">
      {/* Navbar */}
      <nav className="bg-yellow-100 shadow-md fixed w-full z-10 top-0">
      <div className="container px-6 py-4 flex justify-between items-center">
          <img
            src="https://res.cloudinary.com/dsxte6o6s/image/upload/v1736059252/foto5_drbzgu.png"
            alt="Laundry Service Logo"
            className="h-8 w-auto"
          />
          <div className="text-xl font-bold text-blue-600 cursor-pointer text-left flex-1">
            Laundry Service
          </div>
          <ul className="flex space-x-6 font-bold text-gray-700">
            <li className="cursor-pointer hover:text-blue-500 px-2 py-2" onClick={() => router.push("#")}>Beranda</li>
            <li className="cursor-pointer hover:text-blue-500 px-2 py-2" onClick={() => router.push("#about")}>Tentang</li>
            <li className="cursor-pointer hover:text-blue-500 px-2 py-2" onClick={() => router.push("#services")}>Paket Laundry</li>
            <li className="cursor-pointer hover:text-blue-500 px-2 py-2" onClick={() => router.push("/informasi")}>Informasi Pesanan</li>
            <li>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => {alert("Logout berhasil!")
                  router.push("/")}}>
                Logout
              </button>
          </li>
          </ul>
        </div>
      </nav>
      {/* Banner */}
      <div
        className="relative h-screen w-full bg-cover bg-center pt-16"
        style={{
          backgroundImage: "url('https://res.cloudinary.com/dsxte6o6s/image/upload/v1735999982/background_laundry_povn2b.jpg')",
        }}>     
      </div>

        {/* About Section */}
        <section id="about" className="py-16 px-6 bg-white">
          <h2 className="text-3xl font-bold text-center mb-8"> Tentang Kami </h2>
          <img
            src="https://res.cloudinary.com/dsxte6o6s/image/upload/v1735999984/laundry1_gyw7zg.jpg"
            alt="Service 2"
            className="w-full max-w-md h-100 object-cover rounded-md mx-auto"
          />
          <p className="text-center text-gray-700 max-w-2xl mx-auto mt-8">
            Selamat datang di website kami! Kami adalah penyedia layanan laundry profesional yang mengutamakan kualitas, 
            kebersihan, dan kepuasan pelanggan. Dengan teknologi modern dan bahan ramah lingkungan, kami memastikan pakaian 
            Anda terawat dengan baik.
          </p>
          <p className="text-center text-gray-700 max-w-2xl mx-auto mt-8">
            Kami ingin memberikan pengalaman terbaik untuk pelanggan kami dengan layanan yang cepat, terjangkau, dan berkualitas. 
            Hubungi kami sekarang untuk kebutuhan laundry Anda!
          </p>
        </section>
        
      {/* Additional Services */}
        <section id="services" className="py-16 px-6 bg-white">
          <h3 className="text-2xl font-bold text-center mt-auto">Layanan Tambahan</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-5">
            {/* Cuci Kering */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://res.cloudinary.com/dsxte6o6s/image/upload/v1736224022/Can-You-Put-Mesh-Laundry-Bags-in-the-Dryer-768x512_xypt4x.jpg"
                alt="Cuci Kering"
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">Cuci Kering - Rp 8.000</h3>
                <p className="text-gray-600 mt-2">Layanan cuci kering untuk pakaian Anda dengan proses cepat dan higienis.</p>
                <button
                  className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  onClick={() => router.push("/pemesanan")}
                >
                  Pesan Sekarang
                </button>
              </div>
            </div>
            {/* Setrika Aja */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://res.cloudinary.com/dsxte6o6s/image/upload/v1736063561/195741983_m_normal_none-1200x780_tkvrh5.jpg"
                alt="Setrika Aja"
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">Setrika Aja - Rp 5.000</h3>
                <p className="text-gray-600 mt-2">Layanan setrika saja untuk memastikan pakaian Anda tetap rapi dan wangi.</p>
                <button
                  className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  onClick={() => router.push("/pemesanan")}
                >
                  Pesan Sekarang
                </button>
              </div>
            </div>
            {/* Setrika */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://res.cloudinary.com/dsxte6o6s/image/upload/v1736224022/Can-You-Put-Mesh-Laundry-Bags-in-the-Dryer-768x512_xypt4x.jpg"
                alt="Setrika"
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold"> Cuci Setrika - Rp 7.000</h3>
                <p className="text-gray-600 mt-2">Pilihan layanan mencuci dan setrika untuk pakaian sehari-hari Anda.</p>
                <button
                  className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  onClick={() => router.push("/pemesanan")}
                >
                  Pesan Sekarang
                </button>
              </div>
            </div>
            {/* Paket Express */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://res.cloudinary.com/dsxte6o6s/image/upload/v1736063560/mesin-lipat-dan-setrika-otomatis_ygjigf.jpg  "
                alt="Paket Express"
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">Paket Express - Rp 12.000</h3>
                <p className="text-gray-600 mt-2">
                  Layanan laundry express untuk Anda yang membutuhkan hasil cepat dan berkualitas.
                </p>
                <button
                  className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  onClick={() => router.push("/pemesanan")}
                >
                  Pesan Sekarang
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto text-center">
          <p className="text-sm">
      © {new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })} Laundry Service. All rights reserved.
    </p>
          <div className="mt-4 flex justify-center space-x-4">
          <a
            href="https://wa.me/62895367749028?text=Halo%20saya%20ingin%20menanyakan%20layanan%20laundry"
            className="text-gray-400 hover:text-white transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
          <a
            href="https://www.instagram.com/nblaapra"
            className="text-gray-400 hover:text-white transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
