"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Star, Download, ArrowUpRight, Filter, SortAsc, SortDesc } from "lucide-react"
import Link from "next/link"

// Comprehensive list of Flutter packages
const allPackages = [
  // State Management
  {
    id: 1,
    name: "flutter_bloc",
    category: "State Management",
    stars: 4328,
    downloads: "2.4M",
    description: "Flutter Widgets that make it easy to implement the BLoC design pattern",
  },
  {
    id: 2,
    name: "provider",
    category: "State Management",
    stars: 3982,
    downloads: "5.7M",
    description: "A wrapper around InheritedWidget to make them easier to use and more reusable",
  },
  {
    id: 3,
    name: "get",
    category: "State Management",
    stars: 3654,
    downloads: "1.9M",
    description: "State management, intelligent dependency injection, and route management",
  },
  {
    id: 4,
    name: "flutter_riverpod",
    category: "State Management",
    stars: 2987,
    downloads: "1.2M",
    description: "A simple way to access state while robust and testable",
  },
  {
    id: 5,
    name: "mobx",
    category: "State Management",
    stars: 2765,
    downloads: "1.8M",
    description: "MobX is a library for reactively managing the state of your applications",
  },
  {
    id: 6,
    name: "flutter_redux",
    category: "State Management",
    stars: 2432,
    downloads: "1.1M",
    description: "A set of utilities that allow you to easily consume a Redux Store",
  },
  {
    id: 7,
    name: "states_rebuilder",
    category: "State Management",
    stars: 1876,
    downloads: "0.9M",
    description: "A Flutter state management combined with dependency injection solution",
  },
  {
    id: 8,
    name: "flutter_hooks",
    category: "State Management",
    stars: 2156,
    downloads: "1.5M",
    description: "React-like hooks for Flutter state management and side-effects",
  },

  // UI Components
  {
    id: 9,
    name: "flutter_staggered_grid_view",
    category: "UI Components",
    stars: 2876,
    downloads: "3.2M",
    description: "A staggered grid view which supports multiple columns with rows of varying sizes",
  },
  {
    id: 10,
    name: "flutter_slidable",
    category: "UI Components",
    stars: 2543,
    downloads: "2.8M",
    description: "A Flutter implementation of slidable list item with directional slide actions",
  },
  {
    id: 11,
    name: "carousel_slider",
    category: "UI Components",
    stars: 2321,
    downloads: "3.5M",
    description: "A carousel slider widget, support infinite scroll and custom child widget",
  },
  {
    id: 12,
    name: "flutter_spinkit",
    category: "UI Components",
    stars: 2198,
    downloads: "4.1M",
    description: "A collection of loading indicators animated with flutter",
  },
  {
    id: 13,
    name: "flutter_svg",
    category: "UI Components",
    stars: 3012,
    downloads: "4.7M",
    description: "SVG rendering and widget library for Flutter",
  },
  {
    id: 14,
    name: "shimmer",
    category: "UI Components",
    stars: 1987,
    downloads: "2.3M",
    description: "A package provides an easy way to add shimmer effect in Flutter project",
  },
  {
    id: 15,
    name: "flutter_rating_bar",
    category: "UI Components",
    stars: 1765,
    downloads: "2.1M",
    description: "A star rating bar for Flutter which allows you to rate with precision",
  },
  {
    id: 16,
    name: "flutter_sticky_header",
    category: "UI Components",
    stars: 1543,
    downloads: "1.7M",
    description: "A Flutter implementation of sticky headers with a sliver as a child",
  },

  // Animation
  {
    id: 17,
    name: "lottie",
    category: "Animation",
    stars: 3245,
    downloads: "4.3M",
    description: "Render After Effects animations natively on Flutter",
  },
  {
    id: 18,
    name: "animated_text_kit",
    category: "Animation",
    stars: 2432,
    downloads: "3.1M",
    description: "A flutter package which contains a collection of cool text animations",
  },
  {
    id: 19,
    name: "flutter_animate",
    category: "Animation",
    stars: 2198,
    downloads: "2.5M",
    description: "A powerful animation package that makes animations simple and concise",
  },
  {
    id: 20,
    name: "rive",
    category: "Animation",
    stars: 2765,
    downloads: "2.9M",
    description: "Runtime animation library that allows designers to create animations in Rive and use them in Flutter",
  },
  {
    id: 21,
    name: "simple_animations",
    category: "Animation",
    stars: 1876,
    downloads: "2.2M",
    description: "Create beautiful custom animations in Flutter with ease",
  },
  {
    id: 22,
    name: "flutter_sequence_animation",
    category: "Animation",
    stars: 1654,
    downloads: "1.8M",
    description: "Composite together animations in Flutter",
  },
  {
    id: 23,
    name: "spring",
    category: "Animation",
    stars: 1432,
    downloads: "1.5M",
    description: "Create spring animations in Flutter",
  },
  {
    id: 24,
    name: "flutter_staggered_animations",
    category: "Animation",
    stars: 1987,
    downloads: "2.4M",
    description: "Easily add staggered animations to your ListView, GridView, Column and Row",
  },

  // Networking
  {
    id: 25,
    name: "dio",
    category: "Networking",
    stars: 3245,
    downloads: "3.8M",
    description: "A powerful HTTP client for Dart/Flutter with interceptors, FormData, and more",
  },
  {
    id: 26,
    name: "http",
    category: "Networking",
    stars: 3876,
    downloads: "5.9M",
    description: "A composable, multi-platform, Future-based API for HTTP requests",
  },
  {
    id: 27,
    name: "graphql_flutter",
    category: "Networking",
    stars: 2432,
    downloads: "2.1M",
    description: "A GraphQL client for Flutter, bringing all the features from a modern GraphQL client to Flutter",
  },
  {
    id: 28,
    name: "retrofit",
    category: "Networking",
    stars: 2198,
    downloads: "1.9M",
    description: "A type-safe HTTP client for Dart and Flutter",
  },
  {
    id: 29,
    name: "chopper",
    category: "Networking",
    stars: 1876,
    downloads: "1.7M",
    description: "Chopper is an HTTP client generator for Dart and Flutter using source_gen and inspired by Retrofit",
  },
  {
    id: 30,
    name: "connectivity_plus",
    category: "Networking",
    stars: 2543,
    downloads: "3.2M",
    description: "Flutter plugin for discovering the state of the network connectivity",
  },
  {
    id: 31,
    name: "web_socket_channel",
    category: "Networking",
    stars: 1765,
    downloads: "2.5M",
    description: "A StreamChannel wrapper for WebSockets",
  },
  {
    id: 32,
    name: "flutter_offline",
    category: "Networking",
    stars: 1654,
    downloads: "1.8M",
    description: "A tidy utility to handle offline/online connectivity in Flutter",
  },

  // Storage
  {
    id: 33,
    name: "hive",
    category: "Storage",
    stars: 2543,
    downloads: "2.1M",
    description: "Lightweight and blazing fast key-value database written in pure Dart",
  },
  {
    id: 34,
    name: "shared_preferences",
    category: "Storage",
    stars: 3654,
    downloads: "5.2M",
    description: "Flutter plugin for reading and writing simple key-value pairs",
  },
  {
    id: 35,
    name: "sqflite",
    category: "Storage",
    stars: 3245,
    downloads: "4.5M",
    description: "SQLite plugin for Flutter, a self-contained, high-reliability SQL database engine",
  },
  {
    id: 36,
    name: "isar",
    category: "Storage",
    stars: 2198,
    downloads: "1.7M",
    description: "Super fast cross-platform database for Flutter apps",
  },
  {
    id: 37,
    name: "moor",
    category: "Storage",
    stars: 2321,
    downloads: "2.3M",
    description: "Moor is a reactive persistence library for Flutter and Dart, built on top of SQLite",
  },
  {
    id: 38,
    name: "flutter_secure_storage",
    category: "Storage",
    stars: 2765,
    downloads: "3.8M",
    description: "Flutter plugin to store data in secure storage",
  },
  {
    id: 39,
    name: "objectbox",
    category: "Storage",
    stars: 1987,
    downloads: "1.5M",
    description: "ObjectBox is a super-fast NoSQL ACID compliant object database",
  },
  {
    id: 40,
    name: "drift",
    category: "Storage",
    stars: 1876,
    downloads: "1.9M",
    description: "Drift is a reactive persistence library for Flutter and Dart, built on top of SQLite",
  },

  // Authentication
  {
    id: 41,
    name: "firebase_auth",
    category: "Authentication",
    stars: 3432,
    downloads: "4.7M",
    description: "Flutter plugin for Firebase Auth, enabling authentication using passwords, phone numbers and more",
  },
  {
    id: 42,
    name: "google_sign_in",
    category: "Authentication",
    stars: 3012,
    downloads: "3.9M",
    description: "Flutter plugin for Google Sign-In, enabling Google sign-in in Flutter apps",
  },
  {
    id: 43,
    name: "flutter_facebook_auth",
    category: "Authentication",
    stars: 2543,
    downloads: "2.8M",
    description: "A Flutter plugin to use Facebook Sign In",
  },
  {
    id: 44,
    name: "local_auth",
    category: "Authentication",
    stars: 2765,
    downloads: "3.5M",
    description: "Flutter plugin for local authentication methods like fingerprint, face, etc.",
  },
  {
    id: 45,
    name: "flutter_appauth",
    category: "Authentication",
    stars: 1987,
    downloads: "2.1M",
    description: "Flutter plugin for AppAuth, an SDK for communicating with OAuth 2.0 and OpenID Connect providers",
  },
  {
    id: 46,
    name: "jwt_decoder",
    category: "Authentication",
    stars: 1765,
    downloads: "1.9M",
    description: "A simple JWT decoder for Flutter",
  },
  {
    id: 47,
    name: "oauth2",
    category: "Authentication",
    stars: 1654,
    downloads: "1.7M",
    description: "An OAuth2 client for Dart",
  },
  {
    id: 48,
    name: "sign_in_with_apple",
    category: "Authentication",
    stars: 2321,
    downloads: "2.5M",
    description: "Flutter plugin for Apple Sign In",
  },

  // Images
  {
    id: 49,
    name: "cached_network_image",
    category: "Images",
    stars: 2876,
    downloads: "4.2M",
    description: "Flutter library to load and cache network images with placeholder and error widgets",
  },
  {
    id: 50,
    name: "photo_view",
    category: "Images",
    stars: 2543,
    downloads: "3.5M",
    description: "A simple zoomable image/content widget for Flutter",
  },
  {
    id: 51,
    name: "image_picker",
    category: "Images",
    stars: 3245,
    downloads: "4.8M",
    description: "Flutter plugin for selecting images from the Android and iOS image library",
  },
  {
    id: 52,
    name: "flutter_image_compress",
    category: "Images",
    stars: 2198,
    downloads: "2.7M",
    description: "Compress image with native code(objc kotlin)",
  },
  {
    id: 53,
    name: "extended_image",
    category: "Images",
    stars: 1987,
    downloads: "2.3M",
    description: "A powerful official extension image, support placeholder, loading state, cache, zoom pan, etc.",
  },
  {
    id: 54,
    name: "image_cropper",
    category: "Images",
    stars: 2321,
    downloads: "3.1M",
    description: "A Flutter plugin for Android and iOS supports cropping images",
  },
  {
    id: 55,
    name: "flutter_cache_manager",
    category: "Images",
    stars: 2432,
    downloads: "3.7M",
    description: "Generic cache manager for Flutter",
  },
  {
    id: 56,
    name: "transparent_image",
    category: "Images",
    stars: 1876,
    downloads: "2.9M",
    description: "A simple transparent image",
  },

  // Utils
  {
    id: 57,
    name: "url_launcher",
    category: "Utils",
    stars: 3654,
    downloads: "5.8M",
    description: "Flutter plugin for launching a URL",
  },
  {
    id: 58,
    name: "path_provider",
    category: "Utils",
    stars: 3432,
    downloads: "5.5M",
    description: "Flutter plugin for getting commonly used locations on host platform file systems",
  },
  {
    id: 59,
    name: "permission_handler",
    category: "Utils",
    stars: 3245,
    downloads: "4.9M",
    description: "Permission plugin for Flutter",
  },
  {
    id: 60,
    name: "device_info_plus",
    category: "Utils",
    stars: 2765,
    downloads: "3.8M",
    description: "Flutter plugin providing detailed information about the device",
  },
  {
    id: 61,
    name: "package_info_plus",
    category: "Utils",
    stars: 2543,
    downloads: "3.5M",
    description: "Flutter plugin for querying information about the application package",
  },
  {
    id: 62,
    name: "share_plus",
    category: "Utils",
    stars: 2432,
    downloads: "3.2M",
    description: "Flutter plugin for sharing content via the platform share UI",
  },
  {
    id: 63,
    name: "flutter_local_notifications",
    category: "Utils",
    stars: 3012,
    downloads: "4.3M",
    description: "A cross platform plugin for displaying local notifications",
  },
  {
    id: 64,
    name: "intl",
    category: "Utils",
    stars: 3876,
    downloads: "5.7M",
    description:
      "Provides internationalization and localization facilities, including message translation, plurals and genders, date/number formatting and parsing",
  },
]

