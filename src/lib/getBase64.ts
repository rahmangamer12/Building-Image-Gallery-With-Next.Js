import  { getPlaiceholder } from "plaiceholder"
import type { Photo, ImagesResults } from "@/models/Images"

async function getBase64(imgUrl: string) {
    
    //     const buffer = await fetch(src).then(async (res) => Buffer.from(await res.arrayBuffer())
    // )
    // const { base64 } = await getPlaiceholder(buffer);
    
    try {
        const res = await fetch(imgUrl)

        if(!res.ok) {
            throw new Error(`failed to fetch image: ${res.status} ${res.statusText}`)
        }
        const buffer = await  res.arrayBuffer()
        const { base64 } = await getPlaiceholder(Buffer.from(buffer))
        console.log(base64)
        return base64
    }catch(e) {
        if(e instanceof Error) console.log(e.stack)
    }
}

export default async function addBluredDataUrls(images:ImagesResults):Promise<Photo[]> {
    const base64Promises = images.photos.map(photo => getBase64(photo.src.large))

    const base64Results = await Promise.all(base64Promises)
    const photoWithBlur: Photo[] = images.photos.map((photo, i)=>
    {
        photo.blurrDataUrl = base64Results[i]
        return photo
    })
    return photoWithBlur
}