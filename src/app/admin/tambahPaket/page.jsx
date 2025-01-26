"use client";

import { useState, useEffect } from "react";
import supabase from "@/app/utils/supabase";
import NavbarAdmin from "../componenAdmin/navbar";
import SidebarAdmin from "../componenAdmin/sidebar";
import { CldUploadWidget } from "next-cloudinary";

export default function FormTambahPaket() {
  const [formData, setFormData] = useState({
    id: null,
    namaPaket: "",
    deskripsiPaket: "",
    hargaPaket: "",
    gambarPaket: "",
  });
  const [paketList, setPaketList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  // Ambil data paket
  const ambilPaket = async () => {
    const { data: paket, error } = await supabase
      .from("paket")
      .select()
      .order("id", { ascending: true });

    if (error) {
      console.error("Gagal memuat paket:", error.message);
    } else {
      setPaketList(paket);
    }
  };

  useEffect(() => {
    ambilPaket();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id, ...paketData } = formData;
    const query = isEditing
      ? supabase.from("paket").update(paketData).eq("id", id)
      : supabase.from("paket").insert([paketData]);

    const { error } = await query;
    if (error) {
      console.error(`Gagal ${isEditing ? "mengupdate" : "menambahkan"} paket:`, error.message);
    } else {
      ambilPaket();
      resetForm();
      setIsEditing(false);
    }
  };

  const resetForm = () => {
    setFormData({
      id: null,
      namaPaket: "",
      deskripsiPaket: "",
      hargaPaket: "",
      gambarPaket: "",
    });
  };

  const handleEdit = (paket) => {
    setFormData(paket);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus paket ini?")) {
      const { error } = await supabase.from("paket").delete().eq("id", id);
      if (error) {
        console.error("Gagal menghapus paket:", error.message);
      } else {
        ambilPaket();
      }
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="flex pt-16">
      </div>
      <div className="flex">
      <NavbarAdmin />
      <SidebarAdmin />
        <main className="w-3/4 p-6 bg-white shadow-md rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-6 p-6 rounded-lg shadow-lg bg-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800">
              {isEditing ? "Edit Paket" : "Tambah Paket"}
            </h2>
            <div className="space-y-4">
              <InputField
                label="Nama Paket"
                name="namaPaket"
                value={formData.namaPaket}
                onChange={handleChange}
              />
              <TextareaField
                label="Deskripsi Paket"
                name="deskripsiPaket"
                value={formData.deskripsiPaket}
                onChange={handleChange}
              />
              <InputField
                label="Harga Paket"
                name="hargaPaket"
                type="number"
                value={formData.hargaPaket}
                onChange={handleChange}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700">Foto Paket</label>
                <CldUploadWidget
                  uploadPreset="vgn1s18s"
                  onSuccess={(result) =>
                    setFormData((prev) => ({ ...prev, gambarPaket: result.info.secure_url }))
                  }
                >
                  {({ open }) => (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        open();
                      }}
                      className="w-full py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                    >
                      Upload Foto
                    </button>
                  )}
                </CldUploadWidget>
              </div>
              <button
                type="submit"
                className="w-full py-3 text-white bg-green-500 rounded-lg hover:bg-green-600"
              >
                {isEditing ? "Update Paket" : "Tambah Paket"}
              </button>
            </div>
          </form>

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Daftar Paket</h2>
            <ul className="space-y-4">
              {paketList.map((paket) => (
                <li
                  key={paket.id}
                  className="flex justify-between items-center p-4 border rounded-lg bg-white shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center space-x-4">
                    {paket.gambarPaket ? (
                      <img
                        src={paket.gambarPaket}
                        alt={paket.namaPaket}
                        className="w-16 h-16 rounded-full"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500 text-sm">No Image</span>
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-gray-800">{paket.namaPaket}</p>
                      <p className="text-sm text-gray-600">{paket.deskripsiPaket}</p>
                      <p className="text-sm text-gray-600">Harga: {paket.hargaPaket}</p>
                    </div>
                  </div>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleEdit(paket)}
                      className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(paket.id)}
                      className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
                    >
                      Hapus
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
}

function InputField({ label, name, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-3 border rounded-lg bg-white text-gray-700"
        required
      />
    </div>
  );
}

function TextareaField({ label, name, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-3 border rounded-lg bg-white text-gray-700"
        required
      ></textarea>
    </div>
  );
}
