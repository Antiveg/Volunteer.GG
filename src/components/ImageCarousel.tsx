"use client";
import Carousel from "@/components/ui/carousel";

interface ImageDataProps {
    images: {
        img_url: string,
        id?: number
    }[] | []
}

export default function ImageCarousel({ images } : ImageDataProps) {
    return (
        <div className="relative overflow-hidden w-full h-full pb-14">
        <Carousel slides={images} />
        </div>
    );
}
