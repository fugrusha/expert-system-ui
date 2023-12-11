import { PropertyStatus } from "./enum/propertyStatus"
import { IPropertyFeature } from "./property-feature"
import { IImage } from "./image"

export interface IProperty {
    id: string
    city: string
    price: number
    bedrooms: number
    bathrooms: number
    squareFootage: number
    title: string
    description: string
    status: PropertyStatus
    images: IImage[]
    features: IPropertyFeature[]
}
