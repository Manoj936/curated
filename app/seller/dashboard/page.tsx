import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import * as LucideIcons from "lucide-react";
import PageHeader from "@/app/components/chunks/PageHeader";
import Link from "next/link";

const cardsData = [
  {
    title: "Total Revenue",
    value: "$0",
    trend: "Trending up this month",
    info: "Navigate to get an insights of revenue",
    icon: "Receipt",
    navigateTo:'/seller/revenue'
  },

  {
    title: "Orders",
    value: "0",
    trend: "Steady performance",
    info: "Navigate to get an insights of orders",
    icon: "PackageCheck",
    navigateTo:'/seller/orders'
  },
  {
    title: "Ebooks",
    value: "0",
    trend: "Slight decrease",
    info: "Navigate to manage your ebooks listings",
    icon: "BookOpen",
    navigateTo:'/seller/ebooks'
  },

];

function Page() {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 max-w-7xl mx-auto px-4">
        <PageHeader heading="SELLER DASHBOARD" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 max-w-7xl mx-auto px-4">
        {cardsData.map((card, index) => {
          const LucideIcon: any = LucideIcons[card.icon];
          return (
            <Link href={card.navigateTo}>
            <Card
              key={index}
              className="rounded-sm  transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer hover:border-gray-600"
            >
              <CardHeader className="flex flex-row items-start justify-between gap-2">
                <div>
                  <CardDescription className="scroll-m-20 text-2xl text-gray-900 font-extrabold tracking-tight lg:text-4xl uppercase">
                    {card.title}
                  </CardDescription>
                  <CardTitle className="text-2xl font-extrabold text-gray-600 tabular-nums @[250px]/card:text-3xl">
                    {card.value}
                  </CardTitle>
                </div>
                {LucideIcon && (
                  <LucideIcon className="h-18 w-15 font-extrabold" />
                )}
              </CardHeader>
              <CardFooter className="flex-col items-start gap-1.5 text-sm">
                <div className="line-clamp-1 flex gap-2 font-medium">
                  {card.trend}
                </div>
                <div className="text-muted-foreground">{card.info}</div>
              </CardFooter>
            </Card>
            </Link>
          );
        })}
      </div>
    </>
  );
}

export default Page;
