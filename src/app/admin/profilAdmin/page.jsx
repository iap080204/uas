"use client";

import React, { useState, useEffect } from "react";
import NavbarAdmin from "../componenAdmin/navbar";
import SidebarAdmin from "../componenAdmin/sidebar";
import supabase from "@/app/utils/supabase";

const styles = {
  wrapper: {
    fontFamily: '"Poppins", "sans-serif"',
    display: "flex",
    height: "100vh",
    backgroundColor: "white",
  },
  sidebarWrapper: {
    width: "250px",
    backgroundColor: "#f4f4f4",
    position: "fixed",
    top: "0",
    bottom: "0",
    paddingTop: "20px",
    zIndex: 100,
  },
  mainContentWrapper: {
    marginLeft: "250px",
    padding: "2rem",
    marginTop: "4rem",
    flexGrow: 1,
  },
  navbarWrapper: {
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    zIndex: 200,
    backgroundColor: "#fff",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    marginLeft: "250px",
  },
  cardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "1.5rem",
  },
  card: {
    border: "1px solid #e2e8f0",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s ease",
  },
  cardImage: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
  },
  cardContent: {
    padding: "1rem",
  },
  cardTitle: {
    fontSize: "1.25rem",
    fontWeight: "bold",
    color: "#1c8c6c",
    marginBottom: "0.5rem",
  },
  cardDescription: {
    color: "#4a5568",
    fontSize: "0.9rem",
    marginBottom: "0.5rem",
  },
  cardPrice: {
    color: "#1c8c6c",
    fontSize: "1rem",
    fontWeight: "bold",
  },
};

export default function ProfilAdmin() {
  const [paketList, setPaketList] = useState([]);

  // Ambil data paket dari Supabase
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

  return (
    <div style={styles.wrapper}>
      {/* Navbar */}
      <div style={styles.navbarWrapper}>
        <NavbarAdmin />
      </div>

      {/* Layout dengan Sidebar */}
      <div style={{ display: "flex", flexGrow: 1, marginTop: "60px" }}>
        {/* Sidebar */}
        <div style={styles.sidebarWrapper}>
          <SidebarAdmin />
        </div>

        {/* Konten Utama */}
        <div style={styles.mainContentWrapper}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1.5rem" }}>
            Daftar Paket Laundry
          </h2>
          <div style={styles.cardContainer}>
            {paketList.map((paket) => (
              <div key={paket.id} style={styles.card}>
                <img
                  src={paket.gambarPaket || "/placeholder-image.png"}
                  alt={paket.namaPaket}
                  style={styles.cardImage}
                />
                <div style={styles.cardContent}>
                  <h3 style={styles.cardTitle}>{paket.namaPaket}</h3>
                  <p style={styles.cardDescription}>{paket.deskripsiPaket}</p>
                  <p style={styles.cardPrice}>Harga: Rp {paket.hargaPaket}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
