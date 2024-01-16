import React from "react";
import wk2 from "../../../assets/Rectangle 39.png";

const Jumbotron = () => {
  return (
    <div
      id="home"
      className="w-full image-cerita relative flex flex-col justify-center gap-[5px] items-center h-[60dvh]"
    >
      <h1 className="text-5xl font-bold text-white uppercase text-shadow-md">
        Absensi Ekstrakurikuler
      </h1>
      <p className="max-w-[700px] text-center text-white text-shadow-md">
        Selamat datang di era pendidikan yang penuh inovasi dan dinamika, di
        mana setiap siswa di SMK Wikrama Bogor memiliki kesempatan untuk tumbuh
        dan berkembang melalui berbagai kegiatan ekstrakurikuler yang membentuk
        karakter dan kompetensi mereka.
      </p>
    </div>
  );
};

export default Jumbotron;
