"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import { cn } from "@/lib/utils"

interface CardProfilProps {
  titre: string
  description: string
  pourcentage: number
  className?: string
}

export function CardProfil({
  titre,
  description,
  pourcentage,
  className,
}: CardProfilProps) {
  return (
    <Card className={cn("animate-scale-in", className)}>
      <CardHeader>
        <CardTitle className="text-lg">{titre}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>

        {/* Gauge circulaire */}
        <div className="flex flex-col items-center py-6">
          <div className="w-40 h-40">
            <CircularProgressbar
              value={pourcentage}
              text={`${pourcentage}%`}
              strokeWidth={10}
              styles={buildStyles({
                pathColor: "hsl(var(--primary))",
                textColor: "hsl(var(--foreground))",
                trailColor: "hsl(var(--muted))",
                textSize: "24px",
                pathTransitionDuration: 1.5,
              })}
            />
          </div>

          <p className="mt-4 text-sm font-medium">
            En progression {pourcentage}%
          </p>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4 border-t">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <CaretLeftIcon size={20} weight="bold" />
          </Button>

          <div className="flex gap-1.5">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <div className="h-2 w-2 rounded-full bg-muted" />
            <div className="h-2 w-2 rounded-full bg-muted" />
          </div>

          <Button variant="ghost" size="icon" className="h-8 w-8">
            <CaretRightIcon size={20} weight="bold" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
