import React from "react";
import { Facebook, Twitter, Youtube, Instagram, Twitch } from "lucide-react";

const FooterLinks = ({ title, links }) => (
  <div>
    <h4 className="text-[13px] font-semibold text-white mb-3">{title}</h4>
    <ul className="space-y-2">
      {links.map((l) => (
        <li key={l}>
          <a href="#" className="text-[12px] text-[#8a8a8e] hover:text-white transition-colors">
            {l}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const PokeballSmall = () => (
  <svg width="32" height="32" viewBox="0 0 32 32">
    <circle cx="16" cy="16" r="15" fill="#ffffff" stroke="#0b0b0e" strokeWidth="2" />
    <path d="M1.5 16 A14.5 14.5 0 0 1 30.5 16 Z" fill="#ee1515" stroke="#0b0b0e" strokeWidth="2" />
    <line x1="1.5" y1="16" x2="30.5" y2="16" stroke="#0b0b0e" strokeWidth="2" />
    <circle cx="16" cy="16" r="4" fill="#ffffff" stroke="#0b0b0e" strokeWidth="2" />
    <circle cx="16" cy="16" r="1.6" fill="#0b0b0e" />
  </svg>
);

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-[#1a1a1e] bg-[#0b0b0e]">
      <div className="px-4 lg:px-10 py-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
        <div className="col-span-2">
          <div className="flex items-center gap-2">
            <PokeballSmall />
            <span className="text-white text-sm font-semibold">Poké<span className="text-[#ffcb05]">Store</span></span>
          </div>
          <p className="text-[12px] text-[#8a8a8e] mt-3 max-w-sm leading-relaxed">
            © 2025, PokéStore. Todos os direitos reservados. Pokémon e todos os personagens relacionados são marcas registradas da Nintendo, Game Freak e The Pokémon Company. Este é um projeto fictício de demonstração.
          </p>
          <div className="flex items-center gap-3 mt-5">
            {[Facebook, Twitter, Instagram, Youtube, Twitch].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 rounded-full bg-[#1a1a1e] hover:bg-[#26262a] transition-colors flex items-center justify-center">
                <Icon className="w-4 h-4 text-[#c6c6ca]" />
              </a>
            ))}
          </div>
        </div>
        <FooterLinks title="Loja" links={["Booster Packs", "Booster Box", "Elite Trainer Box", "Cartas Avulsas", "Decks Prontos", "Acessórios", "Promo Cards"]} />
        <FooterLinks title="Coleções" links={["Scarlet & Violet", "Paldea Evolved", "Obsidian Flames", "151", "Paradox Rift", "Twilight Masquerade", "Stellar Crown"]} />
        <FooterLinks title="Ajuda" links={["Meus Pedidos", "Trocas e Devoluções", "Frete e Entrega", "Formas de Pagamento", "Fale Conosco", "Certificação PSA"]} />
        <FooterLinks title="Comunidade" links={["Torneios", "Ligas Locais", "Guia de Iniciantes", "Blog", "Discord", "Programa Colecionador"]} />
      </div>

      <div className="border-t border-[#1a1a1e] px-4 lg:px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-4 text-[11px] text-[#8a8a8e]">
          <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
          <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
          <a href="#" className="hover:text-white transition-colors">Política de Reembolso</a>
        </div>
        <div className="text-[11px] text-[#8a8a8e]">Português (BR)</div>
      </div>
    </footer>
  );
};

export default Footer;
