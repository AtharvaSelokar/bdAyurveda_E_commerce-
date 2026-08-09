import Container from "./Container";
import {
  Phone,
  Mail,
  MapPin,
  Globe,
  ExternalLink,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1F3527] text-white">

      <Container>

        <div className="grid grid-cols-1 gap-10 py-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}

          <div>

            <h2 className="text-2xl font-bold tracking-wide">
              BD Ayurved
            </h2>

            <p className="mt-4 text-sm leading-7 text-gray-300">
              Premium Ayurvedic wellness products crafted with trusted herbs,
              modern quality standards and generations of care.
            </p>

          </div>

          {/* Products */}

          <div>

            <h3 className="text-lg font-semibold">
              Products
            </h3>

            <ul className="mt-4 space-y-2 text-sm text-gray-300">

              <li>
                <a href="#products" className="hover:text-white transition">
                  Hair Oil
                </a>
              </li>

              <li>
                <a href="#products" className="hover:text-white transition">
                  Hair Serum
                </a>
              </li>

              <li>
                <a href="#products" className="hover:text-white transition">
                  Pneumona Powder
                </a>
              </li>

              <li>
                <a href="#products" className="hover:text-white transition">
                  Age Revert Pro
                </a>
              </li>

              <li>
                <a href="#products" className="hover:text-white transition">
                  Ashtavardhak Syrup
                </a>
              </li>

            </ul>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="text-lg font-semibold">
              Quick Links
            </h3>

            <ul className="mt-4 space-y-2 text-sm text-gray-300">

              <li>
                <a href="#products" className="hover:text-white transition">
                  Products
                </a>
              </li>

              <li>
                <a href="#story" className="hover:text-white transition">
                  Our Story
                </a>
              </li>

              <li>
                <a href="#reviews" className="hover:text-white transition">
                  Reviews
                </a>
              </li>

              <li>
                <a href="#faq" className="hover:text-white transition">
                  FAQ
                </a>
              </li>

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-lg font-semibold">
              Contact
            </h3>

            <div className="mt-4 space-y-4 text-sm text-gray-300">

              <div className="flex items-center gap-3">
                <Phone size={18} />
                <span>+91 XXXXX XXXXX</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={18} />
                <span>support@bdayurved.com</span>
              </div>

              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5" />
                <span>Nagpur, Maharashtra</span>
              </div>

              <div className="flex gap-4 pt-2">

                <a
                  href="#"
                  className="rounded-full bg-white/10 p-2 transition hover:bg-white hover:text-[#1F3527]"
                >
                  <Globe size={18} />
                </a>

                <a
                  href="#"
                  className="rounded-full bg-white/10 p-2 transition hover:bg-white hover:text-[#1F3527]"
                >
                  <ExternalLink size={18} />
                </a>

              </div>

            </div>

          </div>

        </div>

      </Container>

      <div className="border-t border-white/10">

        <Container>

          <div className="flex flex-col items-center justify-between gap-2 py-5 text-center text-xs text-gray-400 md:flex-row">

            <p>
              © 2026 BD Ayurved. All Rights Reserved.
            </p>

            <p>
              Made with ❤️ in India
            </p>

          </div>

        </Container>

      </div>

    </footer>
  );
}