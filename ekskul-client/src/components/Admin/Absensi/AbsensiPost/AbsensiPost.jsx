import Table from "./Table";

const AbsensiPostComponent = () => {
  const date = new Date();

  return (
    <div className="w-full h-full bg-transparent p-[20px]">
      <div className="w-full flex flex-col gap-2">
        <div className="flex justify-between">
          <h1 className="text-black text-2xl font-bold font-poppins capitalize opacity-60">
            Absensi
          </h1>
        </div>
        <div className="w-full bg-white mt-3 mb-5">
          <Table date={date.toLocaleDateString({ timeZone: "Asia/Jakarta" })} />
        </div>
      </div>
    </div>
  );
};

export default AbsensiPostComponent;
