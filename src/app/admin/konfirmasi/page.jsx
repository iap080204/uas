'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/app/utils/supabase/client';

export default function AdminOrderPage() {
  const [orders, setOrders] = useState([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from('formulir_pemesanan')
        .select('*')
        .in("status", ["Belum Selesai"]);

      if (error) {
        console.error('Error fetching orders:', error);
      } else {
        setOrders(data);
      }
    };

    fetchOrders();
  }, [supabase]);

  const handleConfirmCompletion = async (orderToConfirm) => {
    const { error } = await supabase
      .from('formulir_pemesanan')
      .update({ status: 'selesai' }) // Update status to 'selesai'
      .eq('id', orderToConfirm);

    if (error) {
      console.error("Error confirming completion:", error.message);
    } else {
      alert("Pesanan berhasil dikonfirmasi!");
      setOrders(orders.filter((order) => order.id !== orderToConfirm)); // Remove completed order from state
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Admin - Daftar Pemesanan Laundry
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.length === 0 ? (
            <div className="col-span-3 text-center text-gray-500">No orders found.</div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="bg-white shadow-lg rounded-lg p-6 flex flex-col"
                style={{
                  borderColor: order.status === "Belum Selesai" ? "blue" : "green",
                }}
              >
                <h3 className="text-xl font-semibold text-blue-600 mb-4">
                  {order.Nama_Lengkap}
                </h3>
                <p className="text-gray-700 mb-2">
                  <strong>Nomor Telepon:</strong> {order.Nomor_Telepon}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Alamat:</strong> {order.Alamat_Lengkap}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Layanan:</strong> {order.Pilih_Layanan}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Jumlah (kg):</strong> {order.Jumlah}
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>Total:</strong> Rp {order.Total.toLocaleString()}
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>Status:</strong> {order.status}
                </p>

                <div className="mt-auto flex justify-between items-center">
                  {order.status === 'Belum Selesai' && (
                    <button
                      onClick={() => handleConfirmCompletion(order.id)}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                    >
                      Konfirmasi Selesai
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
