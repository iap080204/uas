'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '../utils/supabase'; // Import Supabase client

export default function OrderList() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('formulir_pemesanan')
        .select('*');

      if (error) {
        throw error;
      }

      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      alert('Gagal mengambil data pesanan');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8 relative">
        <button
          className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => router.push("/navbar")}
        >
          Home
        </button>
        <h2 className="text-2xl font-bold mb-6">Daftar Hasil Pemesanan</h2>
        <button
          onClick={fetchOrders}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-6"
        >
          Tampilkan Pesanan
        </button>

        {orders.length === 0 ? (
          <p className="text-gray-700">Klik Tombol Diatas!</p>
        ) : (
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-200 px-4 py-2">Nama</th>
                <th className="border border-gray-200 px-4 py-2">Alamat</th>
                <th className="border border-gray-200 px-4 py-2">Layanan</th>
                <th className="border border-gray-200 px-4 py-2">Jumlah (kg)</th>
                <th className="border border-gray-200 px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-200 px-4 py-2">{order.Nama_Lengkap}</td>
                  <td className="border border-gray-200 px-4 py-2">{order.Alamat_Lengkap}</td>
                  <td className="border border-gray-200 px-4 py-2">{order.Pilih_Layanan}</td>
                  <td className="border border-gray-200 px-4 py-2">{order.Jumlah}</td>
                  <td className="border border-gray-200 px-4 py-2">{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
