
import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";
import Logo from "./Logo";
import { useIsMobile } from "../hooks/use-mobile";

const Navigation = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <Logo />
              {!isMobile && (
                <span className="ml-2 text-xl font-semibold text-gray-900">
                  Hardimans
                </span>
              )}
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            <Link
              to="/"
              className="text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium"
            >
              {t("nav.home")}
            </Link>
            <Link
              to="/work"
              className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium"
            >
              Work
            </Link>
            <a
              href="#about"
              className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium"
            >
              {t("nav.services")}
            </a>
            <a
              href="#portfolio"
              className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium"
            >
              {t("portfolio")}
            </a>
            <a
              href="#contact"
              className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium"
            >
              {t("nav.contact")}
            </a>
          </div>
          <div className="flex items-center">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
