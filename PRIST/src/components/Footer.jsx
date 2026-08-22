function Footer() {
    return (
        <footer id="contact" className="border-t border-white/10 bg-[#07111f] py-14">
            <div className="mx-auto max-w-7xl px-6">
                <div className="grid gap-10 md:grid-cols-4">
                    <div className="md:col-span-2">
                        <div className="text-xl font-bold">
                            PRISTINE <span className="text-[#ef4b4b]">ENERGY</span>
                        </div>
                        <p className="mt-4 max-w-md text-sm leading-7 text-slate-500">
                            Smart solar energy solutions built for Kerala homes, businesses
                            and industries.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-mono text-xs tracking-widest text-slate-500">
                            NAVIGATE
                        </h4>
                        <div className="mt-5 space-y-3 text-sm text-slate-400">
                            <a href="#home" className="block hover:text-[#ffe36e]">Home</a>
                            <a href="#impact" className="block hover:text-[#ffe36e]">Impact</a>
                            <a href="#solutions" className="block hover:text-[#ffe36e]">Solutions</a>
                            <a href="#contact" className="block hover:text-[#ffe36e]">Contact</a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-mono text-xs tracking-widest text-slate-500">
                            CONTACT
                        </h4>
                        <div className="mt-5 space-y-3 text-sm text-slate-400">
                            <p>+91 90000 00000</p>
                            <p>hello@pristineenergys.in</p>
                            <p>Kerala, India</p>
                        </div>
                    </div>
                </div>

                <div className="mt-12 flex flex-col justify-between gap-3 border-t border-white/10 pt-6 text-xs text-slate-600 md:flex-row">
                    <span>© 2026 PRISTINE ENERGY. All rights reserved.</span>
                    <span className="font-['Cormorant_Garamond'] text-sm font-semibold tracking-[1.5px] text-[#0099cc]">
                        Winshine Infotech.
                    </span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;