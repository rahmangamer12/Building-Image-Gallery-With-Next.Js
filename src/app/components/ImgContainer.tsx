import type { Photo } from "@/models/Images";
import Image from "next/image";
import Link from "next/link";

type Props = {
    photo: Photo;
};

export default function ImageContainer({ photo }: Props) {
    const widthHeightRatio = photo.height / photo.width;
    const galleryHeight = Math.ceil(250 * widthHeightRatio);

    return (
        <div
            className="w-[250px] justify-self-center"
            style={{ gridRow: `span ${Math.ceil(galleryHeight / 10) + 1}` }}
        >
            <Link href={photo.url} target="_blank" className="grid place-content-center">
                <div className="rounded-xl overflow-hidden group">
                    <Image
                        src={photo.src.large}
                        alt={photo.alt}
                        width={photo.width} // Set the fixed width to 250px
                        height={photo.height} // Set the calculated height
                        sizes="(max-width: 768px) 100vw, 250px"
                        placeholder="blur"
                        blurDataURL={photo.blurrDataUrl}
                        className="group-hover:opacity-75 object-cover"
                    />
                </div>
            </Link>
        </div>
    );
}
