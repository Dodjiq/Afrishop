"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const data = [
  { name: "Organique", value: 45, color: "hsl(var(--primary))" },
  { name: "Réseaux sociaux", value: 30, color: "#ff8c42" },
  { name: "Direct", value: 15, color: "#ffa94d" },
  { name: "Référence", value: 10, color: "#ffc078" },
]

export function TrafficSources() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sources de trafic</CardTitle>
        <CardDescription>
          Répartition des visiteurs par source
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent, x, y, cx }) => {
                const isLeft = x < cx
                return (
                  <text
                    x={x}
                    y={y}
                    fill="hsl(var(--primary))"
                    textAnchor={isLeft ? "end" : "start"}
                    dominantBaseline="central"
                    style={{ fontSize: '14px', fontWeight: '600' }}
                  >
                    {`${name} ${(percent * 100).toFixed(0)}%`}
                  </text>
                )
              }}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                color: "hsl(var(--primary))",
              }}
              labelStyle={{
                color: "hsl(var(--primary))",
              }}
              itemStyle={{
                color: "hsl(var(--primary))",
              }}
              formatter={(value: number) => [`${value}%`, "Pourcentage"]}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
