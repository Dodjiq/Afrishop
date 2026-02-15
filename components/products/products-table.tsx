"use client"

import { useMemo } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card } from "@/components/ui/card"
import {
  DotsThreeVerticalIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  CopyIcon,
} from "@phosphor-icons/react"
import Image from "next/image"

const allProducts = [
  {
    id: "1",
    name: "T-shirt à manches courtes",
    sku: "TSH-001",
    category: "Mode",
    price: "15 000 FCFA",
    stock: 45,
    status: "active" as const,
    source: "AliExpress",
    image: "/images/dashboard-screenshot.png",
  },
  {
    id: "2",
    name: "Robe d'été fleurie",
    sku: "ROB-002",
    category: "Mode",
    price: "25 000 FCFA",
    stock: 23,
    status: "active" as const,
    source: "Amazon",
    image: "/images/dashboard-screenshot.png",
  },
  {
    id: "3",
    name: "Casque Bluetooth",
    sku: "CAS-003",
    category: "Électronique",
    price: "35 000 FCFA",
    stock: 0,
    status: "draft" as const,
    source: "Alibaba",
    image: "/images/dashboard-screenshot.png",
  },
  {
    id: "4",
    name: "Sneakers blanches",
    sku: "SNK-004",
    category: "Mode",
    price: "40 000 FCFA",
    stock: 67,
    status: "active" as const,
    source: "AliExpress",
    image: "/images/dashboard-screenshot.png",
  },
  {
    id: "5",
    name: "Sac à main en cuir",
    sku: "SAC-005",
    category: "Mode",
    price: "50 000 FCFA",
    stock: 12,
    status: "active" as const,
    source: "Amazon",
    image: "/images/dashboard-screenshot.png",
  },
]

const statusConfig = {
  active: {
    label: "Actif",
    variant: "default" as const,
  },
  draft: {
    label: "Brouillon",
    variant: "secondary" as const,
  },
  archived: {
    label: "Archivé",
    variant: "outline" as const,
  },
}

interface ProductsTableProps {
  searchQuery: string
  categoryFilter: string
  statusFilter: string
}

export function ProductsTable({
  searchQuery,
  categoryFilter,
  statusFilter,
}: ProductsTableProps) {
  // Filter products based on search and filters
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())

      // Category filter
      const matchesCategory =
        categoryFilter === "all" ||
        product.category === categoryFilter

      // Status filter
      const matchesStatus =
        statusFilter === "all" ||
        product.status === statusFilter

      return matchesSearch && matchesCategory && matchesStatus
    })
  }, [searchQuery, categoryFilter, statusFilter])

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Produit</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Catégorie</TableHead>
            <TableHead>Prix</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProducts.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="h-24 text-center">
                <div className="flex flex-col items-center justify-center gap-2">
                  <p className="text-muted-foreground">Aucun produit trouvé</p>
                  <p className="text-sm text-muted-foreground">
                    Essayez de modifier vos filtres
                  </p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            filteredProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-md bg-muted">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="font-medium">{product.name}</div>
                </div>
              </TableCell>
              <TableCell className="font-mono text-sm text-muted-foreground">
                {product.sku}
              </TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell className="font-semibold">{product.price}</TableCell>
              <TableCell>
                <span
                  className={
                    product.stock === 0
                      ? "text-red-600 font-medium"
                      : product.stock < 20
                      ? "text-orange-600 font-medium"
                      : ""
                  }
                >
                  {product.stock === 0 ? "Rupture" : product.stock}
                </span>
              </TableCell>
              <TableCell>
                <Badge variant="outline">{product.source}</Badge>
              </TableCell>
              <TableCell>
                <Badge variant={statusConfig[product.status].variant}>
                  {statusConfig[product.status].label}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <DotsThreeVerticalIcon size={16} weight="bold" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem className="gap-2">
                      <EyeIcon size={16} />
                      Voir
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2">
                      <PencilIcon size={16} />
                      Modifier
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2">
                      <CopyIcon size={16} />
                      Dupliquer
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="gap-2 text-destructive">
                      <TrashIcon size={16} />
                      Supprimer
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          )))}
        </TableBody>
      </Table>
    </Card>
  )
}
