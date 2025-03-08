"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ArrowUpRight, Heart, Download } from "lucide-react"
import Link from "next/link"

const featuredPackages = [
  {
    id: 1,
    name: "flutter_bloc",
    description: "State management library that helps implement the BLoC pattern",
    stars: 4328,
    likes: 987,
    downloads: "2.4M",
    tags: ["state-management", "popular"],
    color: "from-blue-600 to-blue-400",
    url: "#flutter_bloc",
  },
  {
    id: 2,
    name: "provider",
    description: "A wrapper around InheritedWidget to make them easier to use and more reusable",
    stars: 3982,
    likes: 876,
    downloads: "5.7M",
    tags: ["state-management", "official"],
    color: "from-purple-600 to-purple-400",
    url: "#provider",
  },
  {
    id: 3,
    name: "get",
    description: "State management, intelligent dependency injection, and route management",
    stars: 3654,
    likes: 743,
    downloads: "1.9M",
    tags: ["state-management", "routing"],
    color: "from-green-600 to-green-400",
    url: "#get",
  },
  {
    id: 4,
    name: "flutter_riverpod",
    description: "A simple way to access state while robust and testable",
    stars: 2987,
    likes: 654,
    downloads: "1.2M",
    tags: ["state-management", "trending"],
    color: "from-red-600 to-red-400",
    url: "#riverpod",
  },
  {
    id: 5,
    name: "dio",
    description: "A powerful HTTP client for Dart/Flutter with interceptors, FormData, and more",
    stars: 3245,
    likes: 712,
    downloads: "3.8M",
    tags: ["networking", "popular"],
    color: "from-yellow-600 to-yellow-400",
    url: "#dio",
  },
  {
    id: 6,
    name: "flutter_hooks",
    description: "React-like hooks for Flutter state management and side-effects",
    stars: 2156,
    likes: 543,
    downloads: "1.5M",
    tags: ["state-management", "hooks"],
    color: "from-indigo-600 to-indigo-400",
    url: "#flutter_hooks",
  },
  {
    id: 7,
    name: "cached_network_image",
    description: "Flutter library to load and cache network images with placeholder and error widgets",
    stars: 2876,
    likes: 621,
    downloads: "4.2M",
    tags: ["images", "caching"],
    color: "from-pink-600 to-pink-400",
    url: "#cached_network_image",
  },
  {
    id: 8,
    name: "hive",
    description: "Lightweight and blazing fast key-value database written in pure Dart",
    stars: 2543,
    likes: 598,
    downloads: "2.1M",
    tags: ["database", "storage"],
    color: "from-cyan-600 to-cyan-400",
    url: "#hive",
  },
]

export function FeaturedPackages() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Packages</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            These popular packages are essential for modern Flutter development, helping you build robust applications
            faster.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {featuredPackages.map((pkg) => (
            <motion.div key={pkg.id} variants={itemVariants}>
              <Card className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-all duration-300 h-full overflow-hidden group">
                <div className={`h-2 bg-gradient-to-r ${pkg.color}`}></div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl font-mono text-white group-hover:text-blue-400 transition-colors">
                      {pkg.name}
                    </CardTitle>
                    <div className="flex items-center space-x-1 text-yellow-400">
                      <Star className="h-4 w-4 fill-yellow-400" />
                      <span className="text-sm">{pkg.stars}</span>
                    </div>
                  </div>
                  <CardDescription className="text-gray-400">{pkg.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {pkg.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="bg-gray-800 text-gray-300 border-gray-700">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t border-gray-800 pt-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <div className="flex items-center">
                      <Heart className="h-4 w-4 mr-1 text-red-400" />
                      <span>{pkg.likes}</span>
                    </div>
                    <div className="flex items-center">
                      <Download className="h-4 w-4 mr-1 text-green-400" />
                      <span>{pkg.downloads}</span>
                    </div>
                  </div>
                  <Link
                    href={pkg.url}
                    className="text-blue-400 hover:text-blue-300 transition-colors cursor-pointer flex items-center text-sm font-medium"
                  >
                    View details
                    <ArrowUpRight className="ml-1 h-3 w-3" />
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

