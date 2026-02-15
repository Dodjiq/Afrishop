"use client"

import { useState } from "react"
import { ProductsHeader } from "@/components/products/products-header"
import { ProductsFilters } from "@/components/products/products-filters"
import { ProductsTable } from "@/components/products/products-table"

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Produits</h1>
        <p className="text-muted-foreground">
          Gérez et importez vos produits depuis AliExpress, Amazon et Alibaba.
        </p>
      </div>

      {/* Page Header Actions */}
      <ProductsHeader />

      {/* Filters */}
      <ProductsFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      {/* Products Table */}
      <ProductsTable
        searchQuery={searchQuery}
        categoryFilter={categoryFilter}
        statusFilter={statusFilter}
      />
    </div>
  )
}
