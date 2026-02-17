import { Github, Youtube, Twitter } from "lucide-react";

export function Footer() {

  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-sm opacity-70">© 2026 FlixNet. All rights reserved.</span>
        <div className="flex gap-4">
          <a href="#" className="hover:text-indigo-400 transition">
            <Github size={20} />
          </a>
          <a href="#" className="hover:text-red-500 transition">
            <Youtube size={20} />
          </a>
          <a href="#" className="hover:text-blue-400 transition">
            <Twitter size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;