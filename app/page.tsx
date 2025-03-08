import { PackageShowcase } from "@/components/package-showcase"
import { HeroSection } from "@/components/hero-section"
import { FeaturedPackages } from "@/components/featured-packages"
import { CategorySection } from "@/components/category-section"
import { PackageSearch } from "@/components/package-search"
import { Newsletter } from "@/components/newsletter"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <HeroSection />
      <FeaturedPackages />
      <CategorySection />
      <PackageShowcase />
      <PackageSearch />
      <Newsletter />
      <Footer />
    </div>
  )
}

