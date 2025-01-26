import { useRouter } from "next/navigation";

export default function Paketlaundri() {
  const router = useRouter();

  const services = [
    {
      name: "Cuci Kering",
      description: "Layanan cuci kering untuk pakaian Anda dengan proses cepat dan higienis.",
      image: "https://res.cloudinary.com/dsxte6o6s/image/upload/v1736224022/Can-You-Put-Mesh-Laundry-Bags-in-the-Dryer-768x512_xypt4x.jpg",
      price: 8.000,
      link: "/pemesanan",
    },
    {
      name: "Setrika Aja",
      description: "Layanan setrika saja untuk memastikan pakaian Anda tetap rapi dan wangi.",
      image: "https://res.cloudinary.com/dsxte6o6s/image/upload/v1735999984/setrikaja_krcsaz.jpg",
      price: 5.000,
      link: "/pemesanan",
    },
    {
      name: "Cuci dan Setrika",
      description: "Pilihan layanan setrika untuk pakaian sehari-hari Anda.",
      image: "https://res.cloudinary.com/dsxte6o6s/image/upload/v1735999984/cucissetrika_o0j0iq.jpg",
      price: 7.000,
      link: "/pemesanan",
    },
    {
      name: "Paket Express",
      description: "Layanan laundry express untuk Anda yang membutuhkan hasil cepat dan berkualitas.",
      image: "https://res.cloudinary.com/dsxte6o6s/image/upload/v1735999981/cuciexpress_pm0ly0.jpg",
      price: 12.000,
      link: "/pemesanan",
    },
  ];

  return (
    <>
      <section id="services" className="py-16 px-6 bg-white">
        <h3 className="text-2xl font-bold text-center mt-12">Layanan Tambahan</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={service.image}
                alt={service.name}
                className="h-48 w-full object-cover"
                onError={(e) => (e.target.src = "/default-image.jpg")} // Fallback image
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{service.name}</h3>
                <p className="text-gray-600 mt-2">{service.description}</p>
                <button
                  className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  onClick={() => router.push(service.link)}
                >
                  Harga: Rp {service.price.toLocaleString()} - Pesan Sekarang
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
