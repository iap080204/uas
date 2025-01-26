'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '../utils/supabase'; // Import Supabase client

export default function LaundryOrder() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    Nama_Lengkap: '',
    Nomor_Telepon: '',
    Alamat_Lengkap: '',
    Pilih_Layanan: '',
    Jumlah: 1,
  });
  const [loading, setLoading] = useState(false);

  const services = [
    { name: 'Cuci Kering', price: 8000 },
    { name: 'Setrika Aja', price: 5000 },
    { name: 'Setrika', price: 7000 },
    { name: 'Paket Express', price: 12000 },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Menambahkan pemesanan ke Supabase jika service sudah dipilih
    if (!formData.Pilih_Layanan) {
      alert('Silakan pilih layanan terlebih dahulu.');
      setLoading(false);
      return;
    }

    const totalPrice =
      formData.Pilih_Layanan &&
      services.find((service) => service.name === formData.Pilih_Layanan)?.price * formData.Jumlah;

    // Menambahkan pemesanan ke Supabase
    const { data, error } = await supabase
      .from('formulir_pemesanan')
      .insert([
        {
          Nama_Lengkap: formData.Nama_Lengkap,
          Nomor_Telepon: formData.Nomor_Telepon,
          Alamat_Lengkap: formData.Alamat_Lengkap,
          Pilih_Layanan: formData.Pilih_Layanan,
          Jumlah: formData.Jumlah,
          Total: totalPrice || 0, // Pastikan total dihitung dengan benar
        },
      ]);

    if (error) {
      console.error('Error inserting formulir_pemesanan:', error);
      alert('Pemesanan gagal, coba lagi.');
    } else {
      console.log('formulir_pemesanan submitted:', data);
      alert('Pemesanan berhasil!');
      router.push('/informasi'); // Redirect to the confirmation page
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6">Formulir Pemesanan Laundry</h2>

        <form onSubmit={handleSubmit}>
          {/* Form Inputs (Nama, Nomor Telepon, Alamat, Layanan, Jumlah, dll) */}
          <div className="mb-4">
            <label htmlFor="Nama_Lengkap" className="block text-gray-700 font-medium mb-2">
              Nama Lengkap
            </label>
            <input
              type="text"
              id="Nama_Lengkap"
              name="Nama_Lengkap"
              value={formData.Nama_Lengkap}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label htmlFor="Nomor_Telepon" className="block text-gray-700 font-medium mb-2">
              Nomor Telepon
            </label>
            <input
              type="tel"
              id="Nomor_Telepon"
              name="Nomor_Telepon"
              value={formData.Nomor_Telepon}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Address */}
          <div className="mb-4">
            <label htmlFor="Alamat_Lengkap" className="block text-gray-700 font-medium mb-2">
              Alamat Lengkap
            </label>
            <textarea
              id="Alamat_Lengkap"
              name="Alamat_Lengkap"
              value={formData.Alamat_Lengkap}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              required
            ></textarea>
          </div>

          {/* Service */}
          <div className="mb-4">
            <label htmlFor="Pilih_Layanan" className="block text-gray-700 font-medium mb-2">
              Pilih Layanan
            </label>
            <select
              id="Pilih_Layanan"
              name="Pilih_Layanan"
              value={formData.Pilih_Layanan}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">-- Pilih Layanan --</option>
              {services.map((service, index) => (
                <option key={index} value={service.name}>
                  {service.name} - Rp {service.price.toLocaleString()}/kg
                </option>
              ))}
            </select>
          </div>

          {/* Quantity */}
          <div className="mb-4">
            <label htmlFor="Jumlah" className="block text-gray-700 font-medium mb-2">
              Jumlah (kg)
            </label>
            <input
              type="number"
              id="Jumlah"
              name="Jumlah"
              value={formData.Jumlah}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="1"
              required
            />
          </div>

          {/* Total Price */}
          <div className="mb-6">
            <p className="text-gray-700 font-medium">
              Total Harga: Rp{' '}
              {formData.Pilih_Layanan
                ? (
                    services.find((service) => service.name === formData.Pilih_Layanan).price *
                    formData.Jumlah
                  ).toLocaleString()
                : '0'}
            </p>
          </div>

          {/* Image */}
          <div className="mb-6">
          <label htmlFor="Metode" className="block text-gray-700 font-medium mb-2">
              Metode Pembayaran
            </label>
            <img
              src="https://res.cloudinary.com/dsxte6o6s/image/upload/v1737124972/WhatsApp_Image_2025-01-17_at_17.16.51_6cc3f1cd_qmvlsr.jpg"
              alt="Laundry Service Illustration"
              className="w-1/2 mx-auto rounded-lg"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            {loading ? 'Memproses...' : 'Pesan Sekarang'}
          </button>
        </form>
      </div>
    </div>
  );
}
