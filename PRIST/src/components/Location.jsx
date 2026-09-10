import React from "react";
import { MapPin, ExternalLink } from "lucide-react";

const GOOGLE_MAPS_URL =
  "https://maps.app.goo.gl/bEZxjXeGzbyHCmmQ7?g_st=aw";

const Location = () => {
  return (
    <section className="w-full py-16 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <p className="text-sm font-bold uppercase tracking-[3px] text-[#004B87]">
            Visit Us
          </p>

          <h2 className="mt-2 text-3xl font-black text-slate-900 sm:text-4xl">
            Our Location
          </h2>

          <p className="mt-3 text-slate-500">
            Find Pristine Energy on Google Maps
          </p>
        </div>

        <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl bg-white shadow-lg border border-slate-200">
          
          {/* Map Area */}
          <div className="relative h-[300px] bg-slate-200 sm:h-[400px]">
            <iframe
              title="Pristine Energy Location"
              src="https://www.google.com/maps?q=TATA+Power+Solar+-+Pristine+Energy,+Velliparamba,+Kozhikode,+Kerala+673008&output=embed"
              className="h-full w-full border-0"
              loading="lazy"
              allowFullScreen
            />
          </div>

          {/* Location Details */}
          <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#004B87]/10">
                <MapPin className="h-6 w-6 text-[#004B87]" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Pristine Energy
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  TATA Power Solar – Pristine Energy
                  <br />
                  Velliparamba, Kozhikode, Kerala 673008
                </p>
              </div>
            </div>

            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#004B87] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#00365f]"
            >
              <MapPin className="h-4 w-4" />
              Get Directions
              <ExternalLink className="h-4 w-4" />
            </a>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;