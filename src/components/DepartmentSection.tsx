import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const departmentsData = [
  {
    name: "Departemen PSDM",
    desc: "Pengembangan Sumber Daya Mahasiswa",
    image: "/images/psdm/PSDM.webp",
    route: "/psdm",
  },
  {
    name: "Departemen Kastrat",
    desc: "Kajian & Aksi Strategis",
    image: "/images/kastrat/KASTRAT.webp",
    route: "/kastrat",
  },
  {
    name: "Departemen Adkesma",
    desc: "Advokasi & Kesejahteraan Mahasiswa",
    image: "/images/adkesma/ADKESMA.webp",
    route: "/adkesma",
  },
  {
    name: "Departemen Humas",
    desc: "Hubungan Masyarakat & Eksternal",
    image: "/images/humas/HUMAS.webp",
    route: "/humas",
  },
  {
    name: "Departemen Medinfo",
    desc: "Media, Data & Informasi",
    image: "/images/medinfo/MEDINFO.webp",
    route: "/medinfo",
  },
];

export default function DepartmentSection() {
  return (
    <section
      id="departemen"
      className="mx-auto max-w-7xl px-5 pb-20 pt-4 lg:px-8"
    >
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h2 className="text-3xl font-black uppercase tracking-wider text-amber-500 sm:text-4xl">
          Departemen
        </h2>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-8">
        {departmentsData.map((dept, index) => {
          const cardContent = (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group flex flex-col overflow-hidden rounded-2xl border border-amber-200/80 bg-white/90 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.35rem)] max-w-sm${
                dept.route ? " cursor-pointer" : ""
              }`}
            >
              {/* CONTAINER GAMBAR */}
              <div className="relative h-[320px] w-full overflow-hidden bg-slate-100 sm:h-[360px]">
                <img
                  src={dept.image}
                  alt={dept.name}
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 sm:text-xl">
                    {dept.name}
                  </h3>
                  <p className="mt-1 text-xs font-medium text-slate-600 sm:text-sm">
                    {dept.desc}
                  </p>
                </div>

                <div className="mt-4 border-t border-slate-200/85 pt-3">
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold sm:text-sm ${
                      dept.route
                        ? "text-amber-600 group-hover:underline"
                        : "text-slate-400"
                    }`}
                  >
                    <span>
                      {dept.route ? "Selengkapnya" : "Segera Hadir"}
                    </span>
                    {dept.route && <ArrowRight size={15} />}
                  </span>
                </div>
              </div>
            </motion.div>
          );

          return dept.route ? (
            <Link key={index} to={dept.route} className="contents">
              {cardContent}
            </Link>
          ) : (
            <div key={index} className="contents">
              {cardContent}
            </div>
          );
        })}
      </div>
    </section>
  );
}