// Categories for filtering
const categories = [
  "All",
  "State Management",
  "UI Components",
  "Animation",
  "Networking",
  "Storage",
  "Authentication",
  "Images",
  "Utils",
]

export function PackageSearch() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("stars")
  const [sortOrder, setSortOrder] = useState("desc")
  const [filteredPackages, setFilteredPackages] = useState(allPackages)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Add pagination state variables near the other state variables
  const [currentPage, setCurrentPage] = useState(1)
  const [packagesPerPage, setPackagesPerPage] = useState(9)

  // Filter and sort packages based on search term, category, and sort options
  useEffect(() => {
    let result = [...allPackages]

    // Filter by search term
    if (searchTerm) {
      result = result.filter(
        (pkg) =>
          pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pkg.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by category
    if (selectedCategory !== "All") {
      result = result.filter((pkg) => pkg.category === selectedCategory)
    }

    // Sort results
    result.sort((a, b) => {
      if (sortBy === "stars") {
        return sortOrder === "desc" ? b.stars - a.stars : a.stars - b.stars
      } else if (sortBy === "downloads") {
        const aDownloads = Number.parseFloat(a.downloads.replace("M", ""))
        const bDownloads = Number.parseFloat(b.downloads.replace("M", ""))
        return sortOrder === "desc" ? bDownloads - aDownloads : aDownloads - bDownloads
      } else {
        return sortOrder === "desc" ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name)
      }
    })

    setFilteredPackages(result)
    setCurrentPage(1) // Reset to first page when filters change
  }, [searchTerm, selectedCategory, sortBy, sortOrder])

  return (
    <section id="search" className="py-20 bg-black">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Search Flutter Packages</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Find the perfect package for your Flutter project from our comprehensive collection
          </p>
        </motion.div>

        {/* Update the div with ref={ref} to include pagination logic and controls */}
        <div ref={ref} className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search packages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-900 border-gray-700"
              />
            </div>

            <div className="flex gap-2">
              <div className="relative">
                <Button
                  variant="outline"
                  className="border-gray-700 bg-gray-900 flex items-center gap-2"
                  onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
                >
                  {sortOrder === "desc" ? <SortDesc className="h-4 w-4" /> : <SortAsc className="h-4 w-4" />}
                  {sortOrder === "desc" ? "Descending" : "Ascending"}
                </Button>
              </div>

              <div className="relative">
                <Button
                  variant="outline"
                  className="border-gray-700 bg-gray-900 flex items-center gap-2"
                  onClick={() =>
                    setSortBy(sortBy === "stars" ? "downloads" : sortBy === "downloads" ? "name" : "stars")
                  }
                >
                  <Filter className="h-4 w-4" />
                  Sort by: {sortBy === "stars" ? "Stars" : sortBy === "downloads" ? "Downloads" : "Name"}
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`cursor-pointer ${
                  selectedCategory === category
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-900 border-gray-700 hover:bg-gray-800"
                }`}
                onClick={() => {
                  setSelectedCategory(category)
                  setCurrentPage(1) // Reset to first page when changing category
                }}
              >
                {category}
              </Badge>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPackages.length > 0 ? (
              // Apply pagination to only show a subset of packages
              filteredPackages
                .slice((currentPage - 1) * packagesPerPage, currentPage * packagesPerPage)
                .map((pkg) => (
                  <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: (pkg.id % 10) * 0.05 }}
                  >
                    <Card className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-all duration-300 h-full">
                      <CardHeader>
                        <div className="flex justify-between items-start gap-2">
                          <CardTitle
                            className="text-xl font-mono text-white group-hover:text-blue-400 transition-colors break-words hyphens-auto"
                            style={{ wordWrap: "break-word", maxWidth: "calc(100% - 40px)" }}
                          >
                            {pkg.name}
                          </CardTitle>
                          <div className="flex items-center space-x-1 text-yellow-400 flex-shrink-0">
                            <Star className="h-4 w-4 fill-yellow-400" />
                            <span className="text-sm">{pkg.stars}</span>
                          </div>
                        </div>
                        <Badge className="mt-2 bg-gray-800 text-gray-300 border-gray-700">{pkg.category}</Badge>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-400 text-sm">{pkg.description}</p>
                      </CardContent>
                      <CardFooter className="flex justify-between border-t border-gray-800 pt-4">
                        <div className="flex items-center text-sm text-gray-400">
                          <Download className="h-4 w-4 mr-1 text-green-400" />
                          <span>{pkg.downloads}</span>
                        </div>
                        <Link
                          href={`https://pub.dev/packages/${pkg.name.toLowerCase()}`}
                          target="_blank"
                          className="text-blue-400 hover:text-blue-300 transition-colors cursor-pointer flex items-center text-sm font-medium"
                        >
                          View on pub.dev
                          <ArrowUpRight className="ml-1 h-3 w-3" />
                        </Link>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-400 text-lg">No packages found matching your criteria</p>
                <Button
                  variant="link"
                  className="mt-2 text-blue-400"
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategory("All")
                    setCurrentPage(1) // Reset to first page when clearing filters
                  }}
                >
                  Clear filters
                </Button>
              </div>
            )}
          </div>

          {/* Pagination controls */}
          {filteredPackages.length > 0 && (
            <div className="flex justify-center items-center mt-10 space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
              >
                Previous
              </Button>

              <div className="flex items-center space-x-1">
                {/* Generate page buttons */}
                {Array.from({ length: Math.min(5, Math.ceil(filteredPackages.length / packagesPerPage)) }, (_, i) => {
                  // Calculate page number based on current page to show a window of pages
                  const totalPages = Math.ceil(filteredPackages.length / packagesPerPage)
                  let pageNum

                  if (totalPages <= 5) {
                    // If 5 or fewer pages, show all page numbers
                    pageNum = i + 1
                  } else {
                    // Show a window of pages centered around current page
                    if (currentPage <= 3) {
                      // Near the start
                      pageNum = i + 1
                    } else if (currentPage >= totalPages - 2) {
                      // Near the end
                      pageNum = totalPages - 4 + i
                    } else {
                      // In the middle
                      pageNum = currentPage - 2 + i
                    }
                  }

                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                      className={
                        currentPage === pageNum
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "border-gray-700 text-gray-300 hover:bg-gray-800"
                      }
                    >
                      {pageNum}
                    </Button>
                  )
                })}

                {/* Show ellipsis if there are more pages */}
                {Math.ceil(filteredPackages.length / packagesPerPage) > 5 && (
                  <span className="text-gray-500 px-1">...</span>
                )}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(filteredPackages.length / packagesPerPage)))
                }
                disabled={currentPage === Math.ceil(filteredPackages.length / packagesPerPage)}
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
              >
                Next
              </Button>

              <span className="text-sm text-gray-500 ml-2">
                Page {currentPage} of {Math.ceil(filteredPackages.length / packagesPerPage)}
              </span>
            </div>
          )}

          {filteredPackages.length > 0 && filteredPackages.length < allPackages.length && (
            <div className="text-center mt-8">
              <p className="text-gray-400 mb-2">
                Showing {filteredPackages.length} of {allPackages.length} packages
              </p>
              <Button
                variant="outline"
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("All")
                  setCurrentPage(1) // Reset to first page when showing all packages
                }}
              >
                Show all packages
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

